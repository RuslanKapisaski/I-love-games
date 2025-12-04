import { Link } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

export default function Header() {
  const { isAuthenticated } = useUserContext();
  return (
    <header>
      <nav>
        <Link className="home" to="/">
          <img src="./public/images/logo.png" alt="logo" />
        </Link>
        <Link to="/catalog">Catalog</Link>
        {/* <!-- Logged-in users --> */}
        {isAuthenticated === true ? (
          <div id="user">
            <Link to="/games/create">Add Game</Link>
            <Link to="/logout">Logout</Link>
          </div>
        ) : (
          <div id="guest">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
