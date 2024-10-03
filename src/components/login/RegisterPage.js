import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import About from "./About";

import "../css/login/login.css";
import "../css/login/form.css";

const RegisterPage = () => {
 
    const navigate = useNavigate();

    // states to get the details
    const [userName, setuserName] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

  const handleSubmit = (e) => {
    if(password===repassword){
      axios
      .post(`https://happy-bites.onrender.com/users/add-user`, {
        userName: userName,
        firstName:firstName,
        lastName:lastName,
        password: password,
      })
      .then((resp) => {
        checkUser(resp);
      })
      .catch((err) => {
        console.log(err);
        toast("Invaild User");
  });    
    } else {
      toast ("Re-type the correct password!", {type:"error"})
    }
    e.preventDefault();
  };

  const checkUser = async (details) => {
    if (details.data.status) {
      await toast(details.data.message, { type: "success", onClose :()=> {
        navigate("/");
      }});
      // Add a delay before navigating
   
    } else {
      toast(details.data.message, { type: "error" });
    }
  };

  return (
    <>
    <ToastContainer />
      <header className="showcase-main-login" style={{height:"100%"}}>
        {/* <NavbarLogin /> */}
          <div className="content-login" >
            <p>
              Already have an account?
              <a
                href="/"
                style={{ textDecoration: "none", color: "#fca311" }}
              >
                {" "}
                Log in
              </a>
            </p>
            <form className="box" style={{width:"40%"}} onSubmit={handleSubmit}>
              <div className="form-item">
                <label className="block">Username</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your username"
                  onChange={(e) => setuserName(e.target.value)}
                  required
                />
              </div>
              <div className="form-item">
                <label className="block">First Name</label>
                <input
                  type="text"
                  name="text"
                  id="text"
                  placeholder="Enter your first name"
                  onChange={(e) => setfirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-item">
                <label className="block">Last Name</label>
                <input
                  type="text"
                  name="text"
                  id="text"
                  placeholder="Enter your last name"
                  onChange={(e) => setlastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-item">
                <label className="block">Password</label>
                <input
                  type="password"
                  name="password"
                  // value={password}
                  placeholder="enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-item">
                <label className="block">Retype Password</label>
                <input
                  type="password"
                  name="checkpassword"
                  // value={password}
                  placeholder="re-enter your password"
                  onChange={(e) => setRepassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-item login-button">
                <button
                      className="btn-link btn"
                      type="submit"
                      style={{
                        background: "#fca311",
                        border: "1px black solid",
                      }}
                    >Register <i class="fas fa-chevron-right"></i></button>
              </div>
            </form>
          </div>
      </header>
    </>
  );
};

export default RegisterPage;