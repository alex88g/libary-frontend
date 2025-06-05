import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Library from "./Library";
import AdminDashboard from "./AdminDashboard";
import Navbar from "../components/Navbar";
import ResetPassword from "./ResetPassword";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";
import MyLoansPage from "./MyLoansPage";
import HomePage from "./HomePage";
import ReviewPage from "./ReviewPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/library" element={<Library />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/my-loans" element={<MyLoansPage />} />
          <Route path="/book/:bookId/reviews" element={<ReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
