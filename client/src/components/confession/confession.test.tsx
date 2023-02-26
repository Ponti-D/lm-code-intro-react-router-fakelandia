import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Confession from "./confession";

describe("Confession form", () => {

  test("renders form element", () => {
    render(<Confession />);
    expect(screen.getByText(/Subject:/i)).toBeInTheDocument();
    expect(screen.getByText(/Reason for contact:/i)).toBeInTheDocument();
    expect(screen.getByText(/Details here/i)).toBeInTheDocument();

  });

  test("submit enabled", async () => {
  
    render(<Confession />);
     await userEvent.type(
      screen.getByRole("textbox", {name: /subject/i}),
      "This is subject"
    );
    await userEvent.type(
      screen.getByRole("textbox", {name: /details/i}),
      "This is details xx xnnxnx nxnnxnx"
    );

 
   expect(screen.getByRole('button', { name: /submit/i, })).toBeEnabled();
 
   
  });



});

