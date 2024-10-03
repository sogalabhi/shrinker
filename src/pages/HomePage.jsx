import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavBar'
import { useNavigate } from "react-router-dom";
import Form from '../components/Form';
import { Stats } from '../components/Stats';

function HomePage() {

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
      <Form row={row} setrow={setrow}/>
      <Stats row={row} setrow={setrow} />
    </div>
  )
}

export default HomePage