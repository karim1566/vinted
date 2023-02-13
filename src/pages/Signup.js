import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Singup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState("off");

  const [errorMessage, setErrorMessage] = useState("");

  //   Permet de naviguer
  const navigate = useNavigate();

  //   Fonction qui sera appelée quand je clique sur le bouton submit
  const handleSignup = async (event) => {
    event.preventDefault();
    //   Je fais disparaitre le message d'erreur
    setErrorMessage("");
    try {
      //   Requête axios :
      // - Premier argument : l'url que j'interroge
      // - deuxième : le body que j'envoie
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      //   Si je reçois bien un token
      if (response.data.token) {
        // Cookies.set("token-vinted", response.data.token, { expires: 14 });
        // Je l'enregistre dans mon state et mes cookies
        handleToken(response.data.token);
        // Et je redirige vers Home
        navigate("/");
      }
    } catch (error) {
      //   console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
      //   Si je reçois un message d'erreur "This email already has an account"
      if (error.response.data.message === "This email already has an account") {
        setErrorMessage(
          "Cet email est déjà utilisé, veuillez créer un compte avec un mail valide."
        );
      }
      //   Si je reçois un message d'erreur "Missing parameters"
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs svp.");
      }
    }
  };
  return (
    <div>
      <form className="form" onSubmit={handleSignup}>
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
          <input
            className="check"
            type="checkbox"
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          ></input>
          <label>S'inscrire à notre newsletter</label>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
