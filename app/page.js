'use client'
import { useRouter } from "next/navigation"
import convertToQuizObjects from "./functions/postprocess"

export default function Home() {

    const router = useRouter()

    const toSignup =()=>{
        router.push("/signup")
    }

    const toGithub =()=>{
        window.open("https://github.com/Shannon3335/FYP","_blank")
    }
    const QuizComponent = () => {
        const sampleInput = `Q1. What is the main purpose of a Human Resources department?
        a. To develop strategies for employee engagement
        b. To manage employee benefits
        c. To hire and manage staff
        d. To improve organizational culture
        Answer: c. To hire and manage staff


Q2. What is the purpose of a job description?
        a. To provide a list of duties and responsibilities for a role
        b. To measure employee performance
        c. To set salary and benefits
        d. To provide guidance for employees
        Answer: a. To provide a list of duties and responsibilities for a role`;

        const array = convertToQuizObjects(sampleInput);

        // Log the value of the array variable
        console.log("Quiz Array:", array);

        return <div>Quiz Component</div>; // Replace with your QuizComponent JSX
    };

    return(
        <main id="MainContainer" className="bg-gradient-to-b from-slate-900 via-purple-900 to-pink-500 flex flex-col min-h-screen h-screen w-full flex-nowrap justify-between">
            <div id="NavBar" className="flex flex-row justify-between w-full p-3 font-mono text-sm ">
                <div id="Logo" className="">PrepME</div>
                <div id="MiddleLinks"className="flex flex-row">
                    <button className=" me-8" onClick={toGithub}>Github</button>
                    <div className=" me-8">Contact</div>
                    <div className="">Design Rules</div>
                </div>
                <div id="SignInButtons"className="flex flex-row">
                    <button className="bg-slate-600 hover:bg-blue-700 rounded-lg me-6" onClick={toSignup}>Signup</button>
                    <button className="bg-slate-600 hover:bg-blue-700 rounded-lg" onClick={toSignup}>Login</button>
                </div>
            </div>
            <div id="MainBody" className="flex flex-col w-full min-h-full h-full ">
                <QuizComponent/>
            </div>
            <div className="flex ">asdfsfd</div>
        </main>
    )
}
