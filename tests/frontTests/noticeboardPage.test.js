import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Noticeboard from "../../pages/noticeboard";

//add data-testid to everything important
//fireEvent change to type into inputs
//fireEvent click on buttons

//https://testing-library.com/
//https://jestjs.io/docs/tutorial-react
//https://github.com/testing-library/jest-dom

describe("Noticeboard", () => {
	it("Noticeboard page renders inputs", () => {
		const dom = render(<Noticeboard />);
		expect(screen.getByText("Noticeboard")).toBeVisible();
		//const email = dom.getByTestId('email')
		//fireEvent.change(email, {target: {value: "failed@mail"}}) //changing inputs
		//expect(email.value).toBe("failed@mail")
		//const password = dom.getByTestId('password')
		//fireEvent.change(password, {target: {value: "fail"}})
		//expect(password.value).toBe("fail")
	});
});
