"use client"
import React,{useState} from 'react';
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Navbar from "@/components/NavBar/navbar";

const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data from the server.");
    }
    return res.json();
  };

  
const Student = () => {
    const {mutate} = useSWR("/api/students", fetcher);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {   
    e.preventDefault();
    const name = e.target[0].value;
    const number = e.target[1].value;
    const fathers_name = e.target[2].value;
    const final_score = parseFloat(e.target[3].value);

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        body: JSON.stringify({
          name,
          number,
          fathers_name,
          final_score,
        }),
      });

      if (response.ok) {
        setErrors({});
        await mutate("/api/students");
        router.push("/students");
    } else {
        const data = await response.json();
        setErrors(data.errors);
    }
    } catch (err) {
        setErrors(err);
    }   
  };
  return (
    <div className='h-screen bg-gradient-to-b from-[#9DB2BF] to-[#27374D] '>
        <Navbar className="mb-[200px]"/>
      <div className="flex flex-col mt-[100px] justify-center items-center bg-[#D8C4B6] h-[550px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-8 h-screen w-[500px] justify-center items-center text-xl"
        >
          <h1 className="font-bold text-2xl">Enter the information</h1>
          <div className="flex flex-col gap-y-4">
          <input
            className="p-2 px-4 rounded-lg bg-white text-black "
            type="text"
            placeholder="Name"
          />
          {errors.name && <div className="text-red-500">{errors.name.message}</div>}
          <input
            className="p-2 px-4 rounded-lg bg-white text-black "
            type="text"
            placeholder="ID"
          />
          {errors.number && <div className="text-red-500">{errors.number.message}</div>}
          <input
            className="p-2 px-4 rounded-lg bg-white text-black "
            type="text"
            placeholder="Father's name"
          />
          {errors.fathers_name && (
            <div className="text-red-500">{errors.fathers_name.message}</div>
          )}
          <input
            className="p-2 px-4 rounded-lg bg-white text-black"
            type="number"
            step="0.01"
            placeholder="Final score"
          />
          {errors.final_score && (
            <div className="text-red-500">{errors.final_score.message}</div>
          )}
        </div>
        <button className="bg-green-700 hover:bg-green-900 w-[150px] p-2 rounded-lg">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default Student;
