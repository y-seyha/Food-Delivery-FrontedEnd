import { describe, it, expect, vi, beforeEach } from "vitest";
import { login, register, logout } from "./authService";
import { API_PATHS, axiosInstance } from "../api";

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

vi.mock("../api", () => ({
  axiosInstance: {
    post: vi.fn(),
  },
  API_PATHS: {
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      LOGOUT: "/auth/logout",
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  localStorageMock.clear();
});

describe("auth.service", () => {
  it("login() should call login API and Return Data", async () => {
    const mockResponse = { token: "abc123" };

    axiosInstance.post.mockResolvedValue({ data: mockResponse });

    const result = await login({ email: "a@test.com", password: "123" });

    expect(axiosInstance.post).toHaveBeenCalledWith(API_PATHS.AUTH.LOGIN, {
      email: "a@test.com",
      password: "123",
    });
    expect(result).toEqual(mockResponse);
  });

  it("register() should call resigster API", async () => {
    axiosInstance.post.mockResolvedValue({ data: { success: true } });

    const result = await register({ name: "User" });

    expect(axiosInstance.post).toHaveBeenCalledWith(API_PATHS.AUTH.REGISTER, {
      name: "User",
    });
    expect(result.success).toBe(true);
  });

  it("logout() should clear token even if API Fails", async () => {
    localStorageMock.setItem("token", "abc");

    axiosInstance.post.mockRejectedValue(new Error("Network Error"));

    await logout();

    expect(localStorageMock.getItem("token")).toBeNull();
  });
});
