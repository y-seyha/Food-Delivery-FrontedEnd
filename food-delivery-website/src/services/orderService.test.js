import { describe, it, expect, vi } from "vitest";
import { placeOrder, getMyOrders } from "./orderServer";
import { axiosInstance, API_PATHS } from "../api";

vi.mock("../api", () => ({
  axiosInstance: {
    post: vi.fn(),
    get: vi.fn(),
  },

  API_PATHS: {
    ORDER: {
      CREATE: "/orders",
      MY_ORDERS: "/orders/my",
    },
  },
}));

describe("orderService", () => {
  it("placeOrder() post order data", async () => {
    const orderData = { item: [1, 2] };

    axiosInstance.post.mockResolvedValue({ data: { id: 99 } });

    const result = await placeOrder(orderData);

    expect(axiosInstance.post).toHaveBeenCalledWith("/orders", orderData);

    expect(result.id).toBe(99);
  });

  it("getOrders() return orders", async () => {
    axiosInstance.get.mockResolvedValue({
      data: [{ id: 1 }, { id: 2 }],
    });

    const result = await getMyOrders();

    expect(axiosInstance.get).toHaveBeenCalledWith("/orders/my");

    expect(result.length).toBe(2);
  });
});
