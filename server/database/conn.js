import mongoose from "mongoose";

export default async function connect(){
    await mongoose.connect('mongodb+srv://bdp471:NS5s5E2mfZ01nasH@cluster0.39n8r.mongodb.net/?retryWrites=true&w=majority')
    console.log("Database Connected")
}