// @vitest-environment jsdom
import { renderHook } from "@testing-library/react";
import { CartContext } from "../context/CartContext";
import { useCart } from "./useCart";
import { expect } from "vitest";
import React from "react";

describe("useCart", () => {
  it("throws error if used outside CartProvider", () => {
    expect(() => renderHook(() => useCart())).toThrow(
      "useCart must be used inside CartProvider",
    );
  });

  it("returns cart context when used inside provider ", () => {
    const mockCart = {
      items: [{ id: 1, name: "Pizza" }],
      addToCart: () => {},
      removeFromCart: () => {},
    };

    const wrapper = ({ children }) =>
      React.createElement(CartContext.Provider, { value: mockCart }, children);

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items.length).toBe(1);
  });
});
