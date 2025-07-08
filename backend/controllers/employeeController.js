import Employee from "../models/EmployeeSchema.js"; // Ensure .js extension



export const getEmployees = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
    const sortOrder = order === 'asc' ? 1 : -1;

    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const total = await Employee.countDocuments(filter);
    const employees = await Employee.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ total, page, totalPages: Math.ceil(total / limit), employees });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee' });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
};
