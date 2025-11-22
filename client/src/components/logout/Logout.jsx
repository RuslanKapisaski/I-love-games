import { useNavigate } from "react-router";

export default function Logout({ onLogout }) {
  const navigate = useNavigate();

  onLogout();

  navigate("/");
}
