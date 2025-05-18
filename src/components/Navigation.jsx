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
        <div className="sap-logo" data-testid="sap-logo">
          <span className="sap-text">
            <span className="letter">S</span>
            <span className="letter">A</span>
            <span className="letter">P</span>
          </span>
          <span className="streaming-text">
            <span className="letter">S</span>
            <span className="letter">t</span>
            <span className="letter">r</span>
            <span className="letter">e</span>
            <span className="letter">a</span>
            <span className="letter">m</span>
            <span className="letter">i</span>
            <span className="letter">n</span>
            <span className="letter">g</span>
          </span>
        </div>
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
            //src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
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
