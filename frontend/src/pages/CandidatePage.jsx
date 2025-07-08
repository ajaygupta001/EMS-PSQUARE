import React, { useEffect, useState, useRef } from "react";
import "../styles/candidates.css";
import axios from "axios";
import AddCandidateModal from "../components/AddCandidateModal";
import { FaEllipsisV } from "react-icons/fa";

const CandidatePage = () => {
  const [candidates, setCandidates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);

  const [search, setSearch] = useState("");

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/candidates/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCandidates(res.data.candidates);
    } catch (error) {
      console.error("Error fetching candidates", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/candidates/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCandidates();
    } catch (err) {
      alert("Error deleting candidate");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/candidates/status/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCandidates();
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    }
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchName = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "" || c.status === statusFilter;
    const matchPosition =
      positionFilter === "" ||
      c.skills?.some((skill) =>
        skill.toLowerCase().includes(positionFilter.toLowerCase())
      );

    return matchName && matchStatus && matchPosition;
  });

  console.log("ddd", selectedCandidate);

  return (
    <div className="candidate-page">
      <div className="candidate-header">
        <div className="filters">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="selected">Selected</option>
          </select>

          <select
            className="filter-select"
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
          >
            <option value="">All Positions</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="hr">HR</option>
            {/* Optionally generate from skills dynamically */}
          </select>
        </div>

        <div className="search-and-add">
          <input
            type="text"
            placeholder="🔍 Search"
            className="candidate-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="add-candidate-btn"
            onClick={() => setShowModal(true)}
          >
            Add Candidate
          </button>
        </div>
      </div>

      <div className="candidate-table">
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Candidate Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Status</th>
              <th>Experience</th>
              <th>Action</th>

              {/* <th>Resume</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate, index) => (
              <tr key={candidate._id}>
                <td>{String(index + 1).padStart(2, "0")}</td>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.phone}</td>
                <td>{candidate.position}</td>

                {/* <td>{candidate.skills?.join(", ")}</td> */}
                <td>
                  <select
                    value={candidate.status}
                    onChange={(e) =>
                      handleStatusChange(candidate._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="selected">Selected</option>
                    <option value="new">New</option>
                  </select>
                </td>

                <td>{candidate.experience}</td>
                <td className="action-col">
                  <button
                    className="modal-btn"
                    onClick={() => {
                      if (candidate.resume) {
                        window.open(
                          `http://localhost:5000${candidate.resume}`,
                          "_blank"
                        );
                      } else {
                        alert("No resume uploaded.");
                      }
                    }}
                  >
                    📄 Download
                  </button>

                  <button
                    className="modal-btn danger"
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem("token");
                        await axios.delete(
                          `/api/candidates/delete/${candidate._id}`,
                          {
                            headers: { Authorization: `Bearer ${token}` },
                          }
                        );
                        fetchCandidates(); // refresh list
                      } catch (err) {
                        alert("Error deleting candidate");
                      }
                    }}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddCandidateModal
          onClose={() => {
            setShowModal(false);
            fetchCandidates(); // refresh after modal close
          }}
        />
      )}
    </div>
  );
};

export default CandidatePage;
