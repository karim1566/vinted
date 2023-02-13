import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = ({ setConnect, Cookies }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 1 });
      }

      Cookies && setConnect(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          fetchData();
        }}
      >
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
