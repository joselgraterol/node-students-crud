import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import "./Home.css"
import { toast } from 'react-toastify';
import axios from 'axios';


function Home() {

  const [data, setData] = useState([])

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get")
    setData(response.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios.delete(`http://localhost:5000/api/remove/${id}`)
      toast.success("Student deleted successfully")
      setTimeout(() => loadData(), 500)
    }
  }

  return (
    <div className="container-table" style={{marginTop:"150px"}}>

      <Link to="/addStudent"><button className="btn btn-add">Add New Student</button></Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{textAlign:"center"}}>No.</th>
            <th style={{textAlign:"center"}}>Name</th>
            <th style={{textAlign:"center"}}>Email</th>
            <th style={{textAlign:"center"}}>Age</th>
            <th style={{textAlign:"center"}}>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.age}</td>
                <td>
                  <Link to={`/update/${item.id}`}><button className="btn btn-edit">Edit</button></Link>
                  <button className="btn btn-delete" onClick={() => {deleteStudent(item.id)}}>Delete</button>
                  <Link to={`/view/${item.id}`}><button className="btn btn-view">View</button></Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home