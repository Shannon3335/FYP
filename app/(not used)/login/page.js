// 'use client'

// import ReadUser from '@/services/firebase/ReadUser.js'
// import Signin from '@/services/firebase/Signin'
// import { useEffect, useState } from 'react'
// import { faEye, faEyeSlash, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import userAtom from '@/atoms/userAtom.js'
// import { useAtom } from 'jotai'
// import { useRouter } from 'next/navigation'

// const Login = () => {
//   const router = useRouter()
//   const [user, modifyUser] = useAtom(userAtom)
//   const [maskPassword, setMaskPassword] = useState(true)
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   })

//   const EditUserAtom = (props) => {
//     // console.log("Initial user atom:" + JSON.stringify(user))
//     // console.log(JSON.stringify(props))
//     modifyUser(props)
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const returned_uid = await Signin(formData.email, formData.password)
//     const { userDetails } = await ReadUser({ userID: returned_uid.userID })
//     console.log('Returned user details:' + JSON.stringify(userDetails))
//     EditUserAtom({
//       userName: userDetails.Name,
//       industry: userDetails.Industry,
//       field: userDetails.JobTitle,
//       previousIncorrectQuestions: userDetails.PreviousIncorrectQuestions,
//     })
//     router.push('/quiz')
//   }
//   return (
//     <div className='mx-auto mt-8 max-w-md rounded-md bg-white p-6 shadow-md'>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-4'>
//           <input
//             type='email'
//             id='email'
//             name='email'
//             value={formData.email}
//             onChange={handleChange}
//             className='mt-1 w-full rounded-md border p-2 text-slate-700'
//             placeholder='Email'
//             required
//           />
//         </div>
//         <div id='Password' className='mb-4 flex flex-row rounded-md border focus:border-slate-700'>
//           <input
//             type={maskPassword ? 'password' : 'text'}
//             id='password'
//             name='password'
//             value={formData.password}
//             onChange={handleChange}
//             className='mt-1 w-full p-2 text-slate-700'
//             placeholder='Password'
//             required
//           />
//           <div className='flex-flex-row w-12'>
//             <button
//               onClick={() => {
//                 setMaskPassword(!maskPassword)
//               }}>
//               <FontAwesomeIcon icon={maskPassword ? faEyeSlash : faEye} />
//             </button>
//           </div>
//         </div>
//         <button
//           type='submit'
//           className='w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 focus:border-blue-300 focus:outline-none focus:ring'>
//           Log in
//         </button>
//       </form>
//     </div>
//   )
// }

// export default Login
