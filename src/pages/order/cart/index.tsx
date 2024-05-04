import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { emptyCart, removeFromCart } from "@/store/slices/cartSlice";
import { createOrder } from "@/store/slices/orderSlice";
import { CartItem } from "@/types/cart";
import { getCartTotalPrice } from "@/utils/generals";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { Addon, Order } from "@prisma/client";
import { useRouter } from "next/router";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const router = useRouter();
  const tableId = router.query.tableId as string;
  const dispatch = useAppDispatch();

  const renderAddons = (addons: Addon[]) => {
    if (!addons.length) return;
    return addons.map((item) => {
      return (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color={"primary"} sx={{ fontStyle: "italic" }}>
            {item.name}
          </Typography>
          <Typography color={"primary"} sx={{ fontStyle: "italic" }}>
            {item.price}
          </Typography>
        </Box>
      );
    });
  };

  const handleRemoveFromCart = (cartItem: CartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const confirmOrder = async () => {
    const isValid = tableId as string;
    if (!isValid) return alert("Table Id");
    dispatch(
      createOrder({
        tableId,
        cartItems,
        onSuccess: (orders: Order[]) => {
          dispatch(emptyCart());
          router.push({
            pathname: `/order/active-order/${orders[0].orderSeq}`,
            query: { tableId },
          });
        },
      })
    );
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          position: "relative",
          top: { md: -180, lg: -240 },
          textAlign: "center",
          fontSize: { md: "2em", lg: "2.5em", xs: "1.4em" },
          marginTop: { md: -0.7, sm: 3.5, xs: 3.5 },
          marginBottom: { md: -0.7, sm: 3.5, xs: 3.5 },
        }}
      >
        မှာယူရန် ရွေးထားသောစာရင်း
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 3,
          bgcolor: "#E8F6EF",
          borderRadius: 15,
          position: "relative",
          top: { md: -100 },
        }}
      >
        {!cartItems.length ? (
          <Typography sx={{ fontSize: "1.15em", marginTop: 15 }}>
            မရှိသေးပါ။
          </Typography>
        ) : (
          <Box
            sx={{
              width: { xs: "100%", md: "500px" },
            }}
          >
            {cartItems.map((cartItem) => {
              const { menu, addons, quantity } = cartItem;
              return (
                <Box key={cartItem.id}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{
                        width: 25,
                        height: 25,
                        mr: 1,
                        backgroundColor: "#1B9C85",
                      }}
                    >
                      {quantity}
                    </Avatar>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography color={"primary"}>{menu.name}</Typography>
                      <Typography color={"primary"}>{menu.price}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pl: 6 }}>{renderAddons(addons)}</Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mb: 3,
                      mt: 1,
                    }}
                  >
                    <DeleteIcon
                      color="primary"
                      sx={{ mr: 2, cursor: "pointer" }}
                      onClick={() => handleRemoveFromCart(cartItem)}
                    />
                    <EditIcon
                      color="primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        router.push({
                          pathname: `menus/${menu.id}`,
                          query: { ...router.query, cartItemId: cartItem.id },
                        })
                      }
                    />
                  </Box>
                </Box>
              );
            })}
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontSize: { sm: 22 } }}
              >
                ကျသင့်ငွေ : {getCartTotalPrice(cartItems)}
              </Typography>
            </Box>
            <Box sx={{ mt: 3, textAlign: "center" }} onClick={confirmOrder}>
              <Button variant="contained">မှာယူရန် သေချာပါသည်</Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Cart;
