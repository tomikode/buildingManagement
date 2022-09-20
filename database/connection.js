import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connections[0].readyState === 0) {
    const uri = process.env.MONGODB_URI;
    mongoose.connect(uri);
    mongoose.connection.on("connected", () => console.log("Connected"));
    mongoose.connection.on("error", () =>
      console.log("Connection failed with - ", err)
    );
  }
};

export default connect;
