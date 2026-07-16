import express from 'express';
import dotenv from "dotenv";
import cors from "cors"
import path from 'path'

import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()


//middleware: function that runs in the middle b/w the request and the response
if(process.env.NODE_ENV !== "production"){
app.use(cors({
    origin: "http://localhost:5173",
    })
);
};
app.use(express.json());//help us get access to req.body i.e. title,content in notescontroller.js [have to add this before routes] 
// , this middleware will parse JSON bodies:req.body
app.use(rateLimiter);

//simple custom middleware (can be deleted)
// app.use((req,res,next) =>{
//     console.log(`Req method is ${req.method} & Req url is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    });
}

connectDB().then(()=>{
app.listen(PORT, () => {
    console.log("server started on port", PORT);
    });
})

//
// 
//