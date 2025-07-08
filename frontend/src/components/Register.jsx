// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = ({ setUser }) => {
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     level: "New Recruit",
//   });
//   const [picture, setPicture] = useState(null); // for file

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "picture") {
//       setPicture(files[0]); // only 1 file
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("email", formData.email);
//     data.append("mobile", formData.mobile);
//     data.append("password", formData.password);
//     data.append("level", formData.level);
//     if (picture) data.append("picture", picture);

//     try {
//       const res = await axios.post("/api/v1/auth/signup", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setUser?.(res.data.user);
//       alert("Registration successful");
//       navigate("/login");
//     } catch (err) {
//       setError(err?.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Mechanic Registration
//         </h2>

//         {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Username</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter name"
//               required
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter email"
//               required
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Mobile</label>
//             <input
//               type="text"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//               placeholder="Enter mobile number"
//               maxLength={10}
//               required
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter password"
//               required
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">
//               Profile Image
//             </label>
//             <input
//               name="picture"
//               type="file"
//               accept="image/*"
//               onChange={handleChange}
//               required
//               className="w-full p-2 mb-4 border rounded"
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-1">Level</label>
//             <select
//               name="level"
//               value={formData.level}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
//             >
//               <option value="admin">Admin</option>
//               {/* <option value="Mechanic">Mechanic</option> */}
//               <option value="Expert">Expert</option>
//               <option value="Medium">Medium</option>
//               <option value="New Recruit">New Recruit</option>
//               <option value="Trainee">Trainee</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 font-medium"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import "../styles/register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registered successfully");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <img src="/assets/dashboard.png" alt="Dashboard" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod
        </p>
      </div>
      <div className="register-right">
        <h2>Welcome to Dashboard</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name*</label>
          <input
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label>Email Address*</label>
          <input
            type="email"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <label>Password*</label>
          <input
            type="password"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <label>Confirm Password*</label>
          <input
            type="password"
            required
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
