import axios from "axios";

let invoiceApi = "http://localhost:3000/api/Invoicev2";

export default function invoiceTest() {
	describe("invoice api", () => {
		it("get request", async () => {
			try {
				const res = await axios.get(invoiceApi);
			} catch (e) {
				expect(e.response.status).toBe(401);
				expect(e.response.data.error).toBe("Something went wrong");
			}
		});
	});
}
