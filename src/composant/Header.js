import logo from "../assets/img/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container">
      <Link to="/">
        <img src={logo} alt=""></img>
      </Link>

      <input placeholder="Recherche des articles"></input>
      <button>S'inscrire</button>
      <button>Se connecter</button>
      <button className="vendsA">Vends tes articles</button>
    </header>
  );
};

export default Header;
