// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const [tool, setTool] = useState({
//     name: "",
//     category: "",
//     image: null,
//     quantity: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "image") {
//       setTool((prev) => ({ ...prev, image: files[0] }));
//     } else {
//       setTool((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", tool.name);
//     formData.append("category", tool.category);
//     formData.append("quantity", tool.quantity);
//     if (tool.image) formData.append("image", tool.image); // send file

//     console.log("ddd", formData);
//     try {
//       await axios.post("/api/v1/tools/addTool", formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Tool added successfully");
//       setTool({ name: "", category: "", image: null, quantity: "" });
//     } catch (error) {
//       alert(error?.response?.data?.message || "Error adding tool");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg border border-gray-200">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
//           <button
//             onClick={handleLogout}
//             className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>

//         <h3 className="text-lg font-semibold mb-4 text-gray-700">
//           Add New Tool
//         </h3>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             value={tool.name}
//             onChange={handleChange}
//             placeholder="Tool Name"
//             required
//             className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
//           />

//           <input
//             type="text"
//             name="category"
//             value={tool.category}
//             onChange={handleChange}
//             placeholder="Category (e.g., Screwdriver)"
//             required
//             className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
//           />

//           <input
//             type="file"
//             name="image"
//             onChange={handleChange}
//             accept="image/*"
//             required
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="number"
//             name="quantity"
//             value={tool.quantity}
//             onChange={handleChange}
//             placeholder="Quantity"
//             required
//             className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 font-medium"
//           >
//             Add Tool
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import CandidatePage from "./CandidatePage";
import EmployeePage from "./EmployeePage";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <Outlet />
          <CandidatePage />
        </div>
        {/* <div style={{ padding: "20px" }}>
          <Outlet />
          <EmployeePage />
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
