import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { UpdateSpotForm } from './UpdateSpot';
export default function UpdateSpotModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}className='btn-update'>Update</button>
      {showModal && (
        <Modal>
          <UpdateSpotForm spot={spot} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}
