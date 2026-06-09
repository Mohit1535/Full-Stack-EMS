import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginLanding from "./pages/LoginLanding";
import Dashboard from "./pages/Dashboard";
import Leave from "./pages/Leave";
import Attendance from "./pages/Attendance";
import Employees from "./pages/Employees";
import Payslips from "./pages/Payslips";
import PrintPaySlip from "./pages/PrintPaySlip";
import SettingsPage from "./pages/Settings";
import Layout from "./pages/Layout";
import Loginform from "./components/loginform";
import PrintPayslip from "./pages/PrintPaySlip";



export default function App() {
  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/login" element={<LoginLanding />} />
        <Route path="/login/admin" element={<Loginform role="admin" title="Admin Portal" subtitle="Sign in to manage the organization" />} />
        <Route path="/login/employee" element={<Loginform  role="employee" title="Employee Portal" subtitle="Sign in to access your account" />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/payslips" element={<Payslips />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
<Route path="/payslips/print/:id" element={<PrintPayslip />} />


<Route
  path="*"
  element={<Navigate to="/dashboard" replace />}
/>

      </Routes>
    </>
  );
}
