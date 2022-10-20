import axios from "axios";

let api = "http://localhost:3000/api/workOrders";
let usersApi = "http://localhost:3000/api/userManagement";
let unitsApi = "http://localhost:3000/api/buildingManagement/units";
const validPost = {
	status: "New",
	submissionUser: null,
	contractor: null,
	description: "a thing broke",
};

let users = [];

let contractor;
let manager;
let unit;

let order;

export default function workOrderTest() {
	beforeAll(async () => {
		let response = await axios.get(usersApi);
		users = response.data.foundUsers;
		contractor = users.find((user) => user.type === "c");
		manager = users.find((user) => user.type === "m");
		response = await axios.get(unitsApi);
		unit = response.data.foundUnits[0];
		console.log(unit);
	});

	describe("work order api", () => {
		it("get all work orders", async () => {
			try {
				const res = await axios.get(api);
			} catch (e) {
				expect(e.response.status).toBe(200);
			}
		});
		it("post request with no data work order", async () => {
			try {
				const res = await axios.post(api, {});
			} catch (e) {
				expect(e.response.status).toBe(400);
				expect(e.response.data.error).toBe("No resource details given");
			}
		});

		it("post request with correct data work order", async () => {
			validPost.submissionUser = manager._id;
			validPost.contractor = contractor._id;
			const res = await axios.post(api, validPost);
			order = res.data;
			expect(res.status).toBe(201);
		});

		it("put work order", async () => {
			const res = await axios.put(`${api}/${order._id}`, {
				...order,
				description: "another thing broke",
			});
			order = res.data;
			expect(res.status).toBe(200);
			expect(res.data.description).toBe("another thing broke");
		});

		it("delete work order", async () => {
			const res = await axios.delete(`${api}/${order._id}`);
			expect(res.status).toBe(200);
			expect(res.data.description).toBe("another thing broke");
		});
	});
}
