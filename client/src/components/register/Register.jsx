import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm";

export default function Register({ user, onRegister }) {
  const navigate = useNavigate();

  const registerSubmit = (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!email || !password) {
      return alert("Email and password are required!");
    }

    if (password !== confirmPassword) {
      return alert("Passwords missmatch!");
    }

    onRegister(email, password);
    navigate("/");
  };

  const { register, formAction } = useForm(registerSubmit, {
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    //  <!-- Register Page ( Only htmlFor Guest users ) -->
    <section id="register-page" className="content auth">
      <form id="register" action={formAction}>
        <div className="container">
          <div className="brand-logo"></div>
          <h1>Register</h1>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Your Email"
          />

          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            id="register-password"
            {...register("password")}
            placeholder="Password"
          />

          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            {...register("confirmPassword")}
            placeholder="Repeat Password"
          />

          <input className="btn submit" type="submit" value="Register" />
        </div>
      </form>
    </section>
  );
}
