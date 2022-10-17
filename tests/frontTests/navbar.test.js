import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TenantHome from "../../pages/tenantHome";
import { UserContext } from "../../utils/UserContext";

let user = { email: "tom@mail", password: "tom", type: "t" };
const setUser = (data) => {
	user = data;
};

beforeAll(() => {});

jest.mock("../../pages/_app", () => {
	return jest.fn(() => {
		user, setUser;
	});
});

describe("Tenant Home", () => {
	it("Tenant home renders", () => {
		// console.log(<MyApp Component={<TenantHome />} />);
		const dom = render(
			<UserContext.Provider value={{ user, setUser }}>
				<TenantHome />
			</UserContext.Provider>
		);
		expect(screen.getByText("Tenant Home")).toBeVisible();
		const menu = dom.getByTestId("menu");
		fireEvent.click(menu);
		expect(screen.getByText("Profile")).toBeVisible();
		expect(1).toBe(0);
	});
});
