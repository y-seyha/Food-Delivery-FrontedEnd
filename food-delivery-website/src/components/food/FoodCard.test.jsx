import { render, screen, fireEvent, act } from "@testing-library/react";
import FoodCard from "./FoodCard";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";

vi.mock("../../hooks/useCart", () => ({
  useCart: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("FoodCard Component", () => {
  const mockFood = {
    id: 1,
    name: "Pizza",
    description: "Delicious pizza",
    price: 10,
    image: "/pizza.png",
  };

  const addToCartMock = vi.fn();
  const navigateMock = vi.fn();

  beforeEach(() => {
    useCart.mockReturnValue({ addToCart: addToCartMock });

    useNavigate.mockReturnValue(navigateMock);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  it("renders food details", () => {
    render(<FoodCard food={mockFood} />);
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("Delicious pizza")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "/pizza.png");
  });

  it("increments and decrements quantity", () => {
    render(<FoodCard food={mockFood} />);
    const plusButton = screen.getByText("+");
    const minusButton = screen.getByText("-");
    const quantity = screen.getByText("1");

    fireEvent.click(plusButton);
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(minusButton);
    expect(screen.getByText("1")).toBeInTheDocument();

    //should not 0
    fireEvent.click(minusButton);
    expect(screen.getByText("1")).toBeInTheDocument();

    expect(screen.getByText("1"));
  });

  it("adds food to cart on button click", () => {
    render(<FoodCard food={mockFood} />);
    const addButton = screen.getByText(/Add 1 to Cart/i);
    fireEvent.click(addButton);

    expect(addToCartMock).toHaveBeenCalledWith(mockFood, 1);
    act(() => {
      vi.advanceTimersByTime(1500);
    });
  });
});
