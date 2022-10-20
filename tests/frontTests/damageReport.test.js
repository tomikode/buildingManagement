import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DamageReport from "../../pages/damageReport";

let user = {};
const setUser = (data) => {};

jest.mock("../../pages/_app", () => {
	return jest.fn(() => {
		user, setUser;
	});
});

describe("DamageReport", () => {
	it("DamageReport page renders inputs", () => {
		const dom = render(<DamageReport />);
		expect(screen.getByText("Damage Reporting Form")).toBeVisible();
	});
});
