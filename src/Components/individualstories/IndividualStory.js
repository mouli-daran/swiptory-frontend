import { useState, useEffect, useRef } from "react";
import SignIn from "../auth/Signin";
import styles from "./individualStory.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faBookmark,
  faChevronLeft,
  faChevronRight,
  faPaperPlane,
  faX,
} from "@fortawesome/free-solid-svg-icons";

const IndividualStory = ({ handleSigninClick }) => {
  const [story, setStory] = useState();
  const [currentslide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginComponent, setLoginComponent] = useState(false);
  const [userId, setUserId] = useState();
  const slideContainerRef = useRef(null);

  const { id } = useParams();
  const storyId = id;

  const navigate = useNavigate();

  const backendUrl = `https://fine-erin-bee-cape.cyclic.app/api/v1/stories/${storyId}`;
  const backendUrlEdit = `https://fine-erin-bee-cape.cyclic.app/api/v1/stories/editstory/${storyId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(backendUrl);
        if (result.data.success) {
          setStory(result.data.story);
          console.log(story);
        } else {
          toast.error(result.data.message);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

    let userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
      userId = Number(userId);
      setUserId(userId);
    }
  }, []);

  const previousSlide = () => {
    setCurrentSlide((currentslide) => {
      if (currentslide > 0) {
        return currentslide - 1;
      }
      // console.log(currentslide);
      return currentslide;
    });
  };

  const nextSlide = () => {
    setCurrentSlide((currentslide) => {
      if (story && story.slides && currentslide < story.slides.length - 1) {
        return currentslide + 1;
      } else {
        toast.error("No more slides available");
      }
      // console.log(currentslide);
      return currentslide;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (story && story.slides && currentslide < story.slides.length - 1) {
        nextSlide();
      } else {
        clearInterval(timer);
      }
    }, 10000);

    return () => clearInterval(timer);
  }, [story, currentslide]);

  const handleBookmark = async () => {
    if (!isLoggedIn) {
      setLoginComponent(true);
      toast.error("Login Plese !!");
    } else {
      const previousStory = story;
      const updatedStory = {
        ...previousStory,
        bookmark: story.bookmark ? false : true,
      };

      try {
        const result = await axios.put(backendUrlEdit, updatedStory);
        if (result.data.success) {
          console.log(updatedStory, "updated at api");
          setStory(updatedStory);
        }
      } catch (error) {
        toast.error("error");
      }
    }
  };

  const closeModal = () => {
    navigate("/");
  };

  const handleLike = async () => {
    if (!isLoggedIn) {
      toast.error("Login Plese !!");
    } else {
      setStory((previousStory) => {
        const updatedSlides = previousStory.slides.map((slide, index) => {
          if (index === currentslide) {
            if (slide.liked) {
              toast.error("Unliked!!");
              return { ...slide, like: slide.like - 1, liked: false };
            } else {
              toast.success("🦄 Wow!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              return { ...slide, like: slide.like + 1, liked: true };
            }
          } else {
            return slide;
          }
        });

        const updatedStory = { ...previousStory, slides: updatedSlides };
        try {
          const result = axios.put(backendUrlEdit, updatedStory);
          if (result.data.success) {
            // console.log(updatedStory);
            setStory(updatedStory);
          } else {
            toast.error("error");
          }
        } catch (error) {
          console.log(error);
        }

        return updatedStory;
      });
    }
  };

  const handleTapLeft = () => {
    previousSlide();
  };

  const handleTapRight = () => {
    nextSlide();
  };

  return (
    <div className={styles.background}>
      {story && story.slides && story.slides[currentslide] && (
        <div
          className={`${styles.container} ${styles.backgroundImage}`}
          style={{
            backgroundImage: `url(${story.slides[currentslide].image.url})`,
          }}
          onTouchStart={(e) => {
            if (e.touches[0].clientX < window.innerWidth / 2) {
              handleTapLeft();
            } else {
              handleTapRight();
            }
          }}
        >
          <div className={styles.slideContainer}>
            {story.slides.map((slide, index) =>
              index < currentslide ? (
                <span
                  key={index}
                  className={`${styles.slide} ${styles.dark}`}
                ></span>
              ) : index === currentslide ? (
                <span
                  key={index}
                  className={`${styles.slide} ${styles.dark} ${styles.animated}`}
                ></span>
              ) : (
                <span key={index} className={styles.slide}></span>
              )
            )}
          </div>

          <div className={styles.ButtonContainer}>
            <button className={styles.slideCloseBtn} onClick={closeModal}>
              <FontAwesomeIcon icon={faX} />
            </button>

            <button
              className={styles.slideCloseBtn}
              onClick={() => {
                toast.success("🦄 Link Copied !", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>

          <div>
            <button className={styles.leftSlide} onClick={previousSlide}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className={styles.rightSlide} onClick={nextSlide}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          {/* Heading and description */}
          <div className={styles.detailsContainer}>
            <h1 className={styles.align}>
              {story.slides[currentslide].heading}
            </h1>
            <p className={styles.descriptionAlign}>
              {story.slides[currentslide].description}
            </p>

            {/* Bookmark and heart button */}
            <div className={styles.ButtonContainerBookmark}>
              {story.bookmark ? (
                <button
                  className={`${styles.slideBookmarkBtn} ${styles.bookmarkedBtn}`}
                  onClick={handleBookmark}
                >
                  <FontAwesomeIcon icon={faBookmark} />
                </button>
              ) : (
                <button
                  className={styles.slideBookmarkBtn}
                  onClick={handleBookmark}
                >
                  <FontAwesomeIcon icon={faBookmark} />
                </button>
              )}

              <button
                className={`${styles.slideLikeBtn} ${
                  story.slides[currentslide].liked ? styles.liked : ""
                }`}
                onClick={handleLike}
              >
                <FontAwesomeIcon icon={faHeart} />
                <span className={styles.likeNumber}>
                  {story.slides[currentslide].like}
                </span>
              </button>
            </div>
          </div>
          {loginComponent && (
            <SignIn
              setLoginComponent={setLoginComponent}
              parent="individualStory"
            />
          )}
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default IndividualStory;
