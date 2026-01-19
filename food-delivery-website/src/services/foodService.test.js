import { describe, it, expect, vi } from "vitest";
import { getFoods, getFoodById } from "./foodService";
import { axiosInstance, API_PATHS } from "../api";

vi.mock("../api", () => ({
  axiosInstance: {
    get: vi.fn(),
  },
  API_PATHS: {
    FOOD: {
      LIST: "/foods",
      DETAILS: (id) => `/foods/${id}`,
    },
  },
}));

describe("foodService", async () => {
  it("getFoods() returns food list", async () => {
    axiosInstance.get.mockResolvedValue({
      data: [{ id: 1, name: "Pizza" }],
    });

    const result = await getFoods();

    expect(axiosInstance.get).toHaveBeenCalledWith("/foods");
    expect(result.length).toBe(1);
  });

  it("getFoodById() return a signle food", async () => {
    axiosInstance.get.mockResolvedValue({
      data: { id: 1, name: "Burger" },
    });

    const result = await getFoodById(1);

    expect(axiosInstance.get).toHaveBeenCalledWith("/foods/1");
    expect(result.name).toBe("Burger");
    expect(result.id).toBe(1);
  });
});
