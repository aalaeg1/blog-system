import { Link } from "react-router-dom";

function ArticleCard({ article }) {
    const { id, titre, image, date_publication } = article;

    const imageUrl = image?.[0]?.url
        ? `http://localhost:1337${image[0].url}`
        : "https://via.placeholder.com/300";

    return (
        <Link
            to={`/article/${id}`}
            style={{ textDecoration: "none", color: "inherit" }}
        >
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "1rem",
                    borderRadius: "8px",
                    background: "#c7bb4b",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "350px", // --- Hauteur uniforme pour toutes les cartes ---
                    overflow: "hidden",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                }}
            >
                {/* Image uniforme */}
                <img
                    src={imageUrl}
                    alt={titre}
                    style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "6px",
                    }}
                />

                {/* Titre bloqué sur 2 lignes max */}
                <h2
                    style={{
                        fontSize: "1.2rem",
                        marginTop: "0.7rem",
                        marginBottom: "0.4rem",
                        height: "2.6rem",
                        overflow: "hidden",
                        fontWeight: "600",
                        lineHeight: "1.3",
                    }}
                >
                    {titre}
                </h2>

                {/* Date */}
                <p style={{ fontSize: "0.85rem", color: "#444" }}>
                    <b>Date :</b> {date_publication}
                </p>

                {/* Auteur */}
                {article.auteur && (
                    <p style={{ fontSize: "0.85rem", color: "#444" }}>
                        <b>Auteur :</b> {article.auteur.nom}
                    </p>
                )}

                {/* Catégories */}
                {article.categories && (
                    <p style={{ fontSize: "0.85rem", color: "#444" }}>
                        <b>Catégories :</b>{" "}
                        {article.categories.map((cat) => cat.nom).join(", ")}
                    </p>
                )}
            </div>
        </Link>
    );
}

export default ArticleCard;
