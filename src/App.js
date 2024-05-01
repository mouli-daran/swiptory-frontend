import "./App.css";
import Home from "./Components/Home";
import Bookmarkpage from "./Components/Bookmarkpage";
import IndividualStory from "./Components/individualstories/IndividualStory";
import { Routes, Route } from "react-router-dom";
import YourStory from "./Components/YourStory.js/YourStory";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookmark/:id" element={<Bookmarkpage />} />
      <Route path="/individualstory/:id" element={<IndividualStory />} />
      <Route path="/story" element={<YourStory />} />
    </Routes>
  );
};

export default App;
