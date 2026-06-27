import mongoose from "mongoose";
//create a schema 
//create a model off of the schema
const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },


    },
    {timestamps:true}//will give createdAt and updatedAt fields automatically
);
const Note = mongoose.model("Note", noteSchema); 
export default Note;