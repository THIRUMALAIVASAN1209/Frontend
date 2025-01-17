import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Userdata.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function User() {
  const nav = useNavigate();
  const [user,setUser] = useState([]);

  useEffect(()=>{
    axios.get('https://backend-5p1o.onrender.com/api/user/fetch')
    .then(result=>{
      setUser(result.data.users);
    })
  },[])

  const deleteUser = (id) =>{
    axios.delete(`https://backend-5p1o.onrender.com/api/user/deleted/${id}`)
    .then(result=>{
      console.log("Deleted Successfully")
      nav('/')
    })
    .catch(err=>console.log("Error occured while deleting"))
  }

  return (
    <div>
      <Link to="/create"><button className="create-btn">Create</button></Link>
      <table>
        <tbody>
        <tr>
          <th>Name</th>
          <th>E-mail</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
        {
          user.map((users,index)=>(
            <tr key={index}>
              <td>{users.name}</td>
              <td>{users.email}</td>
              <td>{users.address}</td>
              <td>
                <Link to={`/update/${users._id}`}><button className="update-btn">Update</button></Link>
                <button onClick={(e)=>deleteUser(users._id)} className="delete-btn">X</button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  )
}

export default User
