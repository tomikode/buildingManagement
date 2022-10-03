import axios from "axios";

let blockApi = "http://localhost:3000/api/buildingManagement/blocks";

export default function blockTest() {
	describe("block api", () => {
		it("get request", async () => {
			try {
				const res = await axios.get(blockApi);
			} catch (e) {
				expect(e.response.status).toBe(401);
				expect(e.response.data.error).toBe("Something went wrong");
			}
		});
	});
}
