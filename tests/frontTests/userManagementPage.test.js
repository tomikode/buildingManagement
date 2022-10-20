import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserManagement from "../../pages/userManagement";

describe("UserManagement", () => {
	it("UserManagement page renders inputs", () => {
		const dom = render(<UserManagement />);
		expect(screen.getByText("User Management")).toBeVisible();
	});
});
