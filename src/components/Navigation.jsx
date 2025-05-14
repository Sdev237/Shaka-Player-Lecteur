import React, { useState, useEffect } from "react";
import "./Navigation.css";

const Navigation = ({ onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const handleSearchBlur = () => {
    if (!searchQuery) {
      setIsSearchActive(false);
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Logo"
          className="nav-logo"
        />
        <ul className="nav-links">
          <li>
            <a href="#accueil">Accueil</a>
          </li>
          <li>
            <a href="#series">Séries</a>
          </li>
          <li>
            <a href="#films">Films</a>
          </li>
          <li>
            <a href="#nouveautes">Nouveautés</a>
          </li>
          <li>
            <a href="#mylist">Ma Liste</a>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <div className={`search-box ${isSearchActive ? "active" : ""}`}>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          <button className="search-button">🔍</button>
        </div>
        <div className="profile-menu">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Profile"
            className="profile-icon"
          />
          <div className="profile-dropdown">
            <ul>
              <li>
                <a href="#profile">Profil</a>
              </li>
              <li>
                <a href="#account">Compte</a>
              </li>
              <li>
                <a href="#help">Aide</a>
              </li>
              <li>
                <a href="#logout">Déconnexion</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
