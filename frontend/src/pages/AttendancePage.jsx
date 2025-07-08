import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/candidates.css";

const AttendancePage = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  //   const [taskData, setTaskData] = useState({}); // Map employeeId -> task

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/attendance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttendanceRecords(res.data.records);
    } catch (err) {
      console.error("Error fetching attendance", err);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/employees/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data.employees);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  useEffect(() => {
    fetchAttendance();
    fetchEmployees();
  }, []);

  const handleMark = async (employeeId, status) => {
    const today = new Date().toISOString().substring(0, 10); // YYYY-MM-DD
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/attendance",
        {
          employee: employeeId,
          date: today,
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAttendance();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to mark attendance");
    }
  };

  const getStatusForEmployee = (empId) => {
    const today = new Date().toISOString().substring(0, 10);
    const record = attendanceRecords.find(
      (rec) =>
        rec.employee?._id === empId &&
        new Date(rec.date).toISOString().substring(0, 10) === today
    );
    return record?.status || "";
  };

  const filtered = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      !statusFilter || getStatusForEmployee(emp._id) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="candidate-page">
      <div className="candidate-header">
        <div className="filters">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="half-day">Half Day</option>
          </select>
        </div>
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
              <th>Position</th>
              <th>Department</th>
              {/* <th>Task</th> */}
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp) => (
              <tr key={emp._id}>
                <td>
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${emp.name}`}
                    alt={emp.name}
                    width="30"
                    height="30"
                    style={{ borderRadius: "50%" }}
                  />
                </td>
                <td>{emp.name}</td>
                <td>{emp.designation}</td>
                <td>{emp.department}</td>
                {/* <td>
                  <input
                    type="text"
                    value={taskData[emp._id] || ""}
                    onChange={(e) =>
                      setTaskData({ ...taskData, [emp._id]: e.target.value })
                    }
                    placeholder="Enter Task"
                    style={{
                      padding: "4px 8px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </td> */}
                <td>
                  <span
                    style={{
                      color:
                        getStatusForEmployee(emp._id) === "absent"
                          ? "red"
                          : "green",
                      fontWeight: 600,
                    }}
                  >
                    {getStatusForEmployee(emp._id) || "Not Marked"}
                  </span>
                </td>
                <td>
                  <select
                    value={getStatusForEmployee(emp._id) || ""}
                    onChange={(e) => handleMark(emp._id, e.target.value)}
                  >
                    <option value="">--Select--</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="half-day">Half Day</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;
