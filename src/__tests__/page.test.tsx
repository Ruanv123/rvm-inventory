import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/(dashboard)/page";

describe("teste", () => {
  it("render a button", () => {
    render(<Home />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  it("render a text", () => {
    render(<Home />);

    const title = screen.getByText("Inventory");

    expect(title).toBeInTheDocument();
  });
});
