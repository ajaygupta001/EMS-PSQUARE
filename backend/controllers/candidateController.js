import express from "express";
import Employee from "../models/EmployeeSchema.js"; // Ensure .js extension
import Candidate from "../models/CandidateSchema.js";

export const createCandidate = async (req, res) => {
  try {
    const { name, email, phone, skills, position, experience } = req.body;

    // console.log(name, email, phone, skills);
    const resume = req.file ? `/uploads/${req.file.filename}` : null;

    // const resume = req.file?.path || null;

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      position,
      experience,
      skills: skills ? skills.split(",") : [],
      resume,
      createdBy: req.user.id,
    });

    res.status(201).json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating candidate" });
  }
};

export const getCandidates = async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;
    const sortOrder = order === "asc" ? 1 : -1;

    console.log(search, page, limit);
    const filter = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    const total = await Candidate.countDocuments(filter);
    const candidates = await Candidate.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ total, page, totalPages: Math.ceil(total / limit), candidates });
  } catch (error) {
    res.status(500).json({ message: "Error fetching candidates" });
  }
};

export const updateCandidateStatus = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: "Error updating candidate status" });
  }
};

export const convertToEmployee = async (req, res) => {
  try {
    // console.log("datata", req.params.id);
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });

    // console.log("candidate", candidate);

    const employee = await Employee.create({
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      department: req.body.department,
      designation: req.body.designation,
      role: req.body.role,
      joinDate: req.body.joinDate,
      createdBy: candidate.createdBy,
    });

    candidate.status = "selected";
    await candidate.save();

    res
      .status(201)
      .json({ message: "Candidate converted to employee", employee });
  } catch (error) {
    res.status(500).json({ message: "Error converting candidate to employee" });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });

    res.status(200).json({
      success: true,
      message: "Candidate deleted Successfully",
      candidate,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting candidate " });
  }
};
