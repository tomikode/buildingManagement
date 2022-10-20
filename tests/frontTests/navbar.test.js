import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TenantHome from "../../pages/tenantHome";
import { UserContext } from "../../utils/UserContext";

let user = { email: "tom@mail", password: "tom", type: "t" };
const setUser = (data) => {
	user = data;
};

jest.mock("../../pages/_app", () => {
	return jest.fn(() => {
		user, setUser;
	});
});

describe("Tenant Home", () => {
	it("Tenant home renders", () => {
		const dom = render(
			<UserContext.Provider value={{ user, setUser }}>
				<TenantHome />
			</UserContext.Provider>
		);
		expect(screen.getByText("Home")).toBeVisible();
		const menu = dom.getByTestId("menu");
		fireEvent.click(menu);
		expect(screen.getByText("Profile")).toBeVisible();
	});
});
