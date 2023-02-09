import axios from "axios";
import { useState, useEffect } from "react";

const [isLoading, setIsLoading] = useState(true);
const [auth, setAuth] = useState([]);

const fetchData = async () => {
  const response = await axios.post(`http://localhost:3000/signup`);

  setAuth(response.data);
  setIsLoading(false);
};

useEffect(() => {
  fetchData();
}, []);

const Singup = () => {
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <form
        className="form"
        onChange={(event) => {
          event.preventDefault();
        }}
      >
        <h1>S'inscrire</h1>
        <input type="text" placeholder="Nom d'utilisateur"></input>
        <input type="email" placeholder="Email"></input>
        <input type="password" placeholder="Mot de passe"></input>
        <div className="checbox">
          <input className="check" type="checkbox"></input>
          <label>S'inscrire à notre newsletter</label>
        </div>
        <p className="condition">
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Singup;
