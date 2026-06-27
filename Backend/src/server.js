import express from 'express';
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from './config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimiter.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


//middleware: function that runs in the middle b/w the request and the response 
app.use(express.json());//help us get access to req.body i.e. title,content in notescontroller.js [have to add this before routes] 
// , this middleware will parse JSON bodies:req.body
app.use(rateLimiter);

//simple custom middleware (can be deleted)
// app.use((req,res,next) =>{
//     console.log(`Req method is ${req.method} & Req url is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

connectDB().then(()=>{
app.listen(PORT, () => {
    console.log("server started on port", PORT);
    });
})
//GS3VsVASkOMBLAvg
// mongodb+srv://theabhaypawriya_db_user:GS3VsVASkOMBLAvg@cluster0.l87riam.mongodb.net/?appName=Cluster0