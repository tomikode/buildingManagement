import mongoose from "mongoose";

const connect = async () => {
	if (mongoose.connections[0].readyState === 0) {
		const uri = process.env.MONGODB_URI
		console.log(uri)
		mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log("connected");
	}
};

export default connect;