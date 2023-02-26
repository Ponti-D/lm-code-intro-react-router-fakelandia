import { render, screen } from "@testing-library/react";
import Confession from "./confession";

describe("Confession form", () => {

  test("renders form element", () => {
    render(<Confession />);
    expect(screen.getByText(/Subject:/i)).toBeInTheDocument();
    expect(screen.getByText(/Reason for contact:/i)).toBeInTheDocument();
    expect(screen.getByText(/Details here/i)).toBeInTheDocument();

  });
  
});

