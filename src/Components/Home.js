import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./home.css";

import all from "../Image/image 466.png";
import food from "../Image/fillimg3.jpg";
import travel from "../Image/fillimg2.jpg";
import health from "../Image/medicine.jpg";
import movies from "../Image/movie.jpg";
import education from "../Image/fillimg4.png";

import All from "./Filters/All";
import Travel from "./Filters/Travel";
import Food from "./Filters/Food";
import Health from "./Filters/Health";
import Movies from "./Filters/Movies";
import Education from "./Filters/Education";
import YourStory from "./YourStory.js/YourStory";
import Navbar from "./navbar/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [userId, setUserId] = useState();
  const [stories, setStories] = useState([]);

  const [showFilter, setShowFilter] = useState({
    all: true,
    travel: false,
    food: false,
    health: false,
    movies: false,
    education: false,
  });
  const backendUrl = `https://fine-erin-bee-cape.cyclic.app/api/v1/stories/getallstories`;
  //const backendUrl = `http://localhost:4000/api/v1/stories/getallstories`;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  //const userUrl = `http://localhost:4000/api/v1/${userId}`;
  const userUrl = `https://fine-erin-bee-cape.cyclic.app/api/v1/${userId}`;

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(userUrl);
        // console.log("result issss-", result);
        const userDetails = result.data;
        console.log(userDetails);
        setUserDetails(userDetails);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [userId]);

  // console.log("userdetails is---", userId);

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

  return (
    <div className="header">
      <div>
        <Navbar isLoggedIn={isLoggedIn} userId={userId} />
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

      {/* <TopTrendingStories /> */}
    </div>
  );
};

export default Home;
