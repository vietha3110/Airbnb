import React, { useState } from 'react';
// import { Modal } from '../../context/Modal';
import { Modal } from '../../../context/Modal';
import { CancelTrip } from './CancelTrip';
export default function CancelTripModal({bookingId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className='btn-delete'>Delete</button>
      {showModal && (
        <Modal>
          <CancelTrip bookingId={bookingId} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}
