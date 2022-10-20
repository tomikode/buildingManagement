import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContractorWorkOrders from "../../pages/contractorWorkOrders";
import { UserContext } from "../../utils/UserContext";

let user = { email: "john@mail", password: "tom", type: "c" };
const setUser = (data) => {
	user = data;
};

jest.mock("../../pages/_app", () => {
	return jest.fn(() => {
		user, setUser;
	});
});

describe("Contractor work orders", () => {
	it("Contractor work order page renders", () => {
		const dom = render(
			<UserContext.Provider value={{ user, setUser }}>
				<ContractorWorkOrders />
			</UserContext.Provider>
		);
		expect(screen.getByText("My Work Orders")).toBeVisible();
		expect(screen.getByText("ID")).toBeVisible();
	});
});
