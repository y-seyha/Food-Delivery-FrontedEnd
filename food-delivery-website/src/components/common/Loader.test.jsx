import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Loader from "./Loader";

describe("Loader Component", () => {
  it("render spinningn loader", () => {
    const { container } = render(<Loader />);
    const spinner = container.querySelector(".animate-spin");

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });
});
