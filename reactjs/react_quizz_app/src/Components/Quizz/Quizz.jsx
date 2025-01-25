import React from 'react'
import './Quizz.css'
const Quizz = () => {
  return (
    <div className='container'>

        <h1>Quiz App</h1>
        <hr />
        <h2>which device is requered for internet connection?</h2>
        <ul>
          <li>Modem</li>
          <li>Router</li>
          <li>LAN Cable</li>
          <li>Pen Drive</li>
        </ul>
        
        <button>Next</button>
      
        <div className="index">1 of 5 questions</div>

    </div>
  )
}
export default Quizz
