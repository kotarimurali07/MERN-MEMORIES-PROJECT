import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function DDConnection() {
  const connection_url = process.env.URL;
  mongoose
    .connect(connection_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
        console.log("MONGODB connection IS SUCCESSFUL");
    })
    .catch((err) => {
        console.log("MONGODB connection IS  FAILED");
    });
}
export default DDConnection;