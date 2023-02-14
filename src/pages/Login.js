import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        handleToken(response.data.token);

        navigate("/publish");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <form className="forme" onSubmit={handleLogin}>
        <h1>Se connecter</h1>
        <input
          type="email"
          placeholder="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></input>

        <input
          type="password"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <button type="submit">Se connecter</button>

        <Link to="/signup">
          <p>Pas encore de compte ? Inscris-toi!</p>
        </Link>
      </form>
    </div>
  );
};
export default Login;
