import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Units from "../../pages/buildingManagement/units";

describe("Units", () => {
	it("Units page renders inputs", () => {
		const dom = render(<Units />);
		expect(screen.getByText("Units")).toBeVisible();
	});
});
