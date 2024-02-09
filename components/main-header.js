import React from 'react'

const MainHeader = () => {
  return (
    <main
      id='MainContainer'
      className='flex h-screen min-h-screen w-full flex-col flex-nowrap justify-between bg-gradient-to-b from-slate-900 via-purple-900 to-pink-500'>
      <div id='NavBar' className='flex w-full flex-row justify-between p-3 font-mono text-sm '>
        <div id='Logo' className=''>
          PrepME
        </div>
        <div id='MiddleLinks' className='flex flex-row'>
          <button className=' me-8' onClick={toGithub}>
            Github
          </button>
          <div className=' me-8'>Contact</div>
          <div className=''>Design Rules</div>
        </div>
        <div id='SignInButtons' className='flex flex-row'>
          <button className='me-6 rounded-lg bg-slate-600 hover:bg-blue-700' onClick={toSignup}>
            Signup
          </button>
          <button className='rounded-lg bg-slate-600 hover:bg-blue-700' onClick={toLogin}>
            Login
          </button>
        </div>
      </div>
    </main>
  )
}

export default MainHeader
