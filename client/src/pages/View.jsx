import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import "./View.css"
import axios from 'axios';

function View() {
    const [data, setData] = useState([])

    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((res) => setData(res.data[0]))
    }, [id])

    return (
        <div className="card">
            <div className="card-header">
                <p>Student Information</p>
            </div>
            <div className="container">
                <strong>ID:</strong>
                <span> {data.id}</span>
                <br />
                <br />
                <strong>Name:</strong>
                <span> {data.name}</span>
                <br />
                <br />
                <strong>Email:</strong>
                <span> {data.email}</span>
                <br />
                <br />
                <strong>Age:</strong>
                <span> {data.age}</span>
                <br />
                <br />
                <Link to="/">
                    <button className="btn btn-edit">Go Back</button>
                </Link>
            </div>
        </div>
    )
}

export default View