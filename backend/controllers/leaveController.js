
import Leave from "../models/LeaveSchema.js"; // Ensure .js extension


export const applyLeave =  async (req, res) => {
  try {
    const { employee, fromDate, toDate, reason } = req.body;

    const document = req.file ? `/uploads/${req.file.filename}` : null;

    const leave = await Leave.create({
      employee,
      fromDate,
      toDate,
      reason,
      document
    });

    res.status(201).json(leave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error applying for leave' });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const updated = await Leave.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating leave status' });
  }
};

export const getApprovedLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ status: 'approved' }).populate('employee', 'name');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching approved leaves' });
  }
};
