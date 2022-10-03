import axios from "axios";

let unitApi = "http://localhost:3000/api/buildingManagement/units";

export default function unitTest() {
	describe("unit api", () => {
		it("get request", async () => {
			try {
				const res = await axios.get(unitApi);
			} catch (e) {
				expect(e.response.status).toBe(401);
				expect(e.response.data.error).toBe("Something went wrong");
			}
		});
	});
}
