import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReasonForContact from "./reason_for_contact";


describe("Reason for contact", () => {

    it("renders reason for contact label", () => {
        render(<ReasonForContact value="just-talk" onChangeReasonForContact={() => { }} />);
        expect(screen.getByText(/Reason for contact/i)).toBeInTheDocument();
    });

    it("Check if funciton is being called as expected", async () => {
        const onChangeHandler = jest.fn();
        render(<ReasonForContact value="just-talk" onChangeReasonForContact={onChangeHandler} />);

        await userEvent.selectOptions(screen.getByRole("combobox"), "rudeness");
        expect(onChangeHandler).toHaveBeenCalled();
    });
});