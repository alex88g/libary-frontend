import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
 <nav>
  <div>
    <Link to="/">📚 Bibliotek</Link>
    <Link to="/Library">Tillgängliga böcker</Link>

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
      <button onClick={logout}>Logga ut</button>
    )}
  </div>
</nav>

  );
};

export default Navbar;
