import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

// LOGIN HANDLER
export const handleLogin = (e, email, password) => {
  e.preventDefault();
  if (!email || !password) {
    return alert("Please provide both email and password.");
  }
  store.dispatch(userLogin({ email, password }));
};

// REGISTER HANDLER
export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  phone,
  address,
  dateOfBirth, // Donor
  gender, // Donor
  bloodGroup, // Donor
  hospitalName, // Hospital
  licenseNumber // Hospital
) => {
  e.preventDefault();

  if (!name || !email || !password || !role) {
    return alert("Please fill in all required fields.");
  }

  // Donor role validation
  if (role === "donor" && (!dateOfBirth || !gender || !bloodGroup)) {
    return alert("Donor info missing: Date of birth, gender, or blood group.");
  }

  // Hospital role validation
  if (role === "hospital" && (!hospitalName || !licenseNumber)) {
    return alert("Hospital info missing: Hospital name or license number.");
  }

  const payload = {
    name,
    role,
    email,
    password,
    phone,
    address,
    // Optional by role
    dateOfBirth,
    gender,
    bloodGroup,
    hospitalName,
    licenseNumber,
  };

  store.dispatch(userRegister(payload));
};
