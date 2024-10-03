import React, { useState } from 'react'
import Form from './Form';

function EditModal({ setIsModalOpen }) {
    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Modal Title</h2>
                    {/* Close Button */}
                    <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">
                        &times;
                    </button>
                </div>

                <Form />
            </div>
        </div>
    )
}

export default EditModal
