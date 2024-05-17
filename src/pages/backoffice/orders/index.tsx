import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addOrders, updateOrder } from "@/store/slices/orderSlice";
import { Box, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ORDERSTATUS, Order, Table } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { toggleButtonGroupClasses } from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import { socket } from "@/utils/socket";
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
  const [printId, setPrintId] = useState<string>("");
  const orders = useAppSelector((state) => state.order.items);
  const addons = useAppSelector((state) => state.addon.items);
  const menus = useAppSelector((state) => state.menu.items);
  const tables = useAppSelector((state) => state.table.items);

  const orderTableIds = filterOrders.map(
    (item) => item.tableId && item.tableId
  );
  const orderTables = tables.filter((item) => orderTableIds.includes(item.id));
  const orderDate = filterOrders.find((item) => item.tableId === tables[0].id);
  console.log("orderTables", orderTables);
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
    if (orders.length) {
      const filterOrders = orders.filter((item) => item.status === status);
      setFilterOrders(filterOrders);
    }
  }, [orders, status]);

  // useEffect(() => {
  //   socket.on(
  //     "new_order",
  //     ({ orders, table }: { orders: Order[]; table: Table }) => {
  //       dispatch(addOrders(orders));
  //       toast.success(`New order from ${table.name}`);
  //     }
  //   );

  //   return () => {
  //     socket.off("new_order");
  //   };
  // }, []);

  const printPrice = ({ id }: { id: string }) => {
    if (!id) return;
    const printContent = document.getElementById(`${id}`);
    if (printContent) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`<html><head><title>Print</title>`);
        printWindow.document.write("</head><body>");
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
      }
    }
    return toast.error("At this time, can't do this action!");
  };

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
              {ORDERSTATUS.PENDING}
            </ToggleButton>
            <ToggleButton value={ORDERSTATUS.COOKING}>
              {ORDERSTATUS.COOKING}
            </ToggleButton>
            <ToggleButton value={ORDERSTATUS.SEND}>
              {ORDERSTATUS.SEND}
            </ToggleButton>
            <ToggleButton value={ORDERSTATUS.COMPLETE}>
              {ORDERSTATUS.COMPLETE}
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Paper>
      </Box>
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
    </Box>
  );
};

export default OrdersPage;
