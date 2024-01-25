'use client'

import ReadUser from "../functions/firebase/ReadUser"
import Signin from "../functions/firebase/Signin"
import { useEffect, useState } from "react"
import { faEye, faEyeSlash, faUserAstronaut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import editUserAtom from "@/atoms/userAtom"
import { flightRouterStateSchema } from "next/dist/server/app-render/types"

const Login = () => {
  const [maskPassword, setMaskPassword] = useState(true)
  const [uid, setUid] = useState(null)
  const [userDetail, setUserDetails] = useState(null)
  const [changeUserDetails, setChangeUserDetails] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  useEffect(()=>{
    editUserAtom({...userDetail})
  },[changeUserDetails])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const returned_uid = await Signin(formData.email, formData.password)
    setUid(returned_uid.userID)
    // console.log("returned uid:"+returned_uid.userID)
    const returned_userDetails = await ReadUser({ userID: returned_uid.userID })
    // const returned_userDetails = await ReadUser({ userID: "Aphvkhdw6OS6o7HeARv8lpxHpZH2" })
    setUserDetails(returned_userDetails)
    console.log("Returned user details:" + JSON.stringify(returned_userDetails))
    //set the atom for userdetails here?
    setChangeUserDetails(true)
  }
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md text-slate-700"
            placeholder="Email"
            required
          />
        </div>
        <div id="Password" className="mb-4 flex flex-row border rounded-md focus:border-slate-700">
          <input
            type={maskPassword ? "password" : "text"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full text-slate-700"
            placeholder="Password"
            required
          />
          <div className="flex-flex-row w-12"><button onClick={() => { setMaskPassword(!maskPassword) }}><FontAwesomeIcon icon={maskPassword ? faEyeSlash : faEye} /></button></div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Log in
        </button>
      </form>
    </div>
  )
}

export default Login