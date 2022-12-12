import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Menu, Badge } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import "bootstrap/dist/css/bootstrap.css";
import logo from "./common/cmh_new.png";
import firebase from 'firebase';
import { LOGOUT } from "../actions/types";
import SearchBar from "./utils/Search";

const { SubMenu } = Menu;

const Header = () => {

  const [current, setCurrent] = useState('home');

  const dispatch = useDispatch();
  const history = useHistory();
  const { user, cart } = useSelector((stateVal) => ({ ...stateVal }));

  const handleClick = (e) => {
    setCurrent(e.key);
  }

  const logout = () => {
    firebase.auth().signOut()
    dispatch({
      type: LOGOUT,
      payload: null
    });
    window.localStorage.removeItem("user");
    history.push("/login");
  }

  return (
    <div>
      <header>
        <section className="header-section" id="title">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-dark">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span key="span1" className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="nav navbar-nav navbar-center">
                  <li className="nav-item">
                    <a className="nav-link font-weight-bold" href="/contact">Contact</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link font-weight-bold" href="/newletter">Newsletter</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link font-weight-bold" href="/download">Download</a>
                  </li>
                </ul>
              </div>

              <Menu onClick={handleClick} selectedKeys={[current]}
                mode="horizontal"
                className="font-weight-bold d-flex p-1 mr-5">

                <Menu.Item key="home" icon={<HomeOutlined />} >
                  <Link to="/">Home </Link>
                </Menu.Item>

                <Menu.Item key="shop" icon={<ShoppingOutlined />} >
                  <Link to="/shop">Shop</Link>
                </Menu.Item>

                <Menu.Item key="cart" icon={<ShoppingCartOutlined />} >
                  <Link to="/cart">
                    <Badge count={cart.length} offset={[9, 0]}>
                      Cart
                    </Badge>
                  </Link>
                </Menu.Item>
              </Menu>

              <Menu onClick={handleClick} selectedKeys={[current]}
                mode="horizontal"
                className="font-weight-bold fontname ">


                {!user &&
                  <Menu.Item key="login" icon={<LoginOutlined />} >
                    <Link to="/login">Login</Link>
                  </Menu.Item>}

                {!user &&
                  <Menu.Item key="vendorregistration" icon={<UserSwitchOutlined />} >
                    <Link to="/vendorregister">Vendor Registration</Link>
                  </Menu.Item>}

                {!user &&
                  <Menu.Item key="register" icon={<UserAddOutlined />}>
                    <Link to="/register">Register</Link>
                  </Menu.Item>
                }

                {user &&
                  <SubMenu key="SubMenu" icon={<SettingOutlined />}
                    className="float-right"
                    title={user.email && user.email.split("@")[0]}>

                    {user && user.role === "subscriber" && (
                      <Menu.Item key="userdashboard">
                        <Link to="/user/history">Dashboard</Link>
                      </Menu.Item>
                    )}
                    {user && user.role === "vendor" && (
                      <Menu.Item key="vendordashboard">
                        <Link to="/vendor/dashboard">Dashboard</Link>
                      </Menu.Item>
                    )}
                    {user && user.role === "admin" && (
                      <Menu.Item key="admindashbboard">
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </Menu.Item>
                    )}

                    <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>Logout</Menu.Item>

                  </SubMenu>
                }

                <span key="searchbarSpan" className="float-left p-1">
                  <SearchBar />
                </span>
              </Menu>


            </nav>

            <div className="row">
              <div className="pull-left col-sm-12">
                <img src={logo} alt="Compare my Helper" className="float-left header-img" />
              </div>
            </div>
          </div>
        </section>
      </header>
    </div>
  );
}



export default Header;