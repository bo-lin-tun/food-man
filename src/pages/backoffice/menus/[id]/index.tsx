/* import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenu } from "@/store/slices/menuSlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { UpdateMenuOptions } from "@/types/menu";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuDetail = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const menus = useAppSelector((state) => state.menu.items);
  const dispatch = useAppDispatch();
  const menuCategoryMenus = useAppSelector(
    (state) => state.menuCategoryMenu.items
  );
  const menuCategories = useAppSelector((state) => state.menuCategory.items);
  const menu = menus.find((item) => item.id === id);
  const menuCategoryMenu = menuCategoryMenus.filter(
    (item) => item.menuId === menu?.id
  );
  const menuCategoryIds = menuCategoryMenu.map((item) => item.menuCategoryId);
  const [data, setData] = useState<UpdateMenuOptions>();

  useEffect(() => {
    if (menu) {
      setData({
        id: menu.id,
        name: menu.name,
        price: menu.price,
        menuCategoryIds: menuCategoryIds,
      });
    }
  }, [menu]);

  if (!menu) return null;

  const handleUpdateMenu = () => {
    data &&
      dispatch(
        updateMenu({
          ...data,
          onSuccess: () =>
            dispatch(setOpenSnackbar({ message: "Menu updated" })),
        })
      );
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button variant="outlined" color="error">
            Delete
          </Button>
        </Box>
        <TextField
          defaultValue={menu.name}
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setData({
              ...data,
              id: menu.id,
              name: evt.target.value,
            })
          }
        />
        <TextField
          defaultValue={menu.price}
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setData({
              ...data,
              id: menu.id,
              price: Number(evt.target.value),
            })
          }
        />
        <FormControl>
          <InputLabel>Menu Category</InputLabel>
          <Select
            multiple
            value={data ? data.menuCategoryIds : []}
            input={<OutlinedInput label="Menu Category" />}
            onChange={(evt) => {
              const menuCategoryIds = evt.target.value as number[];
              setData({
                ...data,
                id: menu.id,
                menuCategoryIds,
              });
            }}
            renderValue={(selected) => {
              const names = selected.map((selectedId) => {
                const menuCategory = menuCategories.find(
                  (item) => item.id === selectedId
                ) as MenuCategory;
                return menuCategory;
              });
              return names.length > 1
                ? names.map((item) => item.name).join(", ")
                : names[0].name;
            }}
          >
            {menuCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={data?.menuCategoryIds?.includes(item.id)} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ width: "fit-content", mt: 3 }}
          onClick={handleUpdateMenu}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default MenuDetail;
 */

import { useRouter } from "next/router";

const UpdateMenuPage = () => {
  const router = useRouter();
  const menuId = router.query.id;
  console.log("MenuId: ", menuId);
  return <h1>Update Menu Page: {menuId}</h1>;
};

export default UpdateMenuPage;
