import Attendance from "../models/AttendanceSchema.js"; // Ensure .js extension
import Employee from "../models/EmployeeSchema.js";

export const markAttendance = async (req, res) => {
  try {
    const { employee, date, status } = req.body;

    const existing = await Attendance.findOne({ employee, date });
    if (existing)
      return res.status(400).json({ message: "Attendance already marked" });

    const record = await Attendance.create({ employee, date, status });
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance" });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const employees = await Employee.find({
      name: { $regex: search, $options: "i" },
    }).select("_id");
    const ids = employees.map((e) => e._id);

    const total = await Attendance.countDocuments({ employee: { $in: ids } });
    const records = await Attendance.find({ employee: { $in: ids } })
      .populate("employee", "name")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ total, page, totalPages: Math.ceil(total / limit), records });
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance" });
  }
};
