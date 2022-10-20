import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Blocks from "../../pages/buildingManagement/blocks";

describe("Blocks", () => {
	it("Blocks page renders inputs", () => {
		const dom = render(<Blocks />);
		expect(screen.getByText("Blocks")).toBeVisible();
	});
});
