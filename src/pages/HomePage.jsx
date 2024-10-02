import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavBar'
import { useNavigate } from "react-router-dom";
import Form from '../components/Form';

function HomePage() {
  const [token, settoken] = useState("")

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log(token)

    if (!token) {
      navigate("/login");
    }
  }, [])

  return (
    <div>
      <Navbar />
      <Form />
    </div>
  )
}

export default HomePage
