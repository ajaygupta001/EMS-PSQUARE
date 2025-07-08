// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("/api/v1/auth/login", {
//         email,
//         password,
//       });

//       // Store token
//       localStorage.setItem("token", res.data.accessToken);

//       console.log("data", res.data);
//       // Navigate based on role
//       if (res.data.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/mechanic");
//       }
//     } catch (err) {
//       setError(err?.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Login
//         </h2>

//         {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-600 text-sm font-medium mb-1">
//               Email
//             </label>
//             <input
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 outline-none focus:border-blue-400"
//               type="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               autoComplete="off"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-600 text-sm font-medium mb-1">
//               Password
//             </label>
//             <input
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 outline-none focus:border-blue-400"
//               type="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 font-medium cursor-pointer"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });
  //     const data = await res.json();

  //     console.log("ddd", data);
  //     if (res.ok) {
  //       localStorage.setItem("token", data.accessToken);
  //       alert("Login successful!");
  //     } else {
  //       alert(data.message || "Login failed");
  //     }

  //     if (data.user.role === "admin") {
  //       navigate("/admin");
  //     } else if (data.user.role === "employee") {
  //       navigate("/employee");
  //     } else {
  //       navigate("/hr");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Something went wrong");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/login", { email, password });

      // console.log("ddd", res.data.user.role);

      const { accessToken, user } = res.data;

      login(user, accessToken); // <- Save to context and localStorage

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else if (res.data.user.role === "employee") {
        navigate("/employee");
      } else {
        navigate("/hr");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="/assets/dashboard.png" alt="Dashboard" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod
        </p>
      </div>
      <div className="login-right">
        <h2>Welcome to Dashboard</h2>
        <form onSubmit={handleSubmit}>
          <label>Email Address*</label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password*</label>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>
          Don't have an account? <a href="/">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
