import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateOrder } from "@/store/slices/orderSlice";
import { Box, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ORDERSTATUS, Order, Table } from "@prisma/client";
import { useEffect, useState } from "react";
import { toggleButtonGroupClasses } from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import OrderCard from "./order-card";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 1,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
}));

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const [filterOrders, setFilterOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<ORDERSTATUS>("PENDING");
  const orders = useAppSelector((state) => state.order.items);
  const addons = useAppSelector((state) => state.addon.items);
  const menus = useAppSelector((state) => state.menu.items);
  const tables = useAppSelector((state) => state.table.items);

  const orderTableIds = filterOrders.map(
    (item) => item.tableId && item.tableId
  );
  const orderTables = tables.filter((item) => orderTableIds.includes(item.id));
  const orderDate =
    filterOrders &&
    filterOrders.find((item) => item.tableId === orderTables[0]?.id);

  const handleOrderStatuUpdate = ({
    itemId,
    status,
  }: {
    itemId: string;
    status: ORDERSTATUS;
  }) => {
    dispatch(updateOrder({ itemId, status }));
  };

  useEffect(() => {
    const filterOrders = orders.filter((item) => item.status === status);
    setFilterOrders(filterOrders);
    console.log("filterOrders", filterOrders, orders);
  }, [orders, status]);

  const printPrice = ({ id, table }: { id: string; table: Table }) => {
    if (!id) return;
    const printContent = document.getElementById(`${id}`);

    const imageTags = document.querySelectorAll(".removePrintImage");
    imageTags.forEach((imgTag) => {
      imgTag.remove();
    });

    if (printContent) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`<html><head><title>Print</title>`);
        printWindow.document.write(`</head><body><h1>Table:${table.name}</h1>`);
        printWindow.document.write(printContent.innerHTML);

        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
      }
    }
    return toast.error("At this time, can't do this action!");
  };
  // if (!orderTables || orderTables.length === 0) return null;
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            flexWrap: "wrap",
            bgcolor: "transparent",
          }}
        >
          <StyledToggleButtonGroup
            size="small"
            color="primary"
            value={status}
            exclusive
            onChange={(evt, value) => {
              setStatus(value);
            }}
            sx={{ margin: "0px" }}
          >
            <ToggleButton value={ORDERSTATUS.PENDING}>
              <Box sx={{ color: "#FF5F00", fontWeight: "bold" }}>
                {ORDERSTATUS.PENDING}
              </Box>
            </ToggleButton>
            <ToggleButton value={ORDERSTATUS.COOKING}>
              <Box sx={{ color: "#C73659", fontWeight: "bold" }}>
                {ORDERSTATUS.COOKING}
              </Box>
            </ToggleButton>
            <ToggleButton value={ORDERSTATUS.SEND}>
              <Box sx={{ color: "#0A6847", fontWeight: "bold" }}>
                {ORDERSTATUS.SEND}
              </Box>
            </ToggleButton>
            <ToggleButton value={ORDERSTATUS.COMPLETE}>
              <Box sx={{ color: "#87A922", fontWeight: "bold" }}>
                {ORDERSTATUS.COMPLETE}
              </Box>
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Paper>
      </Box>
      {!orderTables || orderTables.length === 0 ? null : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {orderTables.map((item) => {
            const foundedOrders = filterOrders.filter(
              (order) => order.tableId === item.id
            );
            return (
              <OrderCard
                id={item.id}
                key={item.id}
                addons={addons}
                menus={menus}
                handleOrderStatuUpdate={handleOrderStatuUpdate}
                foundedOrders={foundedOrders}
                table={item}
                orderDate={orderDate}
                status={status}
                printPrice={printPrice}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default OrdersPage;
