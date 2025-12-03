import { useContext } from "react";

import { useNavigate } from "react-router";
import UserContext from "../../contexts/UserContext";

export default function Logout() {
  const navigate = useNavigate();

  const { logoutHandler } = useContext(UserContext);
  logoutHandler();

  navigate("/");
}
