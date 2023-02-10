import mongoose from "mongoose";

export default async function connect(){
    await mongoose.connect('mongodb+srv://sravani21:5K9Pq149Rnz8ZCRw@cluster0.xjzkx6o.mongodb.net/?retryWrites=true&w=majority')
    console.log("Database Connected")
}