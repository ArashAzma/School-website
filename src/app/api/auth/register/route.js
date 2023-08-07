import connect from "@/utils/db";
import bcrypt from 'bcryptjs';
import User from "@/models/users";
import { NextResponse } from "next/server";

export const POST = async (request)=> {
    const { username, email, password} = await request.json(); 
    await connect();
    const checkUser = new User({ username, email, password})
    const hashPass = await bcrypt.hash(password, 5);
    const newUser = new User({username, email, password: hashPass});

    try{
        await checkUser.validate();
        await newUser.save();
        return new NextResponse("Done", {
            status:201,
        });
    }catch(err){
        console.log(err)
        if (err.name === "ValidationError") {
        const errors = {};
        for (const [field, error] of Object.entries(err.errors)) {
          errors[field] = { message: error.message };
        }
        return new NextResponse(JSON.stringify({ errors }), { status: 400 });
        }else if (err.code === 11000) {
            // Duplicate key error (email already exists)
            if(err.keyValue.email){
                const errors = { email: { message: "Email already in use" } };
                return new NextResponse(JSON.stringify({ errors }), { status: 400 }); 
            }
            else if(err.keyValue.username){
                const errors = { username: { message: "Username already in use" } };
                return new NextResponse(JSON.stringify({ errors }), { status: 400 }); 
            }
        }else {
        return new NextResponse(err, { status: 500 });
       }
    } 
}