import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Noticeboard from "../../pages/noticeboard";

describe("Noticeboard", () => {
	it("Noticeboard page renders inputs", () => {
		const dom = render(<Noticeboard />);
		expect(screen.getByText("Noticeboard")).toBeVisible();
	});
});
