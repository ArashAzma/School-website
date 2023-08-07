import Image from "next/image";
import Navbar from "@/components/NavBar/navbar";
import Cards from "@/components/cards/cards";
import {AiOutlineArrowRight} from "react-icons/ai";

export default function Home() {
  return (
    <div>  
    <div className="flex flex-col relative"> 
      <Navbar />
      <div className="flex w-full h-screen">
        <Image
          src="/schoolMain.jpg"
          alt="School Main"
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-cover object-right opacity-30 -z-10"
        />
        <div className="-z-20 bg-gradient-to-b from-white h-full w-full to-[#0067A5]"></div>
      </div>
    <div className="flex absolute top-80 left-60">
        <div className="flex flex-col gap-4 text-2xl max-w-[50%]">
          <h1 className="text-5xl font-bold">The best university of the state</h1>
          <p className="font-light">Technology is a rapidly evolving field that continuously shapes our modern world. It encompasses a wide range of disciplines.</p>
          <button className="p-2 border-2 w-[35%] rounded-lg apply">Apply now</button>
        </div>
      </div>
    </div>
      <div className="flex flex-col md:flex-row justify-center items-center w-full gap-8 mt-8">
        <Cards header={"HEHE"} span={"SPAN"}  text1="Why study at Shahriar?" text2="im gonna kill myself" icon="GiArchiveRegister"/>  
        <Cards header={"HOHO"} span={"SPAN"}  text1="Campus Life" text2="im gonna kill myself" icon="GiVillage"/>  
        <Cards header={"POS POS"} span={"SPAN"}  text1="News & Events" text2="im gonna kill myself" icon="GiWaxTablet"/>  
      </div>
      <div className="flex flex-col justify-center items-center h-[500px] bg-[#D8C4B6] mt-16 gap-12">
        <h1 className="text-3xl font-bold ">What our students have to say</h1>
        <div className="flex flex-col justify-between w-[50%] h-[50%] bg-white rounded-lg bg-opacity-50 text-[#4F709C] p-6 gap-y-8">
            <div className="font-black text-xl">Image Name WHO he is</div>
            <div> 
              Ferdowsi University of Mashhad, commonly known as Ferdowsi Uni, is one of the most prestigious and well-respected universities in Iran.</div>
            <div className="flex items-center gap-4 text-xl font-bold">
              next 
              <button>
                <AiOutlineArrowRight />
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
