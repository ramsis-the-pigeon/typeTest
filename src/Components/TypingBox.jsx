import { generate, count } from "random-words";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TesModeContext";
import Stats from "./Stats";



function TypingBox() {

    const inputRef = useRef(null)
    const {testTime} = useTestMode()
    const[countDown, setCountDown] = useState(testTime)
    const[intervalId, setIntervalId] = useState(null)
    const[testStart, setTestStart] = useState(false)
    const[testEnd, setTestEnd] = useState(false)

    const[correctChars, setCorrectChars] = useState(0)
    const[incorrectChars, setIncorrectChars] = useState(0)
    const[missedChars, setMissedChars] = useState(0)
    const[extraChars, setExtraChars] = useState(0)
    const[correctWords, setCorrectWords] = useState(0)



    const [wordsArray, setWordsArray] = useState(()=>{
        return generate(50)
    })

    const [currWordIndex, setCurrWordIndex] = useState(0)
    const [currCharIndex, setCurrCharIndex] = useState(0)

    

    const wordsSpanRef = useMemo(()=>{
        return Array(wordsArray.length).fill(0).map(i=> createRef(null))
    }, [wordsArray])


    const startTimer = ()=>{
        const intervalId = setInterval(timer, 1000)
        setIntervalId(intervalId)
        function timer() {

            setCountDown((latestCountDown)=>{
                if (latestCountDown === 1){
                    setTestEnd(true)
                    clearInterval(intervalId)
                    return 0
                }
                return latestCountDown-1
            })
        }
    }




    const resetTest = () =>{
        clearInterval(intervalId)
        setCountDown(testTime)
        setCurrCharIndex(0)
        setCurrWordIndex(0)
        setTestStart(false)
        setTestEnd(false)
        setWordsArray(generate(50))
        resetWordsSpanRefClassName()
        focusInput()
    }

    const resetWordsSpanRefClassName = () =>{
        wordsSpanRef.map( i => {
            Array.from(i.current.childNodes).map(j=>{
                j.className = ''
            })
        })
    }

    const handleUserInput = (e) =>{
        if(!testStart){
            startTimer()
            setTestStart(true)
        }
        
        const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes

        if (e.keyCode === 32){

            // logic for space

            let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct')

            if (correctCharsInWord.length === allCurrChars.length){
                setCorrectWords(correctWords+1)
            }

            if(allCurrChars.length<=currCharIndex){
                allCurrChars[currCharIndex-1].classList.remove('current-right')
            }
            else{
                setMissedChars(missedChars + (allCurrChars.length - currCharIndex))
                allCurrChars[currCharIndex].classList.remove('current-right')

            }
            wordsSpanRef[currWordIndex+1].current.childNodes[0].className = "current"

            setCurrWordIndex(currWordIndex+1)
            setCurrCharIndex(0)

            return
        }
        if (e.keyCode === 8){
            if(currCharIndex !== 0) {

                if(allCurrChars.length === currCharIndex){

                    if(allCurrChars[currCharIndex -1].className.includes('extra')){
                        allCurrChars[currCharIndex -1].remove()
                        allCurrChars[currCharIndex-2].className += 'current-right'
                    }
                    else {
                        allCurrChars[currCharIndex-1].className = 'current'
                    }

                    
                    setCurrCharIndex(currCharIndex-1)
                    return
                }

                allCurrChars[currCharIndex].className = '';
                allCurrChars[currCharIndex-1].className = 'current';
                setCurrCharIndex(currCharIndex-1)

            }
            return
        }

        if(currCharIndex === allCurrChars.length){
            let newSpan = document.createElement('span')
            newSpan.innerText = e.key
            allCurrChars[currCharIndex-1].classList.remove('current-right')
            newSpan.className = 'incorrect extra current-right'
            wordsSpanRef[currWordIndex].current.append(newSpan)
            setCurrCharIndex(currCharIndex+1)
            setExtraChars(extraChars+1)
            return
        }


        if (e.key === allCurrChars[currCharIndex].innerText){
            allCurrChars[currCharIndex].className = 'correct'
            setCorrectChars(correctChars+1)
        }
        else{
            allCurrChars[currCharIndex].className = 'incorrect'
            setIncorrectChars(incorrectChars+1)
        }
        if(currCharIndex+1 === allCurrChars.length){
            allCurrChars[currCharIndex].className += ' current-right'
        }
        else{
           allCurrChars[currCharIndex + 1].className = 'current'
        }
        
        setCurrCharIndex(currCharIndex + 1)
        
        
    }

    //CALCULATING WPM
    const calculateWPM = ()=>{
        return Math.round((correctChars/5)/(testTime/60))
    }

    const calculateAcc = ()=>{
        return Math.round((correctWords/currWordIndex) * 100)
    }

    const focusInput = ()=>{
        inputRef.current.focus()
    }
    useEffect(()=>{
        resetTest()
    },[testTime])
    useEffect(()=>{

        focusInput()
        wordsSpanRef[0].current.childNodes[0].className = 'current'
    },[])



    return(
      <div>
        <UpperMenu countDown={countDown}/>
        { (testEnd) ? (<Stats wpm={calculateWPM()} 
                              accuracy={calculateAcc()} 
                              correctChars={correctChars} 
                              incorrectChars={incorrectChars}
                              missedChars={missedChars}
                              extraChars={extraChars}
                              />):(<div className="type-box" onClick={focusInput}>
            
            <div className="words">
                {
                    wordsArray.map((word, index)=>(
                        <span className="word" ref={wordsSpanRef[index]}>
                            {word.split('').map(char=>(
                                <span >{char}</span>
                            ))}
                            
                        </span>
                    ))
                }
            </div>
        </div>)}
        <input 
        type="text"
        onKeyDown={handleUserInput}
        className="hidden-input"
        ref={inputRef}
        />
      </div>
    )
  }
  
  export default TypingBox