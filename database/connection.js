import mongoose from "mongoose";

const connect = async () => {
	console.log(process.env);
	if (mongoose.connection.readyState === 0) {
		let uri = process.env.MONGODB_URI;
		let testUri = process.env.TEST_URI;
		if (process.env.CHILD_ENV === "test") {
			uri = testUri;
		}
		console.log(uri);
		mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("connected");
	}
};

export default connect;
