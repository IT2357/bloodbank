// server/controllers/authController.js

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRES_IN = "7d";

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const registerDonor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      dateOfBirth,
      gender,
      bloodGroup,
      address,
    } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      dateOfBirth,
      gender,
      bloodGroup,
      address,
      role: "donor",
      isApproved: true,
    });

    await newUser.save();

    const token = createToken(newUser);

    res.status(201).json({
      message: "Donor registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("registerDonor error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerHospital = async (req, res) => {
  try {
    const {
      hospitalName,
      email,
      password,
      phone,
      address,
      licenseNumber,
      name,
    } = req.body;

    if (!email || !password || !hospitalName || !name) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newHospital = new User({
      hospitalName,
      email,
      password: hashedPassword,
      phone,
      address,
      licenseNumber,
      name,
      role: "hospital",
      isApproved: false,
    });

    await newHospital.save();

    const token = createToken(newHospital);

    res.status(201).json({
      message: "Hospital registered successfully. Await admin approval.",
      token,
      user: {
        id: newHospital._id,
        hospitalName: newHospital.hospitalName,
        email: newHospital.email,
        role: newHospital.role,
        isApproved: newHospital.isApproved,
      },
    });
  } catch (error) {
    console.error("registerHospital error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const approveUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user || user.role !== "hospital") {
      return res.status(404).json({ message: "Hospital not found" });
    }

    user.isApproved = true;
    await user.save();

    res.json({ message: "Hospital approved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const authorizedEmails = (process.env.ADMIN_AUTHORIZED_EMAILS || "").split(
      ","
    );

    if (!authorizedEmails.includes(email)) {
      return res
        .status(403)
        .json({ message: "Unauthorized to register as admin" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      isApproved: true,
    });

    await newAdmin.save();

    const token = createToken(newAdmin);

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      user: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error("registerAdmin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.role === "hospital" && !user.isApproved) {
      return res.status(403).json({
        message:
          "Your hospital registration is not approved yet, \n\nThank you for your patience",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    console.error("loginUser error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user, // contains isApproved status
    });
  } catch (error) {
    console.error("getCurrentUser error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
