// 'use client'
// import { useState } from 'react'
// import AddUser from '@/services/firebase/AddUser'
// import Dropdown from '../../components/dropdown'
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useRouter } from 'next/navigation'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '../functions/firebase/FirebaseApp'

// const SignUpForm = () => {
//   const [maskPassword, setMaskPassword] = useState(true)
//   const [maskConfirmPassword, setmaskConfirmPassword] = useState(true)
//   const [passwordsMatch, setPasswordsMatch] = useState(false)
//   const [error, setError] = useState(null)
//   const router = useRouter()

//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     jobTitle: '',
//     industry: '',
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//     setPasswordsMatch(formData.password === formData.confirmPassword)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     // Add your signup logic here, such as sending the data to a server or performing client-side validation
//     if (passwordsMatch) {
//       console.log('Form submitted:', formData)
//       createUserWithEmailAndPassword(auth, formData.email, formData.password)
//         .then(async (userCredential) => {
//           const user = userCredential.user
//           try {
//             await AddUser({
//               uid: user.uid,
//               Name: formData.username,
//               Industry: formData.industry,
//               JobTitle: formData.jobTitle,
//               PreviousIncorrectQuestions: [],
//             })
//           } catch (error) {
//             console.log('Error with AddUser()')
//           }
//           console.log('Success. The user is created in FirebaseAuth')
//           router.push('/quiz')
//         })
//         .catch((error) => {
//           console.log('Error when signing up,' + error.message)
//           setError(error.message)
//         })
//     } else {
//       setError('Passwords do not match')
//     }
//   }

//   const handleIndustryChange = (selectedIndustry) => {
//     console.log('new industry:' + selectedIndustry)
//     setFormData({
//       ...formData,
//       industry: selectedIndustry,
//     })
//   }
//   return (
//     <div className='mx-auto mt-8 max-w-md rounded-md bg-white p-6 shadow-md'>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-4'>
//           <input
//             type='text'
//             id='username'
//             name='username'
//             value={formData.username}
//             onChange={handleChange}
//             className='mt-1 w-full rounded-md border p-2 text-slate-700'
//             placeholder='Username'
//             required
//           />
//         </div>
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
//         <div id='confirmPassword' className='mb-4'>
//           <input
//             type={maskConfirmPassword ? 'password' : 'text'}
//             id='confirmPassword'
//             name='confirmPassword'
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className='mt-1 w-full rounded-md border p-2 text-slate-700'
//             placeholder='Confirm Password'
//             required
//           />
//           <div className='flex-flex-row w-12'>
//             <button
//               onClick={() => {
//                 setmaskConfirmPassword(!maskConfirmPassword)
//               }}>
//               <FontAwesomeIcon icon={maskConfirmPassword ? faEyeSlash : faEye} />
//             </button>
//           </div>
//         </div>
//         <div className='mb-4'>
//           <input
//             type='text'
//             id='jobTitle'
//             name='jobTitle'
//             value={formData.jobTitle}
//             onChange={handleChange}
//             className='mt-1 w-full rounded-md border p-2 text-slate-700'
//             placeholder='Job Title'
//             required
//           />
//         </div>
//         <Dropdown onIndustryChange={handleIndustryChange} />
//         <button
//           type='submit'
//           className='w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 focus:border-blue-300 focus:outline-none focus:ring'>
//           Sign Up
//         </button>
//       </form>
//     </div>
//   )
// }

// export default SignUpForm
