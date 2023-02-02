import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth, googleAuthProvider, facebookAuthProvider } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { LOGOUT } from "../../actions/types";
import { createOrUpdateUser } from "../../actions/auth";
import { saveUserAddress } from "../../actions/user";

const GuestLogin = ({ history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (history.location.state) {
      return;
    } else {
      if (user && user.token) {
        history.push("/");
      }
    }
  }, [user, history]);

  const roleBasedRedirect = (res) => {
    //check if user needs to be redirected to a different page
    let userPage = history.location.state;
    if (userPage) {
      history.push(userPage.from);
    } else {
      //role based redirect
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else if (res.data.role === "vendor") {
        history.push("/vendor/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.createUserWithEmailAndPassword(
        "guest-" + email,
        "guest@123"
      );

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          saveUserAddress(password, idTokenResult.token);
          auth.signOut();
          dispatch({
            type: LOGOUT,
            payload: null,
          });
          window.localStorage.removeItem("user");
          history.push("/");
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group font-weight-bold mb-1 question">
          <label htmlFor="email">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form-group font-weight-bold mb-1 question">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group font-weight-bold mb-2 question">
          <label htmlFor="password">Address</label>
          <textarea
            type="text"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="row justify-content-center font-weight-bold mt-2 question">
          <Button
            onClick={handleSubmit}
            type="primary"
            shape="round"
            block
            icon={<MailOutlined />}
            size="large"
            disabled={!email || !password || !name}
            className="mb-2 mt-2 font-weight-bold font-weight-bold question"
          >
            Checkout as Guest
          </Button>
        </div>
      </form>
    );
  };
  return (
    <div className="container mt-5 ">
      <div className="row">
        <div className="col-md-8 offset-md-3">
          <div className="card register-form">
            <div className="card-header">
              {loading ? <h4>Loading....</h4> : <h4>Checkout</h4>}
            </div>
            <div className="card-body">{loginForm()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestLogin;
