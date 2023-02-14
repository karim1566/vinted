import logo from "../assets/img/logo.svg";
import { Link } from "react-router-dom";

const Header = ({ handleToken, token, search, setSearch }) => {
  return (
    <header className="container">
      <Link to="/">
        <img src={logo} alt=""></img>
      </Link>

      <input
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        placeholder="Recherche des articles"
      ></input>
      {token ? (
        <button
          className="sedec"
          onClick={() => {
            handleToken(null);
          }}
        >
          Se deconnecter
        </button>
      ) : (
        <div>
          <Link to="/signup" className="margin">
            <button>S'inscrire</button>
          </Link>
          <Link to="/login">
            <button>Se connecter</button>
          </Link>
        </div>
      )}

      <Link to={token ? "/publish" : "/login"}>
        <button className="vendsA">Vends tes articles</button>
      </Link>
    </header>
  );
};

export default Header;
