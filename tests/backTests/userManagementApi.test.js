import axios from "axios";

let userManagementApi = "http://localhost:3000/api/userManagement";

export default function noticeboardTest() {
  describe("management api", () => {
    it("get request", async () => {
      try {
        const res = await axios.get(userManagementApi);
      } catch (e) {
        expect(e.response.status).toBe(401);
        expect(e.response.data.error).toBe("Something went wrong");
        jest.retryTimes(1000);
      }
    });
  });
}
