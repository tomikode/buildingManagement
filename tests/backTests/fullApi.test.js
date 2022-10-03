import killPort from "kill-port";
import { spawn } from "node:child_process";
import loginTest from "./loginApi.test";
import noticeboardTest from "./noticeboardApi.test";
import userManagementTest from "./userManagementApi.test";
import blockTest from "./blockApi.test";
import unitTest from "./unitAPI.test";

let testServer;
jest.setTimeout(15000);

//wait for dev server to start for testing 10 seconds
const waitForServer = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, 10000);
	});
};

//kill any process on port 3000 and start dev server child process
beforeAll(async () => {
	try {
		await killPort(3000);
	} catch (e) {
		console.log(e);
	}
	console.log("spawning");
	testServer = spawn(/^win/.test(process.platform) ? "npm.cmd" : "npm", [
		"run",
		"childServer",
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
	await waitForServer();
	console.log("testfunc done");
});

//run all feature related tests
loginTest();
noticeboardTest();
userManagementTest();
blockTest();
unitTest();
