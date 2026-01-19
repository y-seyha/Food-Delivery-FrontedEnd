// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "./useAuth";
import React from "react";

describe("useAuth", () => {
  it("throws error if used outside AuthProvider", () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      "useAuth must be used inside AuthProvider",
    );
  });

  it("returns auth context when used inside provider", () => {
    const mockAuth = {
      user: { id: 1, name: "John" },
      login: () => {},
      logout: () => {},
    };

    const wrapper = ({ children }) =>
      React.createElement(AuthContext.Provider, { value: mockAuth }, children);

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user.name).toBe("John");
  });
});
