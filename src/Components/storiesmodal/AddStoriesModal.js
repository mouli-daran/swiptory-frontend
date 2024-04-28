import { useEffect, useState } from "react";
import addStoriesStyle from "./addStoriesModal.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const AddStories = ({ setOpenAddStoriesModal, userId, stories }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [numberOfSlides, setNumberOfSlides] = useState([]);
  const [slides, setSlides] = useState([
    {
      heading: "",
      description: "",
      image: {
        url: "",
      },
      category: "",
      like: 0,
    },
  ]);

  useEffect(() => {}, [stories]);

  const backendUrl = `http://localhost:4000/api/v1/stories/createstories`;
  // const localHost = `http://localhost:4000/api/v1/stories/createstories`;

  const handleSlideChange = (index, field, value) => {
    const newSlides = [...slides];
    if (field === "image") {
      newSlides[index][field].url = value;
    } else {
      newSlides[index][field] = value;
    }
    setSlides(newSlides);
    console.log(newSlides);
  };

  console.log(currentSlide);

  // const AddSlide = ({ setOpenAddStoriesModal }) => {
  //   console.log(numberOfSlides.length);
  //   if (numberOfSlides.length < 6) {
  //     setNumberOfSlides((prevSlides) => [...prevSlides, prevSlides.length + 1]);
  //     setSlides((prevSlides) => [
  //       ...prevSlides,
  //       {
  //         heading: "",
  //         description: "",
  //         image: {
  //           url: "",
  //         },
  //         like: 0,
  //       },
  //     ]);
  //   } else {
  //     toast.error("Maximium six slides are allowed");
  //   }
  // };

  // const deleteSlide = () => {
  //   console.log(numberOfSlides.length);
  //   if (numberOfSlides.length > 3) {
  //     setNumberOfSlides((prevSlides) => prevSlides.slice(0, -1));
  //     setSlides((prevSlides) => prevSlides.slice(0, -1));
  //     if (currentSlide === numberOfSlides.length - 1) {
  //       setCurrentSlide(currentSlide - 1);
  //     }
  //   } else {
  //     toast.error("Minimum three slides are required");
  //   }
  // };

  const AddSlide = ({ setOpenAddStoriesModal }) => {
    if (slides.length < 6) {
      setSlides((prevSlides) => [
        ...prevSlides,
        {
          heading: "",
          description: "",
          image: {
            url: "",
          },
          like: 0,
        },
      ]);
    } else {
      toast.error("Maximium six slides are allowed");
    }
  };

  const deleteSlide = () => {
    if (slides.length > 3) {
      setSlides((prevSlides) => prevSlides.slice(0, -1));
      if (currentSlide === slides.length - 1) {
        setCurrentSlide(currentSlide - 1);
      }
    } else {
      toast.error("Minimum three slides are required");
    }
  };

  const closeModal = () => {
    console.log("i am being clicked");
    setOpenAddStoriesModal(false);
  };

  const handleCreateStories = async () => {
    console.log(slides);
    if (slides.length < 3) {
      toast.error("Minimum three slides are required");
    } else {
      try {
        const result = await axios.post(backendUrl, {
          bookmark: false,
          userId: userId,
          slides: slides,
        });

        const data = result.data;

        if (data.success) {
          toast("Successfully created stories");
          toast.info("Please reload page to see lastest changes");
          closeModal();
        } else {
          console.log(data.message);
          toast.error("Error in creating stories");
        }
      } catch (error) {
        console.log(error);
        toast.info("Heading should not exceed 20 character length ");
      }
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const nextSlide = () => {
    if (
      !slides[currentSlide].heading ||
      !slides[currentSlide].description ||
      !slides[currentSlide].image["url"] ||
      !slides[currentSlide].category
    ) {
      toast.error("All input are required");
    } else {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }
  };

  return (
    <div className={addStoriesStyle.background}>
      <div className={addStoriesStyle.addStoriesContainer}>
        <button className={addStoriesStyle.closeBtn} onClick={closeModal}>
          <FontAwesomeIcon icon={faX} />
        </button>
        <span className={addStoriesStyle.info}>Add upto 6 slides</span>
        <div className={addStoriesStyle.slideContainer}>
          {slides.map((slide, index) => {
            return (
              <div className={addStoriesStyle.slide}>
                <button
                  key={index}
                  className={`${addStoriesStyle.slideBtn} ${
                    index === currentSlide ? addStoriesStyle.btnBorder : ""
                  }`}
                >
                  Slide{index + 1}
                  <button
                    className={addStoriesStyle.slideCloseBtn}
                    onClick={deleteSlide}
                  >
                    <FontAwesomeIcon icon={faX} />
                  </button>
                </button>
              </div>
            );
          })}

          {slides > 5 ? null : (
            <button onClick={AddSlide} className={addStoriesStyle.addBtn}>
              Add +
            </button>
          )}
        </div>

        <form className={addStoriesStyle.formContainer}>
          {/* <div className={addStoriesStyle.formInputContainer}> */}
          <div className={addStoriesStyle.filedContainer}>
            <h3>
              <label>Heading: </label>
            </h3>
            <input
              type="text"
              name="heading"
              placeholder="Your heading"
              className={`${addStoriesStyle.input} ${addStoriesStyle.alignHeading}`}
              value={slides[currentSlide].heading}
              onChange={(e) =>
                handleSlideChange(currentSlide, "heading", e.target.value)
              }
            ></input>
          </div>

          <div className={addStoriesStyle.filedContainer}>
            <h3>
              <label>Description: </label>
            </h3>
            <input
              type="text"
              name="description"
              placeholder="Story Description"
              className={`${addStoriesStyle.input} ${addStoriesStyle.alignDescription}`}
              value={slides[currentSlide].description}
              onChange={(e) =>
                handleSlideChange(currentSlide, "description", e.target.value)
              }
            />
          </div>

          <div className={addStoriesStyle.filedContainer}>
            <h3>
              <label>Image: </label>
            </h3>
            <input
              type="text"
              name="image"
              placeholder="Add Image URL"
              className={`${addStoriesStyle.input} ${addStoriesStyle.alignImage}`}
              value={slides[currentSlide].image.url}
              onChange={(e) =>
                handleSlideChange(currentSlide, "image", e.target.value)
              }
            ></input>
          </div>

          <div className={addStoriesStyle.filedContainer}>
            <h3>
              <label>Category: </label>
            </h3>
            <select
              id="filters"
              className={`${addStoriesStyle.input} ${addStoriesStyle.alignCategory}`}
              value={slides[currentSlide].category}
              onChange={(e) =>
                handleSlideChange(currentSlide, "category", e.target.value)
              }
              onBlur={(e) => {
                if (e.target.value) {
                  handleSlideChange(currentSlide, "category", e.target.value);
                }
              }}
              required
            >
              <option>Select a category</option>
              <option value="food">food </option>
              <option value="health">health</option>
              <option value="travel">travel</option>
              <option value="movies">movies</option>
              <option value="education">education</option>
            </select>
          </div>
          {/* </div> */}
        </form>

        <div className={addStoriesStyle.btnContainer}>
          <button
            onClick={previousSlide}
            className={addStoriesStyle.previousBtn}
          >
            Previous
          </button>
          <button onClick={nextSlide} className={addStoriesStyle.nextBtn}>
            Next
          </button>
          <button
            onClick={handleCreateStories}
            className={addStoriesStyle.postBtn}
          >
            Post
          </button>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default AddStories;
