import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Hamburgericon from "../../Image/Ham.svg";
import Register from "../auth/Register";
import SignIn from "../auth/Signin";
import Profilepic from "../../Image/profilepic.svg";
import { useNavigate } from "react-router-dom";
import closeIcon from "../../Image/close.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import AddStories from "../storiesmodal/AddStoriesModal";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import YourStory from "../YourStory.js/YourStory";

const Mobile = ({ isLoggedIn, userid }) => {
  const [isAuthenticated, SetIsAuthenticated] = useState(false);
  const [menuClick, setMenuClick] = useState(false);
  const [registerComponent, setregisterComponent] = useState(false);
  const [signinComponent, setsigninComponent] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [userId, setUserId] = useState();
  const [openAddStoriesModal, setOpenAddStoriesModal] = useState(false);
  const [stories, setStories] = useState([]);
  const [showStory, setShowStory] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const tokenInLocalStorage = localStorage.getItem("token");
    const userIdInLocalStorage = localStorage.getItem("userId");
    if (tokenInLocalStorage) {
      SetIsAuthenticated(true);
    }
    if (userIdInLocalStorage) {
      setUserId(userIdInLocalStorage);
    }
  }, []);
  const username = localStorage.getItem("username");

  // console.log("userid from navbar recieved", userId);

  const backendurl = `https://odd-gold-lizard-sock.cyclic.app/api/v1/logout`;
  // const backendurl = `http://localhost:4000/api/v1/logout`;

  const userUrl = `https://odd-gold-lizard-sock.cyclic.app/api/v1/${userId}`;
  // const userUrl = `http://localhost:4000/api/v1/${userId}`;

  // console.log("user url is: " + userUrl);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(userUrl);
        const userDetails = result.data;
        // console.log(userDetails);
        setUserDetails(userDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [userId]);

  const handleHamButtonClick = () => {
    setMenuClick(!menuClick);
  };
  const handleRegisterClick = () => {
    setregisterComponent(true);
  };
  const handleCloseRegister = () => {
    setregisterComponent(false);
  };
  const handleSigninClick = () => {
    setsigninComponent(true);
  };
  const handleCloseSignin = () => {
    setsigninComponent(false);
  };
  const handleChange = (event) => {
    event.preventDefault();
    navigate(`/bookmark/${userId}`);
  };
  const openModalHandler = () => {
    setOpenAddStoriesModal(!openAddStoriesModal);
    setTimeout(() => {
      setMenuClick(!menuClick);
    }, 500);
  };
  const handleMenuClick = () => {
    setMenuClick(!menuClick);
  };

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
    Cookies.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.reload();
    navigate("/");
  };

  const handleStoryClick = () => {
    navigate("/");
  };

  const handleHeadingClick = () => {
    navigate("/");
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <h2 className={styles.logoText} onClick={handleHeadingClick}>
          SwipTory
        </h2>
        {openAddStoriesModal && (
          <AddStories
            setOpenAddStoriesModal={setOpenAddStoriesModal}
            userId={userId}
            stories={stories}
          />
        )}
        <div className={styles.navBtns}>
          {!isAuthenticated ? (
            <>
              <div className="hamburger">
                <button
                  className={styles.hamBtn}
                  onClick={handleHamButtonClick}
                >
                  <img
                    src={Hamburgericon}
                    alt=""
                    style={{ width: "18px", height: "18px" }}
                  />
                </button>
                {menuClick && (
                  <div
                    className={styles.hamburger_content_mob}
                    style={{ height: "18rem" }}
                  >
                    <button
                      className={styles.regBtn}
                      onClick={handleRegisterClick}
                    >
                      Register Now
                    </button>
                    {registerComponent && (
                      <Register
                        onClose={handleCloseRegister}
                        setIsLoggedIn={SetIsAuthenticated}
                        setUserDetails={setUserDetails}
                        setUserId={setUserId}
                      />
                    )}
                    <div style={{ height: "1rem" }}></div>
                    <button
                      className={styles.loginBtn}
                      onClick={handleSigninClick}
                    >
                      Login
                    </button>
                    {signinComponent && (
                      <SignIn
                        onClose={handleCloseSignin}
                        setIsLoggedIn={SetIsAuthenticated}
                        setUserDetails={setUserDetails}
                        parent="home"
                        setUserId={setUserId}
                      />
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="hamburger">
                <button
                  className={styles.hamBtn}
                  onClick={handleHamButtonClick}
                >
                  <img
                    src={Hamburgericon}
                    alt=""
                    style={{ width: "18px", height: "18px" }}
                  />
                </button>
                {menuClick && (
                  <div className={styles.hamburger_content_mob}>
                    <div className={styles.user_div}>
                      <img
                        className={styles.bookmarkProfilePic}
                        src={Profilepic}
                        alt=""
                        style={{ width: "40px", height: "40px" }}
                      />
                      <h4 style={{ marginBottom: "2rem" }}>{username}</h4>
                    </div>

                    <button
                      onClick={handleStoryClick}
                      className={styles.storyBtn}
                    >
                      Your story
                    </button>

                    <button
                      className={styles.bookmarkBtn}
                      onClick={handleChange}
                    >
                      <FontAwesomeIcon icon={faBookmark} />
                      Bookmarks
                    </button>

                    <button
                      onClick={openModalHandler}
                      className={styles.addStoryBtn}
                    >
                      Add story
                    </button>

                    <button onClick={handleLogout} className={styles.logoutBtn}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {menuClick && (
            <div className={styles.close} onClick={handleMenuClick}>
              <img src={closeIcon} alt="close" />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Mobile;
