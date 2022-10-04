import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DamageReport from "../../pages/damageReport";

describe("DamageReport", () => {
	it("DamageReport page renders inputs", () => {
		const dom = render(<DamageReport />);
		expect(screen.getByText("Damage Reporting Form")).toBeVisible();
	});
});