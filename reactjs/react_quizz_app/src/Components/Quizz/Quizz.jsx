import React, { useRef, useState } from 'react'
import './Quizz.css'
import { data } from '../../assets/data';
const Quizz = () => {

    let [index, setIndex] = useState(0);
    let [questions, setQuestions] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);
    let Option_array = [Option1, Option2, Option3, Option4];

    const checkAnswer = (e,ans) => {
        if(lock ===false){
            if(questions.ans === ans){
                e.target.classList.add('correct');
                setScore(prev=>prev+1);
            }
            else{
                e.target.classList.add('wrong'); 
                Option_array[questions.ans-1].current.classList.add('correct');   
            }
            setLock(true);
        }

    }

    const next = () => {
        if(lock === true){
            if(index < data.length-1){
                setIndex(prev=>prev+1);
                setQuestions(data[index+1]);
                Option_array.forEach((option)=>{
                    option.current.classList.remove('correct');
                    option.current.classList.remove('wrong');
                })
                setLock(false);
            }
            else if(index === data.length-1){
                setResult(true);
            }
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestions(data[0]);
        setScore(0);
        setResult(false);
        setLock(false);
    }

  return (
    <div className='container'>

        <h1>Quiz App</h1>
        <hr />
        {result?<>
            <h2>you scrored {score} out of {data.length}</h2>
            <button onClick={(e)=>reset()}>Reset</button> 
        </>:<>
        <h2>{index+1}.{questions.question}</h2>
        <ul>
          <li ref={Option1} onClick={(e)=>checkAnswer(e,1)} >{questions.option1}</li>
          <li ref={Option2} onClick={(e)=>checkAnswer(e,2)}>{questions.option2}</li>
          <li ref={Option3} onClick={(e)=>checkAnswer(e,3)}>{questions.option3}</li>
          <li ref={Option4} onClick={(e)=>checkAnswer(e,4)}>{questions.option4}</li>
        </ul>
        
        <button onClick={(e)=>next()}>Next</button>
      
        <div className="index">{index+1} of {data.length} questions</div>

        </>}
       
    </div>
  )
}
export default Quizz
