// const createMocks = require('node-mocks-http')
// const { default: loginHandler } = require('../pages/api/login')
import { expect } from "chai";
import { createMocks } from "node-mocks-http";
import loginHandler from "../../pages/api/login.js";

//create mock api requests with creatmocks
//then examine details of package

describe("Login backend", () => {
	it("Failed login with wrong credentials", async () => {
		let { req, res } = createMocks({
			method: "POST",
		});
		await loginHandler(req, res)
		expect(res.statusCode).equals(401)
	});

	it("Logs in correctly", async () => {
		let { req, res } = createMocks({
			method: "POST",
			body: {
				email: 'tom@mail',
				password: 'tom'
			},
		})
		console.log(req)
		await loginHandler(req, res)
		expect(res.statusCode).eql(201)
		console.log(res)
	})
});

