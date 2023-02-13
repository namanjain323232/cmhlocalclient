import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/user/history");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is send to ${email}. Please check your email to complete registration.`
    );

    //save the user to local storage
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };

  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group font-weight-bold mb-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </div>
        <div className="row justify-content-center">
          <button type="submit" className="btn btn-primary mt-3">
            Register
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container mt-5 ">
      <div className="row mb-2">
        <div className="col-md-8 offset-md-3">
          <div className="card register-form">
            <div className="card-header">
              <h1>Register</h1>
            </div>
            <div className="card-body">{registerForm()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
