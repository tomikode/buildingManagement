import axios from "axios";
import { spawn } from "node:child_process";

jest.retryTimes(10000);

let testServer;

beforeAll(() => {
	console.log("spawning");
	testServer = spawn(/^win/.test(process.platform) ? "npm.cmd" : "npm", [
		"run",
		"dev",
	]);
	testServer.stdout.on("data", (data) => {
		console.log(`stdout: ${data}`);
	});

	testServer.stderr.on("data", (data) => {
		console.error(`stderr: ${data}`);
	});

	testServer.on("close", (code) => {
		console.log(`child process exited with code ${code}`);
	});
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
