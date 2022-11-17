import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { DeleteReviewForm } from './DeleteReviewForm';
export default function DeleteReviewModal({reviewId, spotId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal>
                  <DeleteReviewForm review={reviewId} spotId={spotId} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}
