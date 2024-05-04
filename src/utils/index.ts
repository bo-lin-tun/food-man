import { Order } from "@prisma/client";

interface DailyMetrics {
  [date: string]: {
    date: string;
    totalOrders: number;
    totalRevenue: number;
  };
}

interface MonthlyMetrics {
  [date: string]: {
    month: string;
    totalOrders: number;
    totalRevenue: number;
  };
}

export const calculateDailySales = (orders: Order[]) => {
  const dailyMetrics: DailyMetrics = {};

  orders.forEach((order) => {
    const { createdAt, totalPrice } = order;

    const dateString = new Date(createdAt).toISOString().split("T")[0];
    const date = new Date(dateString);
    const dayOfMonth = date.getDate();
    const formattedDay = dayOfMonth < 10 ? `0${dayOfMonth}` : `${dayOfMonth}`;

    // If the order date is not already in the dailyMetrics object, initialize it
    if (!dailyMetrics[formattedDay]) {
      dailyMetrics[formattedDay] = {
        date: formattedDay,
        totalOrders: 0,
        totalRevenue: 0,
      };
    }

    // Increment the totalOrders and add the totalPrice to totalRevenue
    dailyMetrics[formattedDay].totalOrders++;
    dailyMetrics[formattedDay].totalRevenue += totalPrice;
  });

  const dailySales = Object.values(dailyMetrics);

  return dailySales;
};

export const calculateMonthlySales = (orders: Order[]) => {
  const monthlyMetrics: MonthlyMetrics = {};

  orders.forEach((order) => {
    const { createdAt, totalPrice } = order;
    const monthString = new Date(createdAt).toISOString().split("T")[0];
    const formattedMonth = new Date(monthString).toLocaleString("default", {
      month: "long",
    });

    // If the order date is not already in the monthlyMetrics object, initialize it
    if (!monthlyMetrics[formattedMonth]) {
      monthlyMetrics[formattedMonth] = {
        month: formattedMonth,
        totalOrders: 0,
        totalRevenue: 0,
      };
    }

    // Increment the totalOrders and add the totalPrice to totalRevenue
    monthlyMetrics[formattedMonth].totalOrders++;
    monthlyMetrics[formattedMonth].totalRevenue += totalPrice;
  });

  const monthlySales = Object.values(monthlyMetrics);

  return monthlySales;
};
