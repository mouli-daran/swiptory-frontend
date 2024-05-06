import { useEffect, useState } from "react";
import filters from "./trending.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const TopTrendingStories = ({ setOpenIndividualStoryModa }) => {
  const navigate = useNavigate();
  const initialVisibleIndiaImages = 4;
  const [stories, setStories] = useState();
  const [visibleIndiaImages, setVisibleIndiaImages] = useState(
    initialVisibleIndiaImages
  );

  const backendUrl = `https://fine-erin-bee-cape.cyclic.app/api/v1/stories/getallstories`;
  //const backendUrl = `http://localhost:4000/api/v1/stories/getallstories`;

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(backendUrl);
        const data = result.data;
        if (data.success) {
          setStories(data.stories);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  // console.log("top trending stories is----", stories);

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
      <h1 className={filters.yourStoryHeading}>
        Top trending stories of the day
      </h1>
      {stories && stories.length === 0 ? (
        <h1>No stories are available</h1>
      ) : (
        <>
          <div className={filters.container}>
            {stories &&
              stories.length > 0 &&
              stories.slice(0, visibleIndiaImages).map((story) => {
                return (
                  <div
                    key={story._id}
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

export default TopTrendingStories;
