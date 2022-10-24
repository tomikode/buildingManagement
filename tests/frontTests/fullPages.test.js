import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../../pages/login";
import Noticeboard from "../../pages/noticeboard";
import DamageReport from "../../pages/damageReport";
import Blocks from "../../pages/buildingManagement/blocks";
import { UserContext } from "../../utils/UserContext";
import ManagerWorkOrders from "../../pages/managerWorkOrders";
import UserManagement from "../../pages/userManagement";
import Units from "../../pages/buildingManagement/units";
import TenantHome from "../../pages/tenantHome";

describe("Login", () => {
	it("Login page renders inputs", () => {
		const dom = render(<Login />);
		expect(screen.getByText("Email")).toBeVisible();
		const email = dom.getByTestId("email");
		fireEvent.change(email, { target: { value: "failed@mail" } }); //changing inputs
		expect(email.value).toBe("failed@mail");
		const password = dom.getByTestId("password");
		fireEvent.change(password, { target: { value: "fail" } });
		expect(password.value).toBe("fail");
	});

	it("Noticeboard page renders inputs", () => {
		const dom = render(<Noticeboard />);
		expect(screen.getByText("Noticeboard")).toBeVisible();
	});

	it("Blocks page renders inputs", () => {
		const dom = render(<Blocks />);
		expect(screen.getByText("Blocks")).toBeVisible();
	});

	it("DamageReport page renders inputs", () => {
		const dom = render(<DamageReport />);
		expect(screen.getByText("Damage Reporting Form")).toBeVisible();
	});

	it("Manager work order page renders", () => {
		let user = { email: "sarah@mail", password: "tom", type: "m" };
		const setUser = (data) => {
			user = data;
		};

		jest.mock("../../pages/_app", () => {
			return jest.fn(() => {
				user, setUser;
			});
		});

		const dom = render(
			<UserContext.Provider value={{ user, setUser }}>
				<ManagerWorkOrders />
			</UserContext.Provider>
		);
		// const dom = render(<ManagerWorkOrders />);
		expect(screen.getByText("Work Orders")).toBeVisible();
		expect(screen.getByText("ID")).toBeVisible();
	});

	it("Tenant home renders", () => {
		let user = { email: "tom@mail", password: "tom", type: "t" };
		const setUser = (data) => {
			user = data;
		};

		jest.mock("../../pages/_app", () => {
			return jest.fn(() => {
				user, setUser;
			});
		});

		const dom = render(
			<UserContext.Provider value={{ user, setUser }}>
				<TenantHome />
			</UserContext.Provider>
		);
		expect(screen.getByText("Home")).toBeVisible();
		const menu = dom.getByTestId("menu");
		fireEvent.click(menu);
		expect(screen.getByText("Profile")).toBeVisible();
	});

	it("Noticeboard page renders inputs", () => {
		const dom = render(<Noticeboard />);
		expect(screen.getByText("Noticeboard")).toBeVisible();
	});

	it("Units page renders inputs", () => {
		const dom = render(<Units />);
		expect(screen.getByText("Units")).toBeVisible();
	});

	it("UserManagement page renders inputs", () => {
		const dom = render(<UserManagement />);
		expect(screen.getByText("User Management")).toBeVisible();
	});
});
