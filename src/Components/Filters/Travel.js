import Filter from "./Filter";
import filters from "../TopTrending/trending.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndividualStory from "../individualstories/IndividualStory";
import { useNavigate } from "react-router-dom";

const Travel = () => {
  const navigate = useNavigate();
  const initialVisibleIndiaImages = 4;
  const [stories, setStories] = useState([]);
  const [visibleIndiaImages, setVisibleIndiaImages] = useState(
    initialVisibleIndiaImages
  );

  const backendUrl = `http://localhost.4000/api/v1/stories/filteredStories`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(backendUrl, {
          category: "travel",
        });
        if (result.data.success) {
          setStories(result.data.filteredStories);
        } else {
          toast.error("error in filters");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSeeMoreIndiaClick = () => {
    setVisibleIndiaImages(visibleIndiaImages + 4);
  };

  const individualStoryPage = (e) => {
    const storyId = e.target.getAttribute("id");
    // console.log(e.target.getAttribute("id"));
    navigate(`/individualstory/${storyId}`);
  };

  return (
    <>
      {stories && stories.length === 0 ? (
        <h1 className={filters.NoMoreStories}>No stories are available</h1>
      ) : (
        <>
          <div className={filters.container}>
            {stories &&
              stories.length > 0 &&
              stories.slice(0, visibleIndiaImages).map((story) => {
                return (
                  <div
                    id={story._id}
                    onClick={individualStoryPage}
                    className={`${filters.storycontainer} ${filters.background} ${filters.container}`}
                    style={{
                      backgroundImage: `url(${
                        story.slides &&
                        story.slides[0] &&
                        story.slides[0].image &&
                        story.slides[0].image.url
                      })`,
                    }}
                  >
                    <div
                      className={filters.wrappered}
                      id={story._id}
                      onClick={individualStoryPage}
                    >
                      <h3
                        className={filters.heading}
                        id={story._id}
                        onClick={individualStoryPage}
                      >
                        {story.slides &&
                          story.slides[0] &&
                          story.slides[0].heading}
                      </h3>
                      <p
                        className={filters.decsription}
                        id={story._id}
                        onClick={individualStoryPage}
                      >
                        {story.slides &&
                          story.slides[0] &&
                          story.slides[0].description}
                      </p>
                    </div>
                  </div>
                );
              })}

            {stories && stories.length > visibleIndiaImages && (
              <button
                className={filters.seeMoreBtn}
                onClick={handleSeeMoreIndiaClick}
              >
                See more
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Travel;
