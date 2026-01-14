export const BASE_URL = "http://localhost:5000/api";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
  },

  FOOD: {
    FOODS: "/foods",
    DETAILS: (id) => `/foods/${id}`,
  },

  ORDER: {
    CREATE: "/orders",
    MY_ORDERS: "/orders/myOrders",
  },
};
