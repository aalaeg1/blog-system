import { useState } from "react";
import moorootLogo from "../assets/mooroot.png";

export default function Footer() {
    const [showContact, setShowContact] = useState(false);

    return (
        <footer
            style={{
                background: "#24344d",
                padding: "3rem 1rem",
                marginTop: "4rem",
                textAlign: "center",
                color: "white",
                borderTop: "2px solid rgba(255,255,255,0.1)",
                position: "relative",
            }}
        >
            {/* --- TITRE --- */}
            <h3 style={{ fontSize: "1.7rem", marginBottom: "0.8rem", fontWeight: "600" }}>
                Bibliothèque Digitale
            </h3>

            <p style={{ fontSize: "1rem", opacity: 0.85, marginBottom: "1.5rem" }}>
                Lire, découvrir, apprendre — chaque jour une nouvelle histoire ✨
            </p>

            {/* --- NAVIGATION --- */}
            <div style={{ marginBottom: "2rem" }}>
                <a href="#" style={linkStyle}>Accueil</a>
                <a href="#" style={linkStyle}>Articles</a>
                <a href="#" style={linkStyle}>À propos</a>

                {/* 👉 Contact ouvre maintenant un popup */}
                <span
                    style={{ ...linkStyle, cursor: "pointer" }}
                    onClick={() => setShowContact(true)}
                >
                    Contact
                </span>
            </div>

            {/* --- SÉPARATEUR --- */}
            <div style={separator}></div>

            {/* --- COLLAB LOGO --- */}
            <div style={{ marginTop: "2rem", marginBottom: "1rem" }}>
                <p style={{ opacity: 0.7, marginBottom: "0.8rem" }}>
                    ✨ En collaboration avec
                </p>

                <img
                    src={moorootLogo}
                    alt="Mooroot Studio"
                    style={{
                        width: "200px",
                        opacity: 0.95,
                        filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))",
                    }}
                />
            </div>

            {/* --- COPYRIGHT --- */}
            <p style={{ fontSize: "0.85rem", opacity: 0.6, marginTop: "1rem" }}>
                © {new Date().getFullYear()} Bibliothèque Digitale — Tous droits réservés.
            </p>


            {/* -------------------- POPUP CONTACT -------------------- */}
            {showContact && (
                <div style={popupOverlay}>
                    <div style={popupBox}>
                        <h3 style={{ marginBottom: "1rem", color: "#1e3a5f" }}>
                            📞 Contact
                        </h3>

                        <p style={{ margin: "0.5rem 0", fontSize: "1rem" }}>
                            📧 Email : <br></br>
                            <a href="mailto:aalaegouudal8@gmail.com" style={popupLink}>
                                aalaegouudal8@gmail.com
                            </a>
                        </p>

                        <p style={{ margin: "0.5rem 0", fontSize: "1rem" }}>
                            💬 WhatsApp : <br></br>
                            <a
                                href="https://wa.me/212642292870"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={popupLink}
                            >
                                +212 642 292 870
                            </a>
                        </p>

                        <button
                            style={closeButton}
                            onClick={() => setShowContact(false)}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </footer>
    );
}

/* -------------------- STYLES -------------------- */

const linkStyle = {
    margin: "0 12px",
    color: "#FFD54F",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1rem",
    transition: "0.2s",
};

const separator = {
    width: "80%",
    margin: "1.5rem auto",
    height: "1px",
    background: "rgba(255,255,255,0.15)",
};

/* POPUP CONTACT */

const popupOverlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const popupBox = {
    background: "black",
    padding: "2rem",
    borderRadius: "15px",
    width: "310px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.3s ease",
};

const popupLink = {
    color: "#1e3a5f",
    fontWeight: "bold",
    textDecoration: "none",
};

const closeButton = {
    marginTop: "1.3rem",
    background: "#2a3a52",
    color: "white",
    border: "none",
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    cursor: "pointer",
};
