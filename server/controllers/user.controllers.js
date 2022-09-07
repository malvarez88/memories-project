import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesnt exist." });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  console.log("🚀 ~ file: user.controllers.js ~ line 30 ~ signUp ~ password", password)
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exist." });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      return hash;
    });
    const createdUser = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: createdUser.email, id: createdUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    ); 
    res.status(200).json({ message: createdUser, token });
  } catch (error) {
    console.log('Errrrrror!', error)
    res.status(500).json({ message: "Something went wrong." });
  }
};
