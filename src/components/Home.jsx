import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import Loading from "./Loading.jsx";

const Home = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleStartQuiz = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/quiz')
            setLoading(false)
        }, 3000)
    }
    return (
        <section className={"lg:w-9/12 md:w-[90%] mx-auto mt-12 flex flex-col md:flex-row justify-between items-center"}>
            {loading && <Loading/>}
            <div className={"md:w-1/2 w-full"}>
                <img src={"/images/banner.png"} alt={""} className={"w-full mx-auto"}/>
            </div>
            {/*Left Side */}
            <div className={"md:w-1/2 w-full space-y-8 mb-5"}>
                <h2 className={"my-8 lg:text-4xl text-3xl font-medium text-[#333] md:w-4/6 lg:leading-normal leading-normal mb-3"}>Learn new concepts for each Question</h2>
                <p className={"py-2 mb-6 text-gray-500 pl-2 border-l-4 border-indigo-500 text-base"}>We Help you prepare for exams and quizzes</p>
                <div className={"font-medium text-lg flex flex-col sm:flex-row gap-5"}>
                    <Link to={"/quiz"}>
                        <button onClick={handleStartQuiz} className={"bg-primary px-6 py-2 text-white rounded"}>
                            Start Quiz
                        </button>
                    </Link>
                    <button className={" inline-flex items-center px-6 py-2 rounded border text-primary ml-3 hover:bg-primary hover:text-white transition-all duration-300 ease-in"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        </svg>
                        learn more
                    </button>
                </div>
            </div>



        </section>
    )
}

export default Home;