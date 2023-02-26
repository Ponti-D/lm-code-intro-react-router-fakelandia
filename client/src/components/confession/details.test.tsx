import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Details from "./details";


describe("Details", () => {
  it("Renders label text element", () => {
    render(<Details details="" onChangeDetails={() => {}} />);
    expect(screen.getByText(/Details here 👉/i)).toBeInTheDocument();
  });

  it("Displays Details value as expected", () => {
    const onChangeHandler = jest.fn();
    render(
      <Details details="This is Details" onChangeDetails={onChangeHandler} />
    );
    const speciesNameElement = screen.getByRole("textbox");
    expect(speciesNameElement).toHaveValue("This is Details");
  });

  it("Check if funciton is being called as expected", () => {
    const onChangeHandler = jest.fn();
    render(<Details details="" onChangeDetails={onChangeHandler} />);

    userEvent.type(screen.getByRole("textbox"), "Details");
    expect(onChangeHandler).toHaveBeenCalledTimes(7);
  });

  it("Given the Details entered is shorted than 10 charactors there should be error messages present", async () => {
    const onChangeHandler = jest.fn();
    render(
      <Details details="" onChangeDetails={onChangeHandler} />
    );
    await userEvent.type(screen.getByRole("textbox"), "This is ");
    expect(screen.getByTestId("error-message")).toBeInTheDocument(); 
  });


});
