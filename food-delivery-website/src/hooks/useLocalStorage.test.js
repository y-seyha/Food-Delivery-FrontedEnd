// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

beforeEach(() => {
  localStorage.clear();
});

describe("useLocalStorage ", () => {
  it("return initial value if nothing in localStorage ", () => {
    const { result } = renderHook(() => useLocalStorage("token", "default"));

    expect(result.current[0]).toBe("default");
  });

  it("stores and updates value in localStorage ", () => {
    const { result } = renderHook(() => useLocalStorage("token", ""));

    act(() => {
      result.current[1]("abc123");
    });

    expect(result.current[0]).toBe("abc123");

    expect(localStorage.getItem("token")).toBe('"abc123"');
  });

  it("supports functional updates", () => {
    const { result } = renderHook(() => useLocalStorage("count", 1));

    act(() => result.current[1]((prev) => prev + 1));

    expect(result.current[0]).toBe(2);
  });
});
