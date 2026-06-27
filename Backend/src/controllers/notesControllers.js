import Note from "../models/Note.js";
export async function getAllNotes  (_,res)  {
    try{
        const notes = await Note.find().sort({createdAt:-1});//-1 for newest first 
        res.status(200).json(notes)

    }catch(error){
        console.error("Error in GetAllNotes Controller")
        res.status(500).json({message:"Internal server error"})
    }
}

export async function getNoteById(req,res){
    try{
        const note = await Note.findById(req.params.id);
        if(!note) return res.json({message:"note not found"});
        res.json(note)
    }catch(error){
        console.error("Error in getNoteById Controller")
        res.status(500).json({message:"Internal server error"})
    }
}

export async function createNote (req,res){
    try{
        const {title,content} = req.body
        // console.log(title,content)
        const note = new Note({title, content})

        const savedNote = await note.save()
        res.status(201).json(savedNote);
        
    }catch(error){
        console.error("Error in createNote Controller");
        res.status(500).json({message:"Internal server error"});
    }
}
export async function updateNote (req,res) {
    try{
        const {title,content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            { title, content },
            {
                new:true,
            }
        );
        
        if (!updatedNote) return res.status(404).json({message:"Note not found"});

        res.status(200).json(updatedNote);
    }catch(error){
        console.error("Error in updateNote Controller");
        res.status(500).json({message:"Internal server error"});
    }
    
}
export async function deleteNote (req,res) {
    try{
        const{title,content} = req.body
        const deletedNote = await Note.findByIdAndDelete(req.params.id);


        if (!deletedNote) return res.status(404).json({message:"Note not found"});

        res.status(200).json({message:"Note deleted successfully"});
    }catch(error){
        console.error("Error in deleteNote Controller");
        res.status(500).json({message:"Internal server error"});
    }
}