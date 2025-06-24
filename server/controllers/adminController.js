import User from "../models/User.js";

export const approveHospital = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user || user.role !== "hospital") {
      return res
        .status(404)
        .json({ message: "Hospital not found or invalid role" });
    }

    user.isApproved = true;
    await user.save();

    res.json({ message: "Hospital approved successfully", user });
  } catch (error) {
    console.error("approveHospital error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
