import React, { useEffect, useState } from "react";
import "../styles/candidates.css";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [search, setSearch] = useState("");

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/employees/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data.employees);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEmployees();
    } catch (err) {
      alert("Error deleting employee");
    }
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setShowEditModal(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/employees/${editingEmployee._id}`,
        editingEmployee,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowEditModal(false);
      fetchEmployees();
    } catch (err) {
      alert("Error updating employee");
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="candidate-page">
      <div className="candidate-header">
        <input
          type="text"
          placeholder="🔍 Search"
          className="candidate-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="candidate-table">
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Employee Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp._id}>
                <td>
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${emp.name}`}
                    alt="avatar"
                    width="30"
                    height="30"
                    style={{ borderRadius: "50%" }}
                  />
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.designation}</td>
                <td>{emp.department}</td>
                <td>{new Date(emp.joinDate).toLocaleDateString()}</td>
                <td className="action-col">
                  <button className="modal-btn" onClick={() => handleEdit(emp)}>
                    ✏️ Edit
                  </button>
                  <button
                    className="modal-btn danger"
                    onClick={() => handleDelete(emp._id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2>Edit Employee Details</h2>
              <button
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                ✖
              </button>
            </div>
            <form className="modal-form">
              <input
                type="text"
                name="name"
                value={editingEmployee.name}
                onChange={(e) =>
                  setEditingEmployee({
                    ...editingEmployee,
                    name: e.target.value,
                  })
                }
                placeholder="Full Name"
                required
              />
              <input
                type="email"
                name="email"
                value={editingEmployee.email}
                onChange={(e) =>
                  setEditingEmployee({
                    ...editingEmployee,
                    email: e.target.value,
                  })
                }
                placeholder="Email"
                required
              />
              <input
                type="text"
                name="phone"
                value={editingEmployee.phone}
                onChange={(e) =>
                  setEditingEmployee({
                    ...editingEmployee,
                    phone: e.target.value,
                  })
                }
                placeholder="Phone Number"
              />
              <input
                type="text"
                name="department"
                value={editingEmployee.department}
                onChange={(e) =>
                  setEditingEmployee({
                    ...editingEmployee,
                    department: e.target.value,
                  })
                }
                placeholder="Department"
              />
              <select
                name="designation"
                value={editingEmployee.designation}
                onChange={(e) =>
                  setEditingEmployee({
                    ...editingEmployee,
                    designation: e.target.value,
                  })
                }
              >
                <option>Intern</option>
                <option>Junior</option>
                <option>Senior</option>
                <option>Full Time</option>
                <option>Team Lead</option>
              </select>
              <input
                type="date"
                name="joinDate"
                value={editingEmployee.joinDate?.substring(0, 10)}
                onChange={(e) =>
                  setEditingEmployee({
                    ...editingEmployee,
                    joinDate: e.target.value,
                  })
                }
              />
              <button className="save-btn" onClick={handleSave} type="button">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;
