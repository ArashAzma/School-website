import likedBooks from "@/models/likedBooks";
import { NextResponse } from "next/server";
import connect from "@/utils/db";

export const GET = async (req, res) => {
    try {
      let params = new URL(req.url).searchParams;
      let userId = params.get("userId");
      await connect();
      const books = await likedBooks.find({ user_id: userId });
      return new NextResponse(JSON.stringify(books), { status: 200 });
    } catch (err) {
      return new NextResponse(err, { status: 500 });
    }
  };
  

export const POST = async (req) => {

    const body = await req.json();
    const data = body.likedBooksData;
    const user_id = body.user_id;
    try {
        await connect();
        await likedBooks.deleteMany({ user_id });
        for (const bookData of data) {
            const book = new likedBooks(bookData);
            await book.save();
        }
        return new NextResponse("Added", {status:201});
    } catch (error) {
        console.error("Error in POST route:", error);
        return new NextResponse(JSON.stringify(error), {status:500});
    }
}