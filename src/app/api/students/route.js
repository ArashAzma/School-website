import students from "@/models/students";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const stds = await students.find();
    return new NextResponse(JSON.stringify(stds), { status: 200 });
  } catch (err) {
    return new NextResponse(err, { status: 500 });
  }
};

export const POST = async (request) => {
    const body = await request.json();
    const newStudent = new students(body);
    try{
        await connect();
        await newStudent.validate();
        await newStudent.save();
        return new NextResponse("Created", {status:201});
    }catch(err){
      if (err.name === "ValidationError") {
      const errors = {};
      for (const [field, error] of Object.entries(err.errors)) {
        errors[field] = { message: error.message };
      }
      return new NextResponse(JSON.stringify({ errors }), { status: 400 });
     } else {
       throw err;
     }
    } 
}