import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { ReviewForm } from '.';
export default function ReviewSpotModal({ spotId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className='btn-create'>Add a review</button>
      {showModal && (
        <Modal>
          <ReviewForm spotId={spotId} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}
