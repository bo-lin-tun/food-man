import { useAppSelector } from "@/store/hooks";
import { OrderItem } from "@/types/order";
import { Box, Card, Menu, MenuItem, Select, Typography } from "@mui/material";
import { AddonCategory, ORDERSTATUS, Order } from "@prisma/client";
import Image from "next/image";

interface Props {
  orderItem: OrderItem;
  isAdmin: boolean;

  handleOrderStatuUpdate?: (itemId: string, status: ORDERSTATUS) => void;
}

const OrderCard = ({ orderItem, isAdmin, handleOrderStatuUpdate }: Props) => {
  const addonCategories = useAppSelector((state) => state.addonCategory.items);
  const orders = useAppSelector((state) => state.order.items);

  const quantity = orders.find((item) => {
    return item.itemId === orderItem.itemId;
  });
  const { theme } = useAppSelector((state) => state.app);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: 450,
        height: 275,
        mt: 2,
        mr: 2,
      }}
    >
      <Box
        sx={{
          height: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: theme === "light" ? "secondary.main" : "primary.dark",
          color: "white",
          px: 1,
          py: 1,
        }}
      >
        <Typography>{orderItem.menu.name}</Typography>
        <Typography>{orderItem.table?.name || "yellow"}</Typography>
      </Box>
      <Box sx={{ px: 2 }}>
        <Box
          sx={{
            height: 250 * 0.15,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid lightgray",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", p: 0.4, color: "red", fontSize: "1.5em" }}
          >
            {quantity?.quantity}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            MMK {orderItem.menu.price}
          </Typography>
          <Image
            src={orderItem.menu.assetUrl || "/default-menu.png"}
            alt="menu-image"
            width={120}
            height={120}
            style={{ marginTop: 170, marginRight: 40 }}
          />
        </Box>
        <Box sx={{ height: 250 * 0.6, overflow: "scroll" }}>
          {orderItem.orderAddons.length > 0 ? (
            orderItem.orderAddons.map((orderAddon) => {
              const addonCategory = addonCategories.find(
                (item) => item.id === orderAddon.addonCategoryId
              ) as AddonCategory;
              return (
                <Box key={addonCategory.id} sx={{ mb: 2 }}>
                  <Typography>{addonCategory.name}</Typography>
                  {orderAddon.addons.map((addon) => {
                    return (
                      <Typography
                        key={addon.id}
                        sx={{
                          fontSize: 14,
                          ml: 2,
                          fontStyle: "italic",
                          fontWeight: "bold",
                        }}
                      >
                        {addon.name}
                      </Typography>
                    );
                  })}
                </Box>
              );
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography>No addon</Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            height: 250 * 0.23,
            borderTop: "1px solid lightgray",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Status: </Typography>
          {isAdmin ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Select
                value={orderItem.status}
                onChange={(evt) =>
                  handleOrderStatuUpdate &&
                  handleOrderStatuUpdate(
                    orderItem.itemId,
                    evt.target.value as ORDERSTATUS
                  )
                }
                sx={{ maxHeight: 30 }}
              >
                <MenuItem value={ORDERSTATUS.PENDING}>
                  {ORDERSTATUS.PENDING}
                </MenuItem>
                <MenuItem value={ORDERSTATUS.COOKING}>
                  {ORDERSTATUS.COOKING}
                </MenuItem>
                <MenuItem value={ORDERSTATUS.COMPLETE}>
                  {ORDERSTATUS.COMPLETE}
                </MenuItem>
              </Select>
            </Box>
          ) : (
            <Typography>{orderItem.status}</Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default OrderCard;
