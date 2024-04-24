import Filter from "./Filter";
import filters from "./filters.module.css";

const Movies = ({ setOpenIndividualStoryModal, openIndividualStoryModal }) => {
  return (
    <Filter
      category={"movies"}
      setOpenIndividualStoryModal={setOpenIndividualStoryModal}
      openIndividualStoryModal={openIndividualStoryModal}
    />
  );
};

export default Movies;
