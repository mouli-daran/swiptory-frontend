import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./home.css";
import styles from "./bookmarkpage.module.css";
import Bookmarkicon from "../Image/bookmark-icon.png";
import Profilepic from "../Image/profilepic.svg";
import Hamburgericon from "../Image/Ham.svg";
import all from "../Image/image 466.png";
import food from "../Image/fillimg3.jpg";
import travel from "../Image/fillimg2.jpg";
import health from "../Image/medicine.jpg";
import movies from "../Image/movie.jpg";
import education from "../Image/fillimg4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

import AddStories from "./storiesmodal/AddStoriesModal";
import Register from "./auth/Register";
import SignIn from "./auth/Signin";
import Logout from "./auth/Logout";
import All from "./Filters/All";
import Travel from "./Filters/Travel";
import Food from "./Filters/Food";
import Health from "./Filters/Health";
import Movies from "./Filters/Movies";
import Education from "./Filters/Education";
import TopTrendingStories from "./TopTrending/TopTrendingStories";
import YourStory from "./YourStory.js/YourStory";

const Home = () => {
  const navigate = useNavigate();

  const [registerComponent, setregisterComponent] = useState(false);
  const [signinComponent, setsigninComponent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [userId, setUserId] = useState();
  const [stories, setStories] = useState([]);
  const [openAddStoriesModal, setOpenAddStoriesModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [showFilter, setShowFilter] = useState({
    all: false,
    travel: false,
    food: false,
    health: false,
    movies: false,
    education: false,
  });
  const backendUrl = `http://localhost:4000/api/v1/stories/getallstories`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(backendUrl);

        const data = res.data;
        setStories(data.stories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    const tokenInLocalStorage = localStorage.getItem("token");
    const userIdInLocalStorage = localStorage.getItem("userId");
    if (tokenInLocalStorage) {
      setIsLoggedIn(true);
    }
    if (userIdInLocalStorage) {
      setUserId(userIdInLocalStorage);
    }
  }, []);

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  const userUrl = `https://swip-troy-backend.vercel.app/api/v1/${userId}`;

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(userUrl);
        const userDetails = result.data;
        console.log(userDetails);
        setUserDetails(userDetails);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [userId]);

  const handleFoodButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      food: prevState.food ? false : true,
    }));
  };

  const handleaAllButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      all: prevState.all ? false : true,
    }));
  };

  const handleTravelButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      travel: prevState.travel ? false : true,
    }));
  };

  const handleHealthButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      health: prevState.health ? false : true,
    }));
  };

  const handleMoviesButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      movies: prevState.movies ? false : true,
    }));
  };

  const handleEducationButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      education: prevState.education ? false : true,
    }));
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
    setOpenAddStoriesModal(true);
  };

  const handleHamButtonClick = () => {
    setOpenLogoutModal((prevState) => !prevState);
  };

  return (
    <div className="header">
      <div className="navbar">
        {" "}
        <h3 className="app-name">SwipTory</h3>
        {openAddStoriesModal && (
          <AddStories
            setOpenAddStoriesModal={setOpenAddStoriesModal}
            userId={userId}
            stories={stories}
          />
        )}
        {/* {openIndividualStoryModal && <IndividualStory setOpenIndividualStoryModal={setOpenIndividualStoryModal} setregisterComponent={setregisterComponent}  />} */}
        {isLoggedIn ? (
          <div>
            <button className={styles.bookmarkBtn} onClick={handleChange}>
              <FontAwesomeIcon icon={faBookmark} />
            </button>
            <button onClick={openModalHandler} className={styles.addStoryBtn}>
              Add story
            </button>
            <img
              className={styles.bookmarkProfilePic}
              src={Profilepic}
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
            <button className={styles.hamBtn} onClick={handleHamButtonClick}>
              <img
                src={Hamburgericon}
                alt=""
                style={{ width: "18px", height: "18px" }}
              />
            </button>
            {openLogoutModal ? (
              <Logout parent={"home"} userDetails={userDetails} />
            ) : null}
          </div>
        ) : (
          <div>
            <button className="register-btn" onClick={handleRegisterClick}>
              Register Now
            </button>
            {registerComponent && (
              <Register
                onClose={handleCloseRegister}
                setIsLoggedIn={setIsLoggedIn}
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
                setIsLoggedIn={setIsLoggedIn}
                setUserDetails={setUserDetails}
                parent="home"
                setUserId={setUserId}
              />
            )}
          </div>
        )}
      </div>

      <div className="filter-container">
        <button
          className="fillter-button-container"
          onClick={handleaAllButtonClick}
        >
          <img src={all} alt="" className="filter-images" />
          <h3 className="filter-names">All</h3>
        </button>

        <button
          className="fillter-button-container"
          onClick={handleFoodButtonClick}
        >
          <img src={food} alt="" className="filter-images" />
          <h3 className="filter-names">Food</h3>
        </button>

        <button
          className="fillter-button-container"
          onClick={handleTravelButtonClick}
        >
          <img src={travel} alt="" className="filter-images" />
          <h3 className="filter-names">Travel</h3>
        </button>

        <button
          className="fillter-button-container"
          onClick={handleHealthButtonClick}
        >
          <img src={health} alt="" className="filter-images" />
          <h3 className="filter-names">Health</h3>
        </button>

        <button
          className="fillter-button-container"
          onClick={handleMoviesButtonClick}
        >
          <img src={movies} alt="" className="filter-images" />
          <h3 className="filter-names">Movies</h3>
        </button>

        <button
          className="fillter-button-container"
          onClick={handleEducationButtonClick}
        >
          <img src={education} alt="" className="filter-images" />
          <h3 className="filter-names">Education</h3>
        </button>
      </div>

      {isLoggedIn ? (
        <YourStory userId={userId} isLoggedIn={isLoggedIn} />
      ) : null}

      {/* filters */}

      {showFilter.all && (
        <p className="filter-heading">Top Stories About All</p>
      )}
      {showFilter.all && <All />}

      {showFilter.travel && (
        <p className="filter-heading">Top Stories About travel</p>
      )}
      {showFilter.travel && <Travel />}

      {showFilter.food && (
        <p className="filter-heading">Top Stories About food</p>
      )}
      {showFilter.food && <Food />}

      {showFilter.health && (
        <p className="filter-heading">Top Stories About health</p>
      )}
      {showFilter.health && <Health />}

      {showFilter.movies && (
        <p className="filter-heading">Top Stories About movies</p>
      )}
      {showFilter.movies && <Movies />}

      {showFilter.education && (
        <p className="filter-heading">Top Stories About education</p>
      )}
      {showFilter.education && <Education />}

      <TopTrendingStories />
    </div>
  );
};

export default Home;
