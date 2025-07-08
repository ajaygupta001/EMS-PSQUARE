import React, { useState } from "react";
import "../styles/AddCandidateModal.css";
import axios from "axios";

const AddCandidateModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // skills: "",
    experience: null,
    position: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("position", formData.position);
    payload.append("experience", formData.experience);

    payload.append("phone", formData.phone);
    // payload.append("skills", formData.skills); // comma separated string
    payload.append("resume", formData.resume);

    try {
      await axios.post("/api/candidates/create", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Candidate created successfully!");
      onClose();
    } catch (err) {
      console.error("Error creating candidate", err);
      alert("Failed to create candidate");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h2>Add New Candidate</h2>
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name*"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address*"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number*"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience"
            onChange={handleChange}
            required
          />
          <input type="file" name="resume" onChange={handleChange} required />

          <div className="checkbox-declare">
            <input type="checkbox" required />
            <span>I hereby declare that the above info is true</span>
          </div>

          <button type="submit" className="save-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCandidateModal;
