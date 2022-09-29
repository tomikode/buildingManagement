import axios from "axios";

let loginApi = "http://localhost:3000/api/login";
const validCreds = {
	email: "tom@mail",
	password: "tom",
};

export default function loginTest() {
	describe("login api", () => {
		it("get request", async () => {
			try {
				const res = await axios.get(loginApi);
			} catch (e) {
				expect(e.response.status).toBe(401);
				expect(e.response.data.error).toBe("Something went wrong");
				jest.retryTimes(1000);
			}
		});
		it("post request with no credentials", async () => {
			try {
				const res = await axios.post(loginApi, {});
			} catch (e) {
				expect(e.response.status).toBe(401);
				expect(e.response.data.error).toBe("Invalid credentials");
			}
		});

		it("post request with correct credentials", async () => {
			const res = await axios.post(loginApi, validCreds);
			console.log(res);
			expect(res.status).toBe(201);
			expect(res.data.foundUser.email).toBe(validCreds.email);
		});
	});
}
