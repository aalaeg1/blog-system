import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Footer from "./components/Footer";   // 🔥 AJOUT ICI

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* PAGES */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<Article />} />
          </Routes>
        </div>

        {/* FOOTER */}
        <Footer />   {/* 🔥 AJOUT DU FOOTER ICI */}
      </div>
    </BrowserRouter>
  );
}

export default App;

