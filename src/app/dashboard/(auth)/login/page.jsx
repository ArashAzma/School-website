"use client"
import React, {useState} from 'react'
import {signIn, useSession} from "next-auth/react"
import { useRouter } from 'next/navigation'
import Navbar from "@/components/NavBar/navbar";
import Link from 'next/link'

const Login = () => {
    const router = useRouter();
    const session = useSession();
    const [error, setError] = useState(null);
    
    
    if(session.status == "loading") {
        return <p>loading ...</p>;
    }
    
    if(session.status=="authenticated"){
        router.push("/");
    }
    
    const handleSubmit= async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            const result = await signIn('credentials', { redirect: false, email, password });
            if (result.error) {
                setError(result.error || 'An unknown error occurred.');
            } else {
                router.push("/");
            }
          } catch (err) {
            setError(err.message);
          }
    }
  return (
    <div>
        <Navbar />
        <div className ="flex h-screen justify-center items-center bg-[#4F709C]">
        <div className="flex flex-col gap-y-6 w-screen justify-center items-center bg-[#213555] py-12">
                <div className="flex flex-col gap-y-6 w-screen mb-6 justify-center items-center">
                <form
                    className="flex flex-col gap-y-4 justify-center w-[350px]  px-6 rounded-lg"
                    onSubmit={handleSubmit}
                >
                    <input
                    type="email"
                    placeholder="email"
                    className="bg-white text-black rounded-lg h-[40px] p-3"
                    required
                    />
                    <input
                    type="password"
                    placeholder="password"
                    className="bg-white text-black rounded-lg h-[40px] p-3"
                    required
                    />
                    {error && <p className="text-red-500 font-bold">{error}</p>}
                    <button className="mt-4 bg-green-900 h-[40px] w-[120px]">login</button>
                    <Link href="/dashboard/register" className="hover:underline ">Dont have an account?</Link>
                </form>
                </div>
            {/* <button onClick={()=> signIn("github")}>Login with github</button> */}
            </div> 
        </div>
    </div>
  )
}

export default Login