import axios from "axios";
import { exec } from "node:child_process";

jest.retryTimes(10000);

let testServer;

beforeAll(() => {
	console.log("spawning");
	testServer = exec(/^win/.test(process.platform) ? "npm.cmd" : "npm", [
		"run",
		"dev",
	]);
});

afterAll(() => {
	console.log("killing");
	testServer.kill();
});

describe("apitest", () => {
	it("might work", async () => {
		try {
			const res = await axios.get("http://localhost:3000/api/login");
		} catch (e) {
			expect(e.response.status).toBe(401);
		}
	});
});
