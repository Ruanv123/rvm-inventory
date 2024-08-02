import LoginPage from "@/app/(auth)/signin/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("shoud be a render login page", () => {
  it("render a page", () => {
    render(<LoginPage />);

    const title = screen.getByText("Login");

    expect(title).toBeInTheDocument();
  });
});
