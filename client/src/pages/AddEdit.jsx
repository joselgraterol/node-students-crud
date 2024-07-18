import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

import "./AddEdit.css"

import { toast } from 'react-toastify';
import axios from 'axios';


const initialState = {
  name: "",
  email: "",
  age: ""
}

function AddEdit() {

  const [state, setState] = useState(initialState)

  const { name, email, age } = state

  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`).then((res) => setState({ ...res.data[0] }))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !email || !age) {
      toast.error("Please provide value in each input field")
    } else {
      if (!id) {
        axios.post("http://localhost:5000/api/post", {
          name,
          email,
          age
        }).then(() => {
          setState({ name: "", email: "", age: "" })
        }).catch((err) => toast.error(err.response.data))
        toast.success("Data added successfully")
        setTimeout(() => navigate("/"), 500)

      } else {
        axios.put(`http://localhost:5000/api/update/${id}`, {
          name,
          email,
          age
        }).then(() => {
          setState({ name: "", email: "", age: "" })
        }).catch((err) => toast.error(err.response.data))
        toast.success("Data updated successfully")
        setTimeout(() => navigate("/"), 500)
      }
    }
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  return (
    <div>
      <form style={
        {
          margin: "0 auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center"
        }
      } onSubmit={handleSubmit}>

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Name" value={name || ""} onChange={handleInputChange} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Email" value={email || ""} onChange={handleInputChange} />

        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" placeholder="Age" value={age || ""} onChange={handleInputChange} />



        <input type="submit" value={id ? "Update" : "Save"} />

        <Link to="/"><button className="btn btn-cancel" >Cancel</button></Link>

      </form>
    </div>
  )
}

export default AddEdit