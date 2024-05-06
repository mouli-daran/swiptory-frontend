import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Register from "../auth/Register";
import axios from "axios";
import SignIn from "../auth/Signin";
import Profilepic from "../../Image/profilepic.svg";
import Hamburgericon from "../../Image/Ham.svg";
import Logout from "../auth/Logout";
import { useNavigate } from "react-router-dom";
import AddStories from "../storiesmodal/AddStoriesModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const Desktop = () => {
  const [isAuthenticated, SetIsAuthenticated] = useState(false);
  const [registerComponent, setregisterComponent] = useState(false);
  const [signinComponent, setsigninComponent] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [userId, setUserId] = useState();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [openAddStoriesModal, setOpenAddStoriesModal] = useState(false);
  const [stories, setStories] = useState([]);

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

  const navigate = useNavigate();

  const userUrl = `https://fine-erin-bee-cape.cyclic.app/api/v1/${userId}`;
  //const userUrl = `http://localhost:4000/api/v1/${userId}`;

  // console.log("userUrl from desktop isss: " + userUrl);

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
    setOpenAddStoriesModal(true);
  };

  const handleHamButtonClick = () => {
    setOpenLogoutModal((prevState) => !prevState);
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <h2 className={styles.logoText}>SwipTory</h2>
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
              <button className="register-btn" onClick={handleRegisterClick}>
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
              <button className="signin-btn" onClick={handleSigninClick}>
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
            </>
          ) : (
            <>
              <button className={styles.bookmarkBtn} onClick={handleChange}>
                <FontAwesomeIcon icon={faBookmark} />
                Bookmarks
              </button>

              <button onClick={openModalHandler} className={styles.addStoryBtn}>
                Add story
              </button>
              <div>
                <img
                  className={styles.bookmarkProfilePic}
                  src={Profilepic}
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                />
              </div>
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
                {openLogoutModal && (
                  <Logout parent={"home"} userDetails={userDetails} />
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Desktop;
