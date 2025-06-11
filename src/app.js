import express from "express"
import cors from "cors"
import cookieParser  from "cookie-parser";
const app = express(); 
app.use(cors({
    origin:process.env.CORS_ORIGIN || '*',
    credentials:true
}))

// configrations

app.use(express.json({limit:"16kb"}));
// allow to url 
app.use(express.urlencoded({extended :true, limit:"16kb"}));
// allow to share data from public folder
app.use(express.static("public"));
// conf for  cookie for CRUD on user browser
app.use(cookieParser()); 


export default app;
