import "./css/App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function App(props: any) {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && token !== "undefined") navigate("/home");
    else navigate("/login");
  }, []);
  return (
    <div className="App">
      {props.children}
      <Outlet />
    </div>
  );
}

export default App;
