import { useState } from "react";
import { Modal } from "../../../../context/Modal";
import FilterBox from "./FilterBox";

const FilterModal = ({dispatch}) => {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <div onClick={() => setShowModal(true)} className="filter-span" >Filter</div>
        {showModal && (
          <Modal>
                    <FilterBox onClose={() => setShowModal(false)} dispatch={dispatch} />
          </Modal>
        )}
      </>
    );
    
}

export default FilterModal;
