import axios from "axios";
import { useState, useEffect } from "react";

const Singup = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetchData = async () => {
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/user/signup",
      {
        username: username,
        email: email,
        password: password,
      }
    );
    console.log(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return !isLoading ? (
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
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
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
