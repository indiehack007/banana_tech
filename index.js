// import statements
import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./database/dbConnect.js";
import templateRoute from "./routes/templateRoutes.js";
import userRoute from "./routes/UserRoute.js";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/k0gaattpk",
  publicKey: "public_dzJdiMzPbcGgLK52WqIHfQVo+p4=",
  privateKey: "private_HDWsyQkF1104uOC9MUwR8we7nlc=",
});

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
app.use("/api", userRoute);

////////////////////////////////////////////////////////////////////

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/auth", function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

/////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.json(`Hello this it the Check ${PORT}`);
});
// Server running

app.listen(PORT, () => {
  console.log("Server Running on PORT", PORT);
});
