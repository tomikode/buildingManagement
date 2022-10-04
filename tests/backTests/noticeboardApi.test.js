import axios from "axios";

let noticeboardApi = "http://localhost:3000/api/noticeboard";

export default function noticeboardTest() {
	describe("noticeboard api", () => {
		it("get request", async () => {
			try {
				const res = await axios.get(noticeboardApi);
			} catch (e) {
				expect(e.response.status).toBe(401);
				expect(e.response.data.error).toBe("Something went wrong");
			}
		});
	});
}
