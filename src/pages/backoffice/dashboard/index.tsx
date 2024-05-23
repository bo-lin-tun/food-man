import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import DailyOverView from "./daily-sale-chart";
import MonthlySaleChart from "./monly-sale-chart";
import { config } from "@/utils/config";

interface DailyOrderType {
  date: string;
  totalOrders: number;
  totalRevenue: number;
}

interface MonthlyOrderType {
  month: string;
  totalOrders: number;
  totalRevenue: number;
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dailyOrders, setDailyOrders] = useState<DailyOrderType[]>([]);
  const [monthlyOrders, setMonthlyOrders] = useState<MonthlyOrderType[]>([]);

  const fetchMetrics = async () => {
    setIsLoading(false);
    try {
      const response = await fetch(`${config.backofficeApiUrl}/dashboard`);
      const resDatas = await response.json();
      setDailyOrders(resDatas.daily);
      setMonthlyOrders(resDatas.monthly);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Lading ...
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography
            role="heading"
            sx={{ fontSize: "1.3rem", fontWeight: "bold", mb: 2 }}
          >
            Daily Sales of{" "}
            {new Date().toLocaleString("default", { month: "long" })}
          </Typography>
          <Paper sx={{ padding: "1rem" }}>
            <DailyOverView data={dailyOrders} />
          </Paper>
        </Grid>
        <Grid xs={12}>
          <Typography
            role="heading"
            sx={{ fontSize: "1.3rem", fontWeight: "bold", mb: 2 }}
          >
            Monthly Sales
          </Typography>
          <Paper sx={{ padding: "1rem" }}>
            <MonthlySaleChart data={monthlyOrders} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
