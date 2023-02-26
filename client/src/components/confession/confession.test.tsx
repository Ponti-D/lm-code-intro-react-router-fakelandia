import { render, screen } from "@testing-library/react";
import Confession from "./confession";

test("renders form element", () => {
    render(<Confession />);

    expect(screen.getByText(/Subject:/i)).toBeInTheDocument();
    expect(screen.getByText(/Reason for contact:/i)).toBeInTheDocument();
  
   
  });
  