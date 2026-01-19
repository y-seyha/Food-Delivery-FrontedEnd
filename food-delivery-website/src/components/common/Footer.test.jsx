import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { MemoryRouter } from "react-router-dom";
import { expect } from "vitest";

describe("Footer Component : ", () => {
  it("renders brand and description", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.getByText("Foodie")).toBeInTheDocument();
    expect(
      screen.getByText(/Delivering delicious food to your doorstep/i),
    ).toBeInTheDocument();
  });

  it("renders quick links and contact info", () => {
    render(
      <MemoryRouter>
        <Footer />{" "}
      </MemoryRouter>,
    );

    expect(screen.getByTestId("facebook-link")).toBeInTheDocument();
    expect(screen.getByTestId("instagram-link")).toBeInTheDocument();
    expect(screen.getByTestId("linkedIn-link")).toBeInTheDocument();
    expect(screen.getByTestId("twitter-link")).toBeInTheDocument();
  });

  it("render quick lnks and contact info", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("My Orders")).toBeInTheDocument();

    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("+1 234 567 890")).toBeInTheDocument();

    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
