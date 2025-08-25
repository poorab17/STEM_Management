import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StudentsPage from "./pages/StudentsPage";
import AttendancePage from "./pages/AttendancePage";
import LoginPage from "./pages/LoginPage";

function App() {
  // You can add authentication state here later
  const isLoggedIn = true; // For now, assume teacher is logged in

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/students" /> : <LoginPage />}
        />

        {/* Student Management */}
        <Route path="/students" element={<StudentsPage />} />

        {/* Attendance Management */}
        <Route path="/attendance" element={<AttendancePage />} />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Catch-all route */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
