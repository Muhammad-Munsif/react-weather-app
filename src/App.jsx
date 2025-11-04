import React from 'react'
import Weather from './components/Weather'
const App = () => {
  return (
    <div className='bg-gray-200 min-h-screen py-12'>
      <h1 className='font-bold text-3xl text-center'>Weather App in React</h1>
      <Weather />
    </div>
  )
}

export default App
