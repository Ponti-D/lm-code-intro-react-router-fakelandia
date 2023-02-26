import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Subject from "./subject";

describe("Subject", () => {
  it("Renders label text element", () => {
    render(<Subject subject="" onChangeSubject={() => {}} />);
    expect(screen.getByText("Subject:")).toBeInTheDocument();
  });

  it("Displays subject value as expected", () => {
    const onChangeHandler = jest.fn();
    render(
      <Subject subject="This is subject" onChangeSubject={onChangeHandler} />
    );
    const speciesNameElement = screen.getByRole("textbox");
    expect(speciesNameElement).toHaveValue("This is subject");
  });

  it("Check if funciton is being called as expected", () => {
    const onChangeHandler = jest.fn();
    render(<Subject subject="" onChangeSubject={onChangeHandler} />);

    userEvent.type(screen.getByRole("textbox"), "Hello");
    expect(onChangeHandler).toHaveBeenCalledTimes(5);
  });

  it("Given the subject entered is shorted than 3 charactors there should be error messages present", async () => {
    const onChangeHandler = jest.fn();
    render(
      <Subject subject="" onChangeSubject={onChangeHandler} />
    );
    await userEvent.type(screen.getByRole("textbox"), "he");
    expect(screen.getByTestId("error-message")).toBeInTheDocument(); 
  });


});
