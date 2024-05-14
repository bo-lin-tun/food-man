import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { format } from "date-fns";
import React from "react";
import { Addon, Menu, ORDERSTATUS, Order, Table } from "@prisma/client";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { config } from "@/utils/config";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hooks";
import { removeOrders } from "@/store/slices/orderSlice";

type ORDERUPDATETYPE = {
  itemId: string;
  status: ORDERSTATUS;
};

const DATE_FORMAT = "yyyy-MM-dd HH:mm";

interface OrderCardProps {
  id: string;
  table: Table;
  orderDate?: Order;
  foundedOrders: Order[];
  menus: Menu[];
  addons: Addon[];
  handleOrderStatuUpdate: ({ itemId, status }: ORDERUPDATETYPE) => void;
  status?: ORDERSTATUS;
  printPrice: ({ id }: { id: string }) => void;
}

const OrderCard = ({
  id,
  table,
  orderDate,
  foundedOrders,
  menus,
  addons,
  handleOrderStatuUpdate,
  status,
  printPrice,
}: OrderCardProps) => {
  const dispatch = useAppDispatch();

  const totalPrice = foundedOrders.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0
  );

  const handleUpdateComplete = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foundedOrders),
    });
    const data = await response.json();
    if (!response.ok) {
      return toast.error(data.message);
    }
    dispatch(removeOrders(foundedOrders));
  };
  return (
    <Card sx={{ bgcolor: "transparent" }}>
      <Accordion sx={{ bgcolor: "transparent" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box sx={{ width: "80%" }}>{table.name}</Box>
          <Box sx={{ width: "20%" }}>
            OrderDate :{" "}
            {format(new Date(orderDate?.createdAt as Date), DATE_FORMAT)}
          </Box>
        </AccordionSummary>
        <AccordionDetails id={id}>
          {foundedOrders.map((order, index) => {
            const foundedMenu = menus.find((menu) => menu.id === order.menuId);
            const foundedAddons = addons.filter(
              (addon) => addon.id === order.addonId
            );
            return (
              <div key={order.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>{index + 1}. </Box>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      ml: 2,
                      my: 1,
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        flex: "6 1 45%",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Image
                          src={foundedMenu?.assetUrl || ""}
                          alt="menu/img"
                          width={800}
                          height={800}
                          style={{
                            width: "36px",
                            height: "36px",
                          }}
                        />
                      </Box>
                      <Box sx={{ fontWeight: "bold" }}>{foundedMenu?.name}</Box>
                      <Box> x {order.quantity}</Box>
                    </Box>
                    <Box sx={{ flex: "2 1 45%", fontSize: "15px" }}>
                      {foundedAddons[0].name}
                    </Box>
                    <Box sx={{ flex: "1 1 10%" }}>
                      {status === "COMPLETE" ? (
                        <Box>{order.totalPrice} ks</Box>
                      ) : (
                        <Select
                          value={order.status}
                          onChange={(e) => {
                            handleOrderStatuUpdate &&
                              handleOrderStatuUpdate({
                                itemId: order.id,
                                status: e.target.value as ORDERSTATUS,
                              });
                          }}
                          sx={{
                            width: "100%",
                            padding: 0,
                            height: "2.4rem",
                            bgcolor: "transparent",
                          }}
                        >
                          <MenuItem value={ORDERSTATUS.PENDING}>
                            {ORDERSTATUS.PENDING}
                          </MenuItem>
                          <MenuItem value={ORDERSTATUS.COOKING}>
                            {ORDERSTATUS.COOKING}
                          </MenuItem>
                          <MenuItem value={ORDERSTATUS.SEND}>
                            {ORDERSTATUS.SEND}
                          </MenuItem>
                          <MenuItem value={ORDERSTATUS.COMPLETE}>
                            {ORDERSTATUS.COMPLETE}
                          </MenuItem>
                        </Select>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Divider />
              </div>
            );
          })}
        </AccordionDetails>
        {status === "COMPLETE" && (
          <Box sx={{ px: 2, pb: 2 }}>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  flex: "2 1 90%",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                TotalPrice
              </Box>
              <Box sx={{ flex: "1 1 10%" }}>
                <span style={{ fontWeight: "bold" }}>{totalPrice}</span> ks
              </Box>
            </Box>
            <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
              <Box sx={{ flex: "2 1 80%" }}></Box>
              <Box sx={{ flex: "1 1 20%", display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => printPrice({ id: id })}
                >
                  Print
                </Button>
                <Button variant="contained" onClick={handleUpdateComplete}>
                  Complete
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Accordion>
    </Card>
  );
};

export default OrderCard;
