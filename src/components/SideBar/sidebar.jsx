"use client"
import { sidebarContext } from '@/contexts/SideBarProvider'
import { cartContext } from '@/contexts/CartProvider'
import React, {useContext, useEffect} from 'react'
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const { open, handleSidebar } = useContext(sidebarContext);
  const {likedBooks, bookedBooks, removeLiked, setLikedBooks} = useContext(cartContext);
  const session = useSession();
    const handleClick = async () => {
        console.log(session);
        if (session.status === "authenticated") {
          try {
            const likedBooksData = likedBooks.map((book) => ({
              title: book.title,
              id: book.isbn13,
              price: book.price,
              image: book.image,
              user_id: session.data.user.id,
            }));

            const res = await fetch("/api/likedBooks", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({likedBooksData , user_id: session.data.user.id}),
            });
      
            if (res.ok) {
              console.log("Liked books added successfully.");
            } else {
              console.log("Failed to add liked books to the server.");
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          console.log("NOT LOGGED");
        }
        handleSidebar();
      };
      useEffect(() => {
        const fetchLikedBooks = async () => {
          try {
            if (session?.status === "authenticated") {
              // const response = await fetch(`/api/likedBooks`);
              const userId = session.data.user.id
              const response = await fetch(`http://localhost:3000/api/likedBooks?userId=${userId}`);
              if (response.ok) {
                console.log("res ok");
                const data = await response.json();
                console.log(data);
                setLikedBooks(data);
              } else {
                console.error('Failed to fetch liked books:', response.status, response.statusText);
              }
            }
          } catch (error) {
            console.error('Error while fetching liked books:', error);
          }
        };
      
        fetchLikedBooks();
      }, [session?.status]);
    
    return (
    <div className={` ${open ? `right-0` : `-right-[1000px]`} h-full w-1/2 lg:w-1/3 z-10 bg-white absolute flex flex-col justify-between `}>
        <div className="flex justify-between p-4 text-2xl font-bold text-[#524a45]">
            <div className=" ">
            Liked Books
            </div>
            <button onClick={handleSidebar}>x</button>
        </div>
        <div className="overflow-hidden overflow-y-auto max-h-[675px]"> 
            {likedBooks.map((book) => 
            <div key={book.isbn13} className="text-[#524a45] flex rounded-xl bg-[#F5EFE7] m-6 h-[200px] items-center relative">
                <div><img src={book.image}  className='max-h-[200px] hover:scale-105 smooth duration-300'/></div>
                <div className="flex flex-col justify-around py-6">
                    <div className="font-bold ">{book.title}</div>
                    <div className="font-medium text-md">{book.price}</div>
                    <div className="absolute top-5 right-5">
                        <button className="flex p-1 w-[40px] h-[40px] items-center justify-center
                        text-white text-3xl bg-[#D8C4B6] rounded-lg "
                            onClick={ ()=> removeLiked(book) }>
                                x
                        </button>
                    </div>
                </div>
            </div>
            )}
        </div>
        <div className="flex items-center w-fill">
            <button onClick={() => handleClick()} className="text-center bg-[#524a45] m-5 p-2 w-[200px] md:w-[300px] lg:[400px] rounded-lg">save</button>
        </div>
    </div>
  )
}

export default Sidebar