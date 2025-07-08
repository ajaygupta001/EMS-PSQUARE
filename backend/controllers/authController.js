import express from "express";
import User from "../models/userSchema.js"; // Ensure .js extension
import bcrypt from "bcryptjs";

import { generateToken } from "../utils/token.util.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const sessionExpiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      sessionExpiresAt,
    });
    const accessToken = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: "User created",
      newUser,
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    user.sessionExpiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
    await user.save();

    const accessToken = generateToken(user);

    res.json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
