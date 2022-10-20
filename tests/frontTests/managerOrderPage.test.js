import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ManagerWorkOrders from "../../pages/managerWorkOrders";
import { UserContext } from "../../utils/UserContext";

let user = { email: "sarah@mail", password: "tom", type: "m" };
const setUser = (data) => {
	user = data;
};

jest.mock("../../pages/_app", () => {
	return jest.fn(() => {
		user, setUser;
	});
});

describe("Manager work orders", () => {
	it("Manager work order page renders", () => {
		const dom = render(
			<UserContext.Provider value={{ user, setUser }}>
				<ManagerWorkOrders />
			</UserContext.Provider>
		);
		expect(screen.getByText("Work Orders")).toBeVisible();
		expect(screen.getByText("ID")).toBeVisible();
	});
});
