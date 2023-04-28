import React, { useState } from 'react'
import {useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'
import axios from 'axios';
import '../styles/Profile.css'


function Profile() {


    const [name, setName] = useState('')
    const [Address1, setAddress1] = useState('')
    const [Address2, setAddress2] = useState('')
    const [city, setCity]=useState('')
    const [zipCode, setZipcode]=useState('')
    const [State, setState] = useState('')

    const handleSelectChange = (event) => {
      setState(event.target.value)
    }

    const handleSubmit = async() => {
      const response = await axios.post('http://localhost:4000/profile/addProfile',
      {
        "username": localStorage.getItem("username"),
        "fullName": name,
        "address1": Address1,
        "address2": Address2,
        "city": city,
        "state": State,
        "zipcode": zipCode
      }
      );

      console.log(response);

      window.location.href='profile';
    }

    const updateProfile = async() => {
      const response = await axios.post('http://localhost:4000/profile/updateProfile',
      {
        "username": localStorage.getItem("username"),
        "fullName": name,
        "address1": Address1,
        "address2": Address2,
        "city": city,
        "state": State,
        "zipcode": zipCode
      }
      );

      console.log(response);

      window.location.href='profile';
    }


    const [pricing, setPricing] = useState('')


    const [newUser, setnewUser] = useState(false);
    

    useEffect(() => {
        setMode();
  }, []);

  const setMode = async() => {
    const response = await axios.get(`http://localhost:4000/profile/${localStorage.getItem("username")}`)
    
    if (response.data != null){
      setName(response.data.fullName);
      setAddress1(response.data.address1);
      setAddress2(response.data.address2);
      setCity(response.data.city);
      setState(response.data.state);
      setZipcode(response.data.zipcode);
    }

    else{
      setnewUser(true)
    }
  }


if (newUser){

  return (
    <div className = "profile">
      <Navbar/>
      <div className = "header">
     </div>
        <h1>Create your Profile</h1>
        <label>Name: </label>
        <input
            type ='text'
            value = {name}
            onChange={(event) => setName(event.target.value)}
            maxlength = "100"
            />

        <div></div>

        <label>Address:</label>
        <input
            type ='text'
            value = {Address1}
            onChange={(event) => setAddress1(event.target.value)}
            maxlength = "100"
            />
        <div></div>


        <label>Address 2:</label>
        <input
            type ='text'
            value = {Address2}
            onChange={(event) => setAddress2(event.target.value)}
            maxlength = "100"
            />
        <div></div>

        <label>City:</label>
        <input
            type ='text'
            value = {city}
            onChange={(event) => setCity(event.target.value)}
            maxlength = "100"
            />

        <div></div>

        

        <label>Zipcode:</label>
        <input type='number'
            value={zipCode}
            required
            onChange={(event) => setZipcode(event.target.value)}
            minlength="5"
            maxlength="9"
            />
        <div></div>

        <label>State:</label>
        <label id="state">Select an option:</label>
      <select id="state" value={State} onChange={handleSelectChange}>
        <option value="">--Please choose an option--</option>
        <option value="AL">Alabama</option>
    <option value="AK">Alaska</option>
    <option value="AZ">Arizona</option>
    <option value="AR">Arkansas</option>
    <option value="CA">California</option>
    <option value="CO">Colorado</option>
    <option value="CT">Connecticut</option>
    <option value="DE">Delaware</option>
    <option value="DC">District Of Columbia</option>
    <option value="FL">Florida</option>
    <option value="GA">Georgia</option>
    <option value="HI">Hawaii</option>
    <option value="ID">Idaho</option>
    <option value="IL">Illinois</option>
    <option value="IN">Indiana</option>
    <option value="IA">Iowa</option>
    <option value="KS">Kansas</option>
    <option value="KY">Kentucky</option>
    <option value="LA">Louisiana</option>
    <option value="ME">Maine</option>
    <option value="MD">Maryland</option>
    <option value="MA">Massachusetts</option>
    <option value="MI">Michigan</option>
    <option value="MN">Minnesota</option>
    <option value="MS">Mississippi</option>
    <option value="MO">Missouri</option>
    <option value="MT">Montana</option>
    <option value="NE">Nebraska</option>
    <option value="NV">Nevada</option>
    <option value="NH">New Hampshire</option>
    <option value="NJ">New Jersey</option>
    <option value="NM">New Mexico</option>
    <option value="NY">New York</option>
    <option value="NC">North Carolina</option>
    <option value="ND">North Dakota</option>
    <option value="OH">Ohio</option>
    <option value="OK">Oklahoma</option>
    <option value="OR">Oregon</option>
    <option value="PA">Pennsylvania</option>
    <option value="RI">Rhode Island</option>
    <option value="SC">South Carolina</option>
    <option value="SD">South Dakota</option>
    <option value="TN">Tennessee</option>
    <option value="TX">Texas</option>
    <option value="UT">Utah</option>
    <option value="VT">Vermont</option>
    <option value="VA">Virginia</option>
    <option value="WA">Washington</option>
    <option value="WV">West Virginia</option>
    <option value="WI">Wisconsin</option>
    <option value="WY">Wyoming</option>
      </select>  

     <div><button onClick = {handleSubmit}>Submit</button></div>
    </div>
  )


}

else{
  return (
    <div className = "profile">
      <Navbar/>
      <div className = "header">
     </div>
        <h1>Manage Profile Information</h1>
        <label>Name: </label>
        <input
            type ='text'
            value = {name}
            onChange={(event) => setName(event.target.value)}
            maxlength = "100"
            />

        <div></div>

        <label>Address:</label>
        <input
            type ='text'
            value = {Address1}
            onChange={(event) => setAddress1(event.target.value)}
            maxlength = "100"
            />
        <div></div>


        <label>Address 2:</label>
        <input
            type ='text'
            value = {Address2}
            onChange={(event) => setAddress2(event.target.value)}
            maxlength = "100"
            />
        <div></div>

        <label>City:</label>
        <input
            type ='text'
            value = {city}
            onChange={(event) => setCity(event.target.value)}
            maxlength = "100"
            />

        <div></div>

        

        <label>Zipcode:</label>
        <input type='number'
            value={zipCode}
            required
            onChange={(event) => setZipcode(event.target.value)}
            minlength="5"
            maxlength="9"
            />
        <div></div>

        <label>State:</label>
        <label id="state">Select an option:</label>
      <select id="state" value={State} onChange={handleSelectChange}>
        <option value="">--Please choose an option--</option>
        <option value="AL">Alabama</option>
    <option value="AK">Alaska</option>
    <option value="AZ">Arizona</option>
    <option value="AR">Arkansas</option>
    <option value="CA">California</option>
    <option value="CO">Colorado</option>
    <option value="CT">Connecticut</option>
    <option value="DE">Delaware</option>
    <option value="DC">District Of Columbia</option>
    <option value="FL">Florida</option>
    <option value="GA">Georgia</option>
    <option value="HI">Hawaii</option>
    <option value="ID">Idaho</option>
    <option value="IL">Illinois</option>
    <option value="IN">Indiana</option>
    <option value="IA">Iowa</option>
    <option value="KS">Kansas</option>
    <option value="KY">Kentucky</option>
    <option value="LA">Louisiana</option>
    <option value="ME">Maine</option>
    <option value="MD">Maryland</option>
    <option value="MA">Massachusetts</option>
    <option value="MI">Michigan</option>
    <option value="MN">Minnesota</option>
    <option value="MS">Mississippi</option>
    <option value="MO">Missouri</option>
    <option value="MT">Montana</option>
    <option value="NE">Nebraska</option>
    <option value="NV">Nevada</option>
    <option value="NH">New Hampshire</option>
    <option value="NJ">New Jersey</option>
    <option value="NM">New Mexico</option>
    <option value="NY">New York</option>
    <option value="NC">North Carolina</option>
    <option value="ND">North Dakota</option>
    <option value="OH">Ohio</option>
    <option value="OK">Oklahoma</option>
    <option value="OR">Oregon</option>
    <option value="PA">Pennsylvania</option>
    <option value="RI">Rhode Island</option>
    <option value="SC">South Carolina</option>
    <option value="SD">South Dakota</option>
    <option value="TN">Tennessee</option>
    <option value="TX">Texas</option>
    <option value="UT">Utah</option>
    <option value="VT">Vermont</option>
    <option value="VA">Virginia</option>
    <option value="WA">Washington</option>
    <option value="WV">West Virginia</option>
    <option value="WI">Wisconsin</option>
    <option value="WY">Wyoming</option>
      </select>  

     <div><button onClick = {updateProfile}>Submit</button></div>
    </div>
  )

}
}


export default Profile 

