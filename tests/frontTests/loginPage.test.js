import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../../pages/login";

describe("Login", () => {
	it("Login page renders inputs", () => {
		const dom = render(<Login />);
		expect(screen.getByText("Email")).toBeVisible();
		const email = dom.getByTestId("email");
		fireEvent.change(email, { target: { value: "failed@mail" } }); //changing inputs
		expect(email.value).toBe("failed@mail");
		const password = dom.getByTestId("password");
		fireEvent.change(password, { target: { value: "fail" } });
		expect(password.value).toBe("fail");
	});
});
