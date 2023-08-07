"use client"
import React,{useState, useEffect, useContext} from 'react';
import { RiBookmarkLine, RiBookmarkFill,  RiHeartLine, RiHeartFill, RiBook2Line } from "react-icons/ri";
import { sidebarContext } from '@/contexts/SideBarProvider';
import { cartContext } from '@/contexts/CartProvider';
import Navbar from "@/components/Navbar/navbar"
import Sidebar from '@/components/SideBar/sidebar';

const getData = async() => {
    const res = await fetch("https://api.itbook.store/1.0/new")
    if(!res.ok){
        throw new Error("reede")
    }
    return res.json();
}

const Shop = () => {
    const [books, setBooks] = useState(null);
    const {handleSidebar} = useContext(sidebarContext);
    const {addLiked, addBooked, removeLiked} = useContext(cartContext);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await getData();
                const newBooks = res.books.map((book) => ({
                    ...book,
                    isLiked: false,
                    isBooked: false,
                  }));
                setBooks(newBooks);
            }catch(err){
                console.log(err)
            }
        };
        fetchData();
    },[])
    
    const handleLike = async (item) => {
        
        if (item.isLiked) {
            console.log("asdasddssdasd")
            await removeLiked(item); 
        } else {
            addLiked(item);
        }
        const newData = books.map((book) => {
            if(book === item){
                return { ...book, isLiked: !book.isLiked}
            }
            else{
                return book;
            }
        })
        setBooks(newData);
    }
    
    const handleBookMark = (id) => {
        const newData = books.map((book) => {
            if(book.isbn13 == id){
                return ({...book, isBooked : !book.isBooked})
            }
            else{
                return book;
            }
        })
        setBooks(newData);
    }
  return (
    <div className=" bg-opacity-70">
        <Navbar />
        <Sidebar />
        <div className="flex justify-between items-center text-3xl font-bold text-[#524a45] px-12 py-6">
            <div>Books</div>
            <button className="text-3xl" onClick={handleSidebar}><RiBook2Line /></button>
        </div>
        <div className="flex flex-col h-screen justify-center items-center ">
            <div className='bg-white w-fill rounded-lg p-6 px-20
                            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
                            overflow-hidden overflow-y-auto gap-4
            '>
                 {books ? (
                books.map((book) => (
                <div key={book.isbn13} className="text-[#524a45] flex rounded-xl justify-between bg-[#F5EFE7] group ">
                    <div><img src={book.image}  className='max-w-[225px] hover:scale-105 smooth duration-300'/></div>
                    <div className="flex flex-col relative  items-center justify-between overflow-hidden py-8 ">
                        <div className="flex absolute -top-10 right-5 gap-x-3 justify-center   group-hover:top-5  transition-all ease-in-out duration-300">
                            <button className="flex p-1 w-[40px] h-[40px] items-center justify-center text-black text-white text-3xl bg-[#D8C4B6] rounded-lg"
                                onClick={()=>handleLike(book)}>
                                { book.isLiked ? <RiHeartFill /> : <RiHeartLine />}
                            </button>
                            <button className="flex p-1 w-[40px] h-[40px] items-center justify-center text-black text-white text-3xl bg-[#D8C4B6] rounded-lg"
                                onClick={()=>handleBookMark(book.isbn13)}>
                                { book.isBooked ? <RiBookmarkFill /> : <RiBookmarkLine />}
                            </button>
                        </div>
                        <div className="font-bold pt-16">{book.title}</div>
                        <div className="font-medium text-md">{book.price}</div>
                    </div>
                </div>
                ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default Shop