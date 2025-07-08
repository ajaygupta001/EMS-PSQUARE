import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
// import MechanicDashboard from "./components/MechanicDashboard";
// import IssueTool from "./components/IssueTool";
// import ReturnTool from "./components/ReturnTool";
// import IssueRegister from "./components/IssueRegister";
import PrivateRoute from "./ErrorBoundaries/PrivateRoute";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CandidatePage from "./pages/CandidatePage";
import EmployeePage from "./pages/EmployeePage";
import AttendancePage from "./pages/AttendancePage";
import LeavePage from "./pages/LeavePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/admin" element={<AdminDashboard />} /> */}

        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <PrivateRoute allowedRoles={["employee"]}>
              <EmployeeDashboard />
            </PrivateRoute>
          }
        />

        {/* <Route path="/mechanic" element={<MechanicDashboard />} />
        <Route path="/issue-tool" element={<IssueTool />} />
        <Route path="/return-tool" element={<ReturnTool />} />
        <Route path="/issue-register" element={<IssueRegister />} /> */}

        {/* HRMS pages */}
        <Route path="/candidates" element={<CandidatePage />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/leaves" element={<LeavePage />} />

        {/* Fallback */}
        {/* <Route path="*" element={<p>404 Not Found</p>} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

// {/* Protected route for admin only */}
//       <Route
//         path="/admin"
//         element={
//           <PrivateRoute allowedRoles={["admin"]}>
//             <AdminDashboard />
//           </PrivateRoute>
//         }
//       />

//       {/* Protected route for HR/admin */}
//       <Route
//         path="/candidates"
//         element={
//           <PrivateRoute allowedRoles={["admin", "hr"]}>
//             <CandidatePage />
//           </PrivateRoute>
//         }
//       />
