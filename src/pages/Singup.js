import axios from "axios";
import { useState } from "react";

const Singup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [newsletter, setNewsletter] = useState("off");

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  // salut
  return (
    <div>
      <form
        className="form"
        onChange={(event) => {
          event.preventDefault();
          fetchData();
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
          <input
            className="check"
            type="checkbox"
            // onChange={(event) => {
            //   setNewsletter(event.target.value);
            // }}
          ></input>
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
