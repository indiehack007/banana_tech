// import statements
import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./database/dbConnect.js";
import templateRoute from "./routes/templateRoutes.js";

// functions
const PORT = process.env.PORT || 5500;
const app = express();
connectDB();

// app.use(cors({
//   origin: ['http://localhost:3000'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials:true,
// }));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", templateRoute);



app.get("/", (req, res) => {
  res.json(`Hello this it the Check ${PORT}`);
});
// Server running

app.listen(PORT, () => {
  console.log("Server Running on PORT", PORT);
});
