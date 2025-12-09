import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

export default function Article() {
    const { id } = useParams();

    const [article, setArticle] = useState(null);
    const [showAuthor, setShowAuthor] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    /* ---------------------------------------
       FETCH ARTICLE
    ---------------------------------------- */
    useEffect(() => {
        async function fetchArticle() {
            try {
                const response = await fetch(`http://localhost:1337/articles/${id}`);
                const data = await response.json();

                console.log("ARTICLE (Strapi v3):", data);
                setArticle(data);

                fetchSuggestions(data.id);
            } catch (error) {
                console.error("Erreur API :", error);
            }
        }

        fetchArticle();
    }, [id]);

    /* ---------------------------------------
       FETCH AUTRES ARTICLES
    ---------------------------------------- */
    async function fetchSuggestions(currentId) {
        try {
            const response = await fetch("http://localhost:1337/articles");
            const all = await response.json();

            const s = all.filter(a => a.id !== currentId).slice(0, 3);
            setSuggestions(s);

        } catch (error) {
            console.error("Erreur suggestions:", error);
        }
    }

    if (!article)
        return <p style={{ color: "white", textAlign: "center" }}>Chargement...</p>;

    /* ---------------------------------------
       ASSETS (Strapi v3)
    ---------------------------------------- */

    const imageUrl = article.image?.[0]?.url
        ? `http://localhost:1337${article.image[0].url}`
        : "https://via.placeholder.com/800x400";

    const author = article.auteur;

    const authorPhoto = author?.photo?.[0]?.url
        ? `http://localhost:1337${author.photo[0].url}`
        : "https://via.placeholder.com/120";

    const pdfUrl = article.contenu_pdf?.[0]?.url
        ? `http://localhost:1337${article.contenu_pdf[0].url}`
        : null;

    const categories = article.categories || [];

    /* ---------------------------------------
       UI
    ---------------------------------------- */

    return (
        <div
            style={{
                width: "100%",
                minHeight: "100vh",
                background: "#354465",
                padding: "3rem 1rem",
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
            }}
        >

            {/* ------------- ASIDE GAUCHE : CATÉGORIES ------------- */}
            <aside
                style={{
                    width: "240px",
                    background: "white",
                    borderRadius: "12px",
                    padding: "1rem",
                    height: "fit-content",
                    position: "sticky",
                    top: "2rem",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                }}
            >
                <h3 style={{ marginBottom: "1rem", color: "#2a3a52" }}>📘 Catégories</h3>

                {categories.length === 0 ? (
                    <p style={{ fontSize: "0.9rem", color: "#777" }}>
                        Aucune catégorie disponible.
                    </p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {categories.map((cat) => (
                            <li
                                key={cat.id}
                                style={{
                                    marginBottom: "0.6rem",
                                    cursor: "default",
                                    color: "#1e3a5f",
                                    fontSize: "0.95rem",
                                }}
                            >
                                • {cat.nom}
                            </li>
                        ))}
                    </ul>
                )}
            </aside>

            {/* ------------- CONTENU PRINCIPAL ------------- */}
            <div
                style={{
                    width: "900px",
                    background: "white",
                    borderRadius: "16px",
                    padding: "2rem 3rem",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    color: "#333",
                    fontFamily: "Georgia, serif",
                    position: "relative",
                }}
            >

                {/* IMAGE */}
                <img
                    src={imageUrl}
                    alt={article.titre}
                    style={{
                        width: "100%",
                        borderRadius: "12px",
                        marginBottom: "2rem",
                        objectFit: "cover",
                        maxHeight: "450px",
                    }}
                />

                {/* TITRE */}
                <h1 style={{ fontSize: "2.7rem", marginBottom: "0.5rem" }}>
                    {article.titre}
                </h1>

                {/* SOUS-TITRE */}
                {article.sous_titre && (
                    <h3
                        style={{
                            fontSize: "1.3rem",
                            fontStyle: "italic",
                            color: "#666",
                            marginBottom: "1.5rem",
                        }}
                    >
                        {article.sous_titre}
                    </h3>
                )}

                {/* AUTEUR */}
                <div
                    style={{
                        marginBottom: "1.5rem",
                        color: "#555",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        position: "relative",
                    }}
                >
                    {author && (
                        <>
                            <span>✍️ <b>{author.nom}</b></span>

                            <button
                                onClick={() => setShowAuthor(!showAuthor)}
                                style={{
                                    padding: "4px 10px",
                                    background: "#2a3a52",
                                    color: "white",
                                    borderRadius: "8px",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Info auteur
                            </button>

                            {showAuthor && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "2rem",
                                        left: "0",
                                        background: "white",
                                        padding: "1rem",
                                        borderRadius: "12px",
                                        boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                                        width: "220px",
                                        zIndex: 10,
                                    }}
                                >
                                    <img
                                        src={authorPhoto}
                                        alt="Auteur"
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            borderRadius: "50%",
                                            marginBottom: "0.8rem",
                                            objectFit: "cover",
                                        }}
                                    />

                                    <p><b>Nom :</b> {author.nom}</p>
                                    <p><b>Email :</b> {author.email}</p>

                                    <button
                                        onClick={() => setShowAuthor(false)}
                                        style={{
                                            background: "#ddd",
                                            border: "none",
                                            padding: "4px 8px",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            marginTop: "0.5rem",
                                            float: "right",
                                        }}
                                    >
                                        Fermer
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    <span>📅 {article.date_publication}</span>
                </div>

                {/* DESCRIPTION */}
                <div style={{ marginBottom: "2rem" }}>
                    <h2 style={{ marginBottom: "0.8rem" }}>Description :</h2>
                    {article.description
                        ? parse(article.description)
                        : <p style={{ color: "#777" }}>Aucune description disponible.</p>}
                </div>

                {/* PDF */}
                {pdfUrl && (
                    <div style={{ marginTop: "2rem" }}>
                        <h2>📄 Télécharger le livre :</h2>
                        <br />
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-block",
                                padding: "0.8rem 1.5rem",
                                background: "#2a3a52",
                                color: "white",
                                borderRadius: "10px",
                                fontWeight: "bold",
                                textDecoration: "none",
                            }}
                        >
                            📘 Lire / Télécharger le PDF
                        </a>
                    </div>
                )}

                {/* ----------- SUGGESTIONS ----------- */}
                <h2 style={{ marginTop: "3rem" }}>✨ Vous aimerez aussi</h2>

                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                    {suggestions.map((art) => (
                        <Link
                            key={art.id}
                            to={`/article/${art.id}`}
                            style={{
                                background: "#f5f5f5",
                                padding: "1rem",
                                borderRadius: "10px",
                                width: "30%",
                                textDecoration: "none",
                                color: "#333",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                            }}
                        >
                            <h4>{art.titre}</h4>
                            <p style={{ fontSize: "0.9rem", color: "#666" }}>
                                {art.sous_titre || "Lire l’article →"}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>


            {/* ------------- ASIDE DROIT : INFOS RAPIDES ------------- */}
            <aside
                style={{
                    width: "240px",
                    background: "gray",
                    borderRadius: "12px",
                    padding: "1rem",
                    height: "fit-content",
                    position: "sticky",
                    top: "2rem",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                }}
            >
                <h3 style={{ marginBottom: "1rem", color: "#2457a4ff" }}>📌 Infos rapides</h3>

                <p><b>Sous titre :</b><br /> {article.sous_titre}</p>








                {pdfUrl && (
                    <p style={{ marginTop: "1rem" }}>
                        📄 <b>PDF disponible</b>
                    </p>
                )}
            </aside>

        </div>
    );
}
