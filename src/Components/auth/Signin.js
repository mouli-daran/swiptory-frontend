import React, { useState } from "react";
import styles from "./signin.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cross from "../../Image/close.png";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";

const SignIn = ({
  onClose,
  setIsLoggedIn,
  setUserDetails,
  setLoginComponent,
  parent,
  setUserId,
}) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const backendUrl = `https://fine-erin-bee-cape.cyclic.app/api/v1/login`;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(backendUrl, {
        username: userName,
        password: password,
      });

      const data = res.data;
      if (data.success) {
        setIsLoggedIn(true);
        setUserId(data.user._id);
        Cookies.set("token", data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("username", userName);
        toast.success("Logged In. Enjoy the Stories!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUserDetails(data.user);
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Wrong password!");
    }

    setUsername("");
    setPassword("");
  };

  const handleClose = () => {
    if (parent === "home") {
      onClose();
    } else if (parent === "individualStory") {
      setLoginComponent(false);
    }
  };

  return (
    <div className={styles.signinBackground}>
      <div className={styles.signinContainer}>
        <button className={styles.signinCrossBtn} onClick={handleClose}>
          <img src={cross} alt="" style={{ width: "15px", height: "15px" }} />
        </button>
        <p className={styles.signinSwip}>Sign In to SwipTory</p>
        <form onSubmit={handleFormSubmit}>
          <label className={styles.signinRlab1}>Username</label>
          <TextField
            className={styles.signinRegiform1}
            type="text"
            placeholder="Enter userName"
            value={userName}
            onChange={handleUsernameChange}
            InputProps={{
              style: { height: "30px", width: "200px" },
            }}
          />
          <label className={styles.signinRlab2}>Password</label>
          <TextField
            className={styles.signinRegiform2}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                  style={{ height: "5px", width: "5px", right: "10px" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
              style: { height: "30px", width: "200px" },
            }}
          />
          <button type="submit" className={styles.signinRegiBtn}>
            Sign In
          </button>
        </form>
        <p className={styles.signinError}>Please enter valid userName</p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignIn;
