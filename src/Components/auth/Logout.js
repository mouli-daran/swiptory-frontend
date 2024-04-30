import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./logout.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = ({ parent }) => {
  const navigate = useNavigate();
  const backendurl = `http://localhost:4000/api/v1/logout`;

  const username = localStorage.getItem("username");
  console.log("username is---", username);

  const handleLogout = () => {
    const loggedOut = axios.get(backendurl);
    console.log(loggedOut);
    toast.info("Logged out!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    if (parent === "home") {
      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.reload();
      navigate("/");
    } else {
      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.reload();
    }
  };

  return (
    <div className={styles.logoutContainer}>
      <p className={styles.logUsername}>{username}</p>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>

      <ToastContainer />
    </div>
  );
};

export default Logout;
