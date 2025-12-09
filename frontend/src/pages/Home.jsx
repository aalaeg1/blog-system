import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { useLottie } from "lottie-react";
import readingAnimation from "../assets/lottie/reading.json";

export default function Home() {
    const [articles, setArticles] = useState([]);

    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterDate, setFilterDate] = useState("recent");

    // Lottie animation
    const lottiePlayer = useLottie({
        animationData: readingAnimation,
        loop: true,
        autoplay: true,
        style: { width: 260, height: 260 }
    });

    /* ----------------------------------------
       FETCH ARTICLES
    ---------------------------------------- */
    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await fetch("http://localhost:1337/articles");
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error("Erreur API:", error);
            }
        }

        fetchArticles();
    }, []);

    /* ----------------------------------------
       Featured article (dernier article publié)
    ---------------------------------------- */
    const featured =
        articles.length > 0
            ? [...articles].sort(
                (a, b) =>
                    new Date(b.date_publication) - new Date(a.date_publication)
            )[0]
            : null;

    /* ----------------------------------------
       Scroll to Articles
    ---------------------------------------- */
    const scrollToArticles = () => {
        document.getElementById("articles-section")?.scrollIntoView({
            behavior: "smooth"
        });
    };

    /* ----------------------------------------
       FILTRAGE
    ---------------------------------------- */
    const filteredArticles = articles
        .filter((a) => {
            const s = search.toLowerCase();

            return (
                a.titre.toLowerCase().includes(s) ||
                a.description?.toLowerCase().includes(s) ||
                a.auteur?.nom?.toLowerCase().includes(s) ||
                a.categories?.some((cat) => cat.nom.toLowerCase().includes(s))
            );
        })
        .filter((a) =>
            filterCategory === "all"
                ? true
                : a.categories?.some((cat) => cat.nom === filterCategory)
        )
        .sort((a, b) => {
            if (filterDate === "recent") {
                return new Date(b.date_publication) - new Date(a.date_publication);
            } else {
                return new Date(a.date_publication) - new Date(b.date_publication);
            }
        });

    /* ----------------------------------------
       UI RENDER
    ---------------------------------------- */
    return (
        <div className="home">

            {/* ---------------- HERO ---------------- */}
            <section className="home-hero">
                <div className="home-hero-overlay" />

                <div className="home-hero-content">

                    <div className="home-hero-text">
                        <p className="home-hero-subtitle">OÙ LES HISTOIRES PRENNENT VIE ✨</p>

                        <h1 className="home-hero-title">
                            Bienvenue dans <br />
                            <span>Votre Bibliothèque Digitale</span>
                        </h1>

                        <p className="home-hero-description">
                            Découvre des articles inspirants, des auteurs passionnés et des
                            catégories pour tous les goûts. Installe-toi, fais défiler… et
                            laisse les mots te guider.
                        </p>

                        <button className="scroll-down-btn" onClick={scrollToArticles}>
                            Voir les articles
                        </button>
                    </div>

                    <div className="home-hero-visual">
                        {lottiePlayer.View}
                    </div>
                </div>
            </section>


            {/* ---------------- ARTICLES SECTION ---------------- */}
            <section id="articles-section" className="articles-section">
                <h2 className="articles-title">Articles récents</h2>

                {/* 🔍 Recherche + Filtres */}
                <div className="articles-filter-box">

                    <input
                        type="text"
                        placeholder="🔍 Rechercher un article, un auteur, une catégorie..."
                        className="search-bar"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="filter-btn"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="all">Toutes les catégories</option>
                        <option value="Technologie">Technologie</option>
                        <option value="Actualité">Actualité</option>
                        <option value="Science">Science</option>
                        <option value="Éducation">Éducation</option>
                        <option value="Art & Culture">Art & Culture</option>
                        <option value="Business">Business</option>
                        <option value="Développement personnel">Développement personnel</option>
                        <option value="Santé & Bien-être">Santé & Bien-être</option>
                        <option value="Voyage">Voyage</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Romance">Romance</option>
                    </select>

                    <select
                        className="filter-btn"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    >
                        <option value="recent">📅 Plus récents</option>
                        <option value="old">📜 Plus anciens</option>
                    </select>
                </div>

                {/* Liste des articles filtrés */}
                <div className="articles-grid">
                    {filteredArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>

                {filteredArticles.length === 0 && (
                    <p className="articles-empty">Aucun article trouvé.</p>
                )}
            </section>


            {/* ---------------- FEATURED ARTICLE (ULTRA PREMIUM) ---------------- */}
            {featured && (
                <section
                    className="featured-section"
                    style={{
                        marginTop: "5rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        animation: "fadeIn 1.4s ease",
                    }}
                >
                    {/* TITRE */}
                    <h2
                        style={{
                            fontSize: "2.8rem",
                            color: "white",
                            marginBottom: "2rem",
                            fontWeight: "700",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            letterSpacing: "1px",
                        }}
                    >
                        À la une
                    </h2>

                    {/* CARD */}
                    <div
                        className="featured-ultra"
                        style={{
                            width: "100%",
                            maxWidth: "1150px",
                            borderRadius: "26px",
                            overflow: "hidden",
                            position: "relative",
                            background: "rgba(255, 255, 255, 0.15)",
                            backdropFilter: "blur(14px)",
                            border: "1px solid rgba(255, 255, 255, 0.25)",
                            boxShadow:
                                "0 25px 60px rgba(0,0,0,0.35), inset 0 0 30px rgba(255,255,255,0.15)",
                            transform: "translateY(0)",
                            transition: "transform 0.45s ease, box-shadow 0.45s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-12px)";
                            e.currentTarget.style.boxShadow =
                                "0 40px 80px rgba(0,0,0,0.40), inset 0 0 40px rgba(255,255,255,0.20)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "0 25px 60px rgba(0,0,0,0.35), inset 0 0 30px rgba(255,255,255,0.15)";
                        }}
                    >
                        {/* Badges */}
                        <div
                            style={{
                                position: "absolute",
                                top: "20px",
                                left: "20px",
                                padding: "8px 16px",
                                background: "linear-gradient(135deg, #FFD54F, #FFCC00)",
                                borderRadius: "10px",
                                color: "#795600",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                zIndex: 10,
                                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                            }}
                        >
                            ✨ Article mis en avant
                        </div>

                        {/* IMAGE */}
                        <div
                            style={{
                                width: "100%",
                                height: "420px",
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            <img
                                src={
                                    featured.image?.[0]?.url
                                        ? `http://localhost:1337${featured.image[0].url}`
                                        : "https://via.placeholder.com/900x500"
                                }
                                alt={featured.titre}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    filter: "brightness(0.85)",
                                    transition: "transform 1s ease",
                                }}
                                className="featured-ultra-img"
                            />

                            {/* Spotlight overlay */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.25), transparent 60%)",
                                    pointerEvents: "none",
                                }}
                            ></div>
                        </div>

                        {/* HOVER effect zoom */}
                        <style>
                            {`
          .featured-ultra:hover .featured-ultra-img {
            transform: scale(1.12);
            filter: brightness(1);
          }
        `}
                        </style>

                        {/* CONTENT */}
                        <div style={{ padding: "2.6rem" }}>
                            <h2
                                style={{
                                    fontSize: "2rem",
                                    marginBottom: "1rem",
                                    color: "#ffffff",
                                    fontWeight: "700",
                                    textShadow: "0 2px 6px rgba(0,0,0,0.4)",
                                }}
                            >
                                {featured.titre}
                            </h2>

                            {featured.sous_titre && (
                                <p
                                    style={{
                                        fontSize: "1.25rem",
                                        fontStyle: "italic",
                                        opacity: 0.9,
                                        marginBottom: "1.8rem",
                                        color: "#e6e6e6",
                                    }}
                                >
                                    {featured.sous_titre}
                                </p>
                            )}

                            {/* CTA ULTRA PREMIUM */}
                            <a
                                href={`/article/${featured.id}`}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "0.9rem 1.9rem",
                                    background: "linear-gradient(135deg, #1b2b44, #2c466b)",
                                    color: "white",
                                    borderRadius: "12px",
                                    fontWeight: "600",
                                    fontSize: "1.05rem",
                                    textDecoration: "none",
                                    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                                    transition: "0.35s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background =
                                        "linear-gradient(135deg, #0f1a2b, #1b2b44)";
                                    e.target.style.transform = "scale(1.06)";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background =
                                        "linear-gradient(135deg, #1b2b44, #2c466b)";
                                    e.target.style.transform = "scale(1)";
                                }}
                            >
                                📖 Lire l’article complet
                            </a>
                        </div>
                    </div>

                    {/* ANIMATIONS CSS */}
                    <style>
                        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}
                    </style>
                </section>
            )}

        </div>
    );
}
