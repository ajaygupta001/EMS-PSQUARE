import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/candidates.css";

const LeavePage = () => {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [designation, setDesignation] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [document, setDocument] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchApprovedLeaves = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/leaves/approved", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(res.data);
    } catch (err) {
      console.error("Error fetching approved leaves", err);
    }
  };

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
  console.log("rjrjrj", employees);
  const handleApplyLeave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("employee", selectedEmployee);
    formData.append("fromDate", fromDate);
    formData.append("toDate", toDate);
    formData.append("reason", reason);
    if (document) formData.append("document", document);

    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/leaves", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Leave Applied!");
      fetchApprovedLeaves();
      setShowForm(false);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to apply leave");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchApprovedLeaves();
  }, []);

  return (
    <div className="candidate-page">
      <div className="candidate-header">
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          ➕ Add Leave
        </button>
      </div>

      {/* Leave Apply Modal */}
      {showForm && (
        <div className="modal">
          <form onSubmit={handleApplyLeave} className="modal-content">
            <h2>Add New Leave</h2>

            {/* Employee Select */}
            <select
              required
              value={selectedEmployee}
              onChange={(e) => {
                const empId = e.target.value;
                setSelectedEmployee(empId);

                const emp = employees.find((emp) => emp._id === empId);
                setDesignation(emp?.designation || "");
              }}
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>

            {/* Auto-filled Designation */}
            <input
              type="text"
              placeholder="Designation"
              value={designation}
              readOnly
            />

            {/* Dates, Reason, File */}
            <input
              type="date"
              required
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <input
              type="date"
              required
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
            <textarea
              placeholder="Reason"
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => setDocument(e.target.files[0])}
            />

            {/* Actions */}
            <div className="modal-actions">
              <button type="submit">Apply Leave</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leave Table */}
      <div className="candidate-table">
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td>
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${leave.employee.name}`}
                    alt={leave.employee.name}
                    width="30"
                    height="30"
                    style={{ borderRadius: "50%" }}
                  />
                </td>
                <td>{leave.employee.name}</td>
                <td>
                  {new Date(leave.fromDate).toLocaleDateString()} -{" "}
                  {new Date(leave.toDate).toLocaleDateString()}
                </td>
                <td>{leave.reason}</td>
                <td>
                  <span
                    style={{
                      padding: "4px 8px",
                      background: "#d1f5e0",
                      borderRadius: "6px",
                      color: "green",
                      fontWeight: 600,
                    }}
                  >
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeavePage;
