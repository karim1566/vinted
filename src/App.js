import "./App.css";
// PACKAGE
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// COMPOSANT
import Header from "./composant/Header";
// PAGES
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Singup from "./pages/Singup";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/signup" element={<Singup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
