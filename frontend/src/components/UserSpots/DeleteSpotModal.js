import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { DeleteSpot } from './DeleteSpot';
export default function DeleteSpotModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className='btn-delete'>Delete</button>
      {showModal && (
        <Modal>
          <DeleteSpot spot={spot} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}
