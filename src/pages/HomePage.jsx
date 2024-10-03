import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavBar'
import { useNavigate } from "react-router-dom";
import Form from '../components/Form';
import { Stats } from '../components/Stats';
import EditModal from '../components/EditModal';

function HomePage() {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [row, setrow] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate("/login");
    }
  }, [])

  return (
    <div>
      <Navbar />
      <div className="mx-40">
        <Form row={row} setrow={setrow} setIsModalOpen={setIsModalOpen} />
      </div>
      <Stats row={row} setrow={setrow} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  )
}

export default HomePage