import { expect } from "chai";
import { afterEach } from "mocha";
import mongoose from "mongoose";
import { createMocks } from "node-mocks-http";
import loginHandler from "../../pages/api/login.js";

//https://stackoverflow.com/questions/52432799/how-to-set-and-read-user-environment-variable-in-azure-devops-pipeline

//create mock api requests with creatmocks
//then examine details of package

afterEach(() => {
	mongoose.disconnect()
})

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
		await loginHandler(req, res)
		expect(res.statusCode).eql(201)
		
	})
});

