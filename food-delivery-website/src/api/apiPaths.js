export const BASE_URL = import.meta.env.VITE_BASE_PRODUCTION_URL;

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
