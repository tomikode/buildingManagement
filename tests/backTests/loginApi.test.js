import axios from "axios";

describe("apitest", () => {
	it("might work", async () => {
		try {
			const res = await axios.get("http://localhost:3000/api/login");
		} catch (e) {
			expect(e.response.status).toBe(401);
		}
	});
});
