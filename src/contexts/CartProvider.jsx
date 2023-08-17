"use client"
import React, {createContext, useState} from 'react';
export const cartContext = createContext();
const CartProvider = ({children}) => {
    const [likedBooks, setLikedBooks] = useState([]);
    const [bookedBooks, setBookedBooks] = useState([]);
    const addLiked = (book) => {
        setLikedBooks([...likedBooks, book]);
    }
    const addBooked = (book) => {
        setBookedBooks([...bookedBooks, book]);
    }
    const removeLiked = (book) => {
        const temp = likedBooks.filter((item) => item.title !== book.title );
        setLikedBooks(temp);
    };
    return (
        <cartContext.Provider value={{likedBooks, bookedBooks, addLiked, addBooked, removeLiked, setLikedBooks}}>{children}</cartContext.Provider>
    )
}
export default CartProvider; 