// const createMocks = require('node-mocks-http')
// const { default: loginHandler } = require('../pages/api/login')
import { expect } from "chai";
import { createMocks } from "node-mocks-http";
import loginHandler from "../../pages/api/login.js";

//create mock api requests with creatmocks
//then examine details of package

describe("Login backend", () => {
	it("Failed login with wrong credentials", async () => {
		const { req, res } = createMocks({
			method: "GET",
		});
		await loginHandler(req, res)
		expect(res.statusCode).eql(401)
	});
});

