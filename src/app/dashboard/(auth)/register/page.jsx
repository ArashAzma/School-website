"use client"
import Navbar from "@/components/NavBar/navbar";
import React, {useState} from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link'
const Register = () => {
    const router = useRouter();
    const [errors, setErrors] = useState({});
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        try{
            const resp = await fetch("/api/auth/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })
            if(resp.status==201){
                router.push("/dashboard/login");
            }
            else{
                const data = await resp.json();
                setErrors(data.errors);
                console.log(data.errors);
            }
        }catch(err){
            throw new Error(err);
        }
    }
  return (
    <div>
    <Navbar />
    <div className ="flex h-screen justify-center items-center bg-[#4F709C]">
        <div className="flex flex-col gap-y-6 w-screen justify-center items-center bg-[#213555] py-6">
            <form
                className="flex flex-col gap-y-4 justify-center w-[350px]  p-6 rounded-lg"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="username"
                    className="bg-white text-black  rounded-lg h-[40px] p-3"
                    required
                />
                {errors.username && <div className="text-red-500">{errors.username.message}</div>}
                
                <input
                    type="email"
                    placeholder="email"
                    className="bg-white text-black  rounded-lg h-[40px] p-3"
                    required
                />
                {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                
                <input
                    type="password"
                    placeholder="password"
                    className="bg-white text-black  rounded-lg h-[40px] p-3"
                    required
                />
                {errors.password && <div className="text-red-500">{errors.password.message}</div>}
                
                <button className="mt-4 bg-green-900 h-[40px]">register</button>
                <Link href="/dashboard/register" className="hover:underline ">Dont have an account?</Link>
            </form>
        </div>
    </div>
</div>
  );
};

export default Register;
