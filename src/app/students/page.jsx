import Navbar from "@/components/NavBar/navbar";
import Link from "next/link";
import React from "react";
import {AiOutlineArrowRight} from "react-icons/ai";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/students", {  
    next: { revalidate: 100 },
  });
  if (!res.ok) {
    throw new Error("ridi");
  }
  return res.json();
};
const Students = async () => {
  const data = await getData();
  console.log(data);
  return (
    <div className="flex flex-col gap-y-8">
      <Navbar />
      <div className="flex flex-col items-center bg-gradient-to-b from-[#9DB2BF] to-[#27374D] ">
        <div
          className="h-screen gap-2 p-12 overflow-hidden overflow-y-auto
                      grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 w-3/4 "
        >
          {data.map((stu) => (
            <div
              className="flex flex-col relative gap-y-2 p-6 w-[300px] h-[150px] lg:w-[400px] 
                          rounded-lg  bg-white text-[#0067A5] "
            >
              <div className="flex justify-start border-b border-[#bbb] font-[700] text-xl">
                {stu.name}
              </div>
              <div className="flex justify-between font-[500]">
                <div>Social Number = {stu.number}</div>
                <div>Father : {stu.fathers_name}</div>
              </div>
              <div className="absolute border-2 px-2 border-[#bbb] rounded-lg bottom-2 right-5 font-bold  ">
                {stu.final_score}
              </div>
            </div>
          ))}
        </div>
        <div className="flex pb-4 justify-center items-center text-2xl font-bold">
          <Link
            href="/students/newStudent"
            className="hover:mr-4 "
          >
            add a new student
          </Link>
          <AiOutlineArrowRight className="ml-2 text-4xl hover:ml-4" />
        </div>
      </div>
    </div>
  );
};

export default Students;
