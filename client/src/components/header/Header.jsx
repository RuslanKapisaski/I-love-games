import { Link } from "react-router";

export default function Header() {
  return (
    <header>
      <nav>
        <Link className="home" to="/">
          <img src="./public/images/logo.png" alt="logo" />
        </Link>
        <Link to="/catalog">Catalog</Link>
        {/* <!-- Logged-in users --> */}
        <div id="user">
          <Link to="/games/create">Add Game</Link>
          <Link to="/logout">Logout</Link>
        </div>
        {/* <!-- Guest users --> */}
        <div id="guest">
          <Link to="/users/login">Login</Link>
          <Link to="/users/register">Register</Link>
        </div>
      </nav>
    </header>
  );
}
