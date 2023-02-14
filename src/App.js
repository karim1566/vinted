import "./App.css";
// PACKAGE

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// COMPOSANT
import Header from "./composant/Header";
import CheckoutForm from "./composant/CheckoutForm";
import Cookies from "js-cookie";
// PAGES
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

function App() {
  const [token, setToken] = useState(Cookies.get("token-vinted") || null);

  const [search, setSearch] = useState("");

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token-vinted", token, { expires: 14 });
    } else {
      setToken(null);
      Cookies.remove("token-vinted");
    }
  };
  //
  return (
    <div>
      <Router>
        <Header
          handleToken={handleToken}
          token={token}
          search={search}
          setSearch={setSearch}
        />

        <Routes>
          <Route path="/" element={<Home search={search} token={token} />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
          <Route path="/publish" element={<Publish token={token} />} />
          <Route
            path="payment"
            element={
              <Elements stripe={stripePromise}>
                <CheckoutForm token={token} />
              </Elements>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
