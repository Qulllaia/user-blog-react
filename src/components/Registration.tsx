import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";

export const Registration = () => {
  const navigate = useNavigate();

  function registerFunction(e: any) {
    e.preventDefault();
    fetch("http://localhost:7000/auth/registration", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target[0].value,
        password: e.target[1].value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("token", data.token);
        navigate("/home");
      })
      .catch((e) => console.log(e.message));
  }

  return (
    <main className="form-signin w-100 m-auto">
      <form className="auth-from" onSubmit={(e) => registerFunction(e)}>
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2 mt-2" type="submit">
          Sign up
        </button>
        <Link to={"/login"}>Войти в аккаунт</Link>
      </form>
    </main>
  );
};
