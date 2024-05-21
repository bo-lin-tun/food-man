import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { format} from "date-fns";

import React from "react";
import { Addon, Menu, ORDERSTATUS, Order, Table } from "@prisma/client";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { config } from "@/utils/config";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeOrders } from "@/store/slices/orderSlice";
import { OrderItem } from "@/types/order";

type ORDERUPDATETYPE = {
  itemId: string;
  status: ORDERSTATUS;
};

const DATE_FORMAT = "yyyy-MM-dd  HH:mm";

interface OrderCardProps {
  id: string;
  table: Table;
  orderDate?: Order;
  foundedOrders: Order[];
  menus: Menu[];
  addons: Addon[];
  orderItem?: OrderItem;
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
  orderItem,
  handleOrderStatuUpdate,
  status,
  printPrice,
}: OrderCardProps) => {
  const dispatch = useAppDispatch();

  const addon = useAppSelector((state) => state.addon.items);

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

  // console.log("foundedOrders", JSON.stringify(foundedOrders));
  const mergedOrders = foundedOrders.reduce((acc: Order[], order) => {
    const existingOrder = acc.find(
      (o) => o.orderSeq === order.orderSeq && order.itemId === o.itemId
    );
    if (existingOrder) {
    } else {
      acc.push({ ...order }); // Add a copy of the order to the accumulator
    }
    return acc;
  }, []);

  // const showOrderBySeqId = foundedOrders.filter()
  const totalPrice = mergedOrders[0].totalPrice;

  return (
    <Card sx={{ bgcolor: "transparent" }}>
      <Accordion sx={{ bgcolor: "transparent" }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box sx={{ width: "80%" }}>{table.name}</Box>
          <Box sx={{ width: "20%" }}>
            OrderDate :{" "}
            {orderDate && orderDate.createdAt && format(new Date(orderDate?.createdAt as Date), DATE_FORMAT)}
          </Box>
        </AccordionSummary>{" "}
        <div id={id}>
          {mergedOrders.map((order, index) => {
            const foundedMenu = menus.find((menu) => menu.id === order.menuId);

            const menuPrice = foundedMenu?.price;

            const orederSeq = order.orderSeq;
            const addonIds = foundedOrders
              .filter(
                (fo) => fo.orderSeq === orederSeq && fo.itemId === order.itemId
              )
              .map((o) => o.addonId);

            const foundedAddons = addons.filter((addon) =>
              addonIds.includes(addon.id)
            );
            const addonPrice = foundedAddons
              .map((f) => f.price)
              .reduce((a, b) => {
                return (a += b);
              }, 0);
            return (
              <AccordionDetails key={order.id}>
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
                          src={foundedMenu?.assetUrl || "/default-menu.png"}
                          alt="menu/img"
                          width={800}
                          className="removePrintImage"
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
                      {foundedAddons.map((fa, idx) => (
                        <div key={fa.id}>
                          {idx + 1} : {fa.name} - {fa.price}ks
                        </div>
                      ))}

                      {/* ! fix  */}
                    </Box>

                    <Box sx={{ flex: "1 1 10%" }}>
                      {status === "COMPLETE" ? (
                        // <Box> {menuPrice && menuPrice * order.quantity} kss</Box>
                        <Box> {order.totalPrice} ks</Box>
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
                            <Box sx={{ color: "#FF5F00", fontWeight: "bold" }}>
                              {ORDERSTATUS.PENDING}
                            </Box>
                          </MenuItem>
                          <MenuItem value={ORDERSTATUS.COOKING}>
                            <Box sx={{ color: "#C73659", fontWeight: "bold" }}>
                              {ORDERSTATUS.COOKING}
                            </Box>
                          </MenuItem>
                          <MenuItem value={ORDERSTATUS.SEND}>
                            <Box sx={{ color: "#0A6847", fontWeight: "bold" }}>
                              {ORDERSTATUS.SEND}
                            </Box>
                          </MenuItem>
                          <MenuItem value={ORDERSTATUS.COMPLETE}>
                            <Box sx={{ color: "#87A922", fontWeight: "bold" }}>
                              {ORDERSTATUS.COMPLETE}
                            </Box>
                          </MenuItem>
                        </Select>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Divider />
              </AccordionDetails>
            );
          })}
        </div>
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
