import axios from "axios";

let rentalApi = "http://localhost:3000/api/rental";

export default function rentalTest() {
	describe("rentalboard api", () => {
		it("get request", async () => {
			try {
				const res = await axios.get(rentalApi);
			} catch (e) {
				expect(e.response.status).toBe(401);
				expect(e.response.data.error).toBe("Something went wrong");
			}
		});
	});
}
