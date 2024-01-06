import React, {useState} from 'react'
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import QuizHeader from "./QuizHeader.jsx";
const Loading = () => (
    <div className={"h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]"}>
        <p className={"text-xl text-gray-500"}>Loading...</p>
    </div>
)
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds/60)
    const remainingSeconds = seconds % 60;
    const formattedTime = `${String(minutes).padStart(2,"0")}: ${String(remainingSeconds).padStart(2, "0")}`
    return formattedTime;
}
const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [timerIntervalId, setTimerIntervalId] = useState('')
    const [status, setStatus] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/quiz.json').then(res => res.json()).then(data => {
            setQuestions(data)
        });
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer -1)
        }, 1000)
        setTimerIntervalId(intervalId)
        return () => {
            clearInterval(intervalId)
            if(timer === 0) {
                alert("Time has run out!")
            }
        }
    }, [timer])

    const handleAnswerSelect = (questionId, selectedOption) => {
        const updatedAnswers = {...answers, [questionId]: selectedOption}
        setAnswers(updatedAnswers);
    }

    const handleSubmit = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
        setLoading(true);
        clearInterval(timerIntervalId)
        setTimeout(() => {
            const quizScore = calculateScore(answers)
            setScore(quizScore)
            const percentage = (quizScore / questions.length) * 100
            const newStatus = percentage >= 50 ? "Passed" : "Failed";
            setStatus(newStatus);
            setShowResult(true);
            setLoading(false);
            setStatus(newStatus);
        },5000)
    }

    const calculateScore = (userAnswers) => {
        const correctAnswers = questions.map((question) => question.answer);
        let score = 0;
        for(const questionId in userAnswers) {
            if(userAnswers[questionId] === correctAnswers[questionId -1]){
                score++;
            }
        }
        return score;
    }
    const restartQuiz = () => {
        setAnswers({});
        setScore(0);
        setShowResult(false);
        setLoading(false);
        setTimer(60);
        navigate('/quiz');
    }

    return (
        <section>
        <QuizHeader timer={timer}/>
            <div className={"md:w-9/12 w-[90%] mx-auto my-8 mb-8 flex flex-col sm:flex-row justify-between items-start"}>
                <div className={"md:w-[70%] w-full"}>
                {
                    questions.map((question, index) => (
                            <div key={question.id} className={"m-3 py-3 px-4 shadow-sm border border-gray-200 rounded"}>
                                <p className={"flex items-center rounded text-xs p-2 cursor-pointer "}>
                                   <span className={"h-8 w-8 bg-primary rounded-full flex items-center justify-center text-green-800 mr-3"}>{index +1}  </span>

                                  <span className={"text-base"}>{question.question}</span>
                                </p>
                                {/*show questions*/}
                                <div className={"grid grid-cols-2 gap-4 mt-5"}>
                                    {
                                        question.options.map((option,index) => (
                                            <div onClick={() => handleAnswerSelect(question.id, option)} key={index} className={`border p-2 border-gray-200 rounded text-sm cursor-pointer ${answers[question.id] === option ? "bg-gray-300" : ''}`}>
                                                <p className={"text-[10px]"}>Option {index + 1}</p>
                                                <p>{option}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>


                    ))
                }

                <button onClick={handleSubmit} className={"bg-primary px-6 py-2 text-white rounded"}>
                    Submit Quiz!
                </button>
                </div>
                {/*Show answers */}
                <div className={"md:w-[30%] w-full p-4"}>
                    {
                        showResult && (<div>
                        <h3 className={"text-2xl font-medium"}>Your Score:</h3>
                        <div className={"h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]"}>
                            <h3 className={`text-xs ${status === "Passed" ? "text-green-800" : "text-red-500"}`}>{status}</h3>
                            <h1 className={"text-3xl font-bold my-2"}>{score*10} <span className={"text-slate-800"}>/60</span></h1>
                            <p>Total Time: <span>{formatTime(60-timer)} <span>sec.</span></span></p>
                            <button onClick={restartQuiz} className={"bg-primary px-6 py-2 text-white rounded-full pt-2"}>Restart</button>
                        </div>

                        </div>)
                    }
                    {loading && <Loading/>}
                </div>
            </div>
        </section>
    )
}

export default Quiz;