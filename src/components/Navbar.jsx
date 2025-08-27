import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, role, logout } = useAuth();

  const handleLogout = () => {
    logout(); // rensar både context och localStorage
    navigate("/login", { replace: true });
  };

  return (
    <nav>
      <div>
        <Link to="/">📚 Bibliotek</Link>
        <Link to="/library">Tillgängliga böcker</Link>

        {token && role === "admin" && <Link to="/admin">Admin</Link>}
        {token && role !== "admin" && <Link to="/my-loans">Mina lån</Link>}
        {token && <Link to="/profile">Profil</Link>}
      </div>

      <div>
        {!token ? (
          <>
            <Link to="/login">Logga in</Link>
            <Link to="/register">Registrera</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Logga ut</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
