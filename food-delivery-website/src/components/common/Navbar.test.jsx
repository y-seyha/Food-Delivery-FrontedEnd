import { render, screen, fireEvent, within } from "@testing-library/react";
import NavBar from "./Navbar";
import { useCart } from "../../hooks/useCart";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

vi.mock("../../hooks/useCart", () => ({
  useCart: vi.fn(),
}));

describe("Navbar component", () => {
  const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

  beforeEach(() => {
    useCart.mockReturnValue({ cartItems: [{ id: 1, quantity: 3 }] });
  });

  it("renders all desktop links", () => {
    renderWithRouter(<NavBar />);

    expect(screen.getByText(/Menu/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Cart/i)).toBeInTheDocument();
    expect(screen.getByText(/Tracking/i)).toBeInTheDocument();
    expect(screen.getByText(/My Order/i)).toBeInTheDocument();
  });

  it("displays cart badge with total items", () => {
    renderWithRouter(<Navbar />);

    const cartBadge = screen.getByText("3");
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(cartBadge).toBeVisible();
  });

  it("toggles mobile menu on hamburger click", () => {
    renderWithRouter(<Navbar />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    const mobileMenu = screen.getByTestId("mobile-menu");
    const { getByText } = within(mobileMenu);

    expect(getByText(/Menu/i)).toBeVisible();
    expect(getByText(/Profile/i)).toBeVisible();
    expect(getByText(/Cart/i)).toBeVisible();
    expect(getByText(/Tracking/i)).toBeVisible();
    expect(getByText(/My Order/i)).toBeVisible();

    fireEvent.click(button); // close mobile menu
    expect(mobileMenu).not.toBeVisible();
  });

  it("mobile menu closes when a link is clicked", () => {
    renderWithRouter(<NavBar />);
    const button = screen.getByTestId("hamburger-btn");

    fireEvent.click(button);
    const mobileMenu = screen.getByTestId("mobile-menu");
    const { getByText } = within(mobileMenu);

    const profileLink = getByText(/Profile/i);
    fireEvent.click(profileLink);

    expect(screen.queryByTestId("mobile-menu")).toBeNull();
  });
});
