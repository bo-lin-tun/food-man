import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteAddonCategory,
  updateAddonCategory,
} from "@/store/slices/addonCategorySlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { UpdateAddonCategoryOptions } from "@/types/addonCategory";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonCategoryDetail = () => {
  const router = useRouter();
  const addonCategoryId = Number(router.query.id);
  const addonCategories = useAppSelector((state) => state.addonCategory.items);
  const menuAddonCategories = useAppSelector(
    (state) => state.menuAddonCategory.items
  );
  const menus = useAppSelector((state) => state.menu.items);
  const addonCategory = addonCategories.find(
    (item) => item.id === addonCategoryId
  );
  const currentMenuAddonCategories = menuAddonCategories.filter(
    (item) => item.addonCategoryId === addonCategoryId
  );
  const menuIds = currentMenuAddonCategories.map((item) => item.menuId);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<UpdateAddonCategoryOptions>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (addonCategory) {
      setData({ ...addonCategory, menuIds });
    }
  }, [addonCategory]);

  if (!addonCategory || !data) return null;

  const handleUpdateAddonCategory = () => {
    const isValid = data.name && data.menuIds.length > 0;
    if (!isValid) return;
    dispatch(
      updateAddonCategory({
        ...data,
        onSuccess: () =>
          dispatch(setOpenSnackbar({ message: "Updated menu successfully." })),
      })
    );
  };

  const handleOnChange = (evt: SelectChangeEvent<number[]>) => {
    const selectedIds = evt.target.value as number[];
    setData({ ...data, id: addonCategoryId, menuIds: selectedIds });
  };

  const handleDeleteAddonCategory = () => {
    dispatch(
      deleteAddonCategory({
        id: addonCategoryId,
        onSuccess: () => {
          dispatch(
            setOpenSnackbar({ message: "Deleted addon category successfully." })
          );
          router.push("/backoffice/addon-categories");
        },
      })
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </Box>
      <TextField
        defaultValue={addonCategory.name}
        sx={{ mb: 2 }}
        onChange={(evt) => setData({ ...data, name: evt.target.value })}
      />
      <FormControl fullWidth sx={{ my: 1 }}>
        <InputLabel>Menus</InputLabel>
        <Select
          multiple
          value={data.menuIds}
          label="Menus"
          onChange={handleOnChange}
          renderValue={(selectedMenuIds) => {
            return selectedMenuIds
              .map((selectedMenuId) => {
                return menus.find((item) => item.id === selectedMenuId) as Menu;
              })
              .map((item) => (
                <Chip key={item.id} label={item.name} sx={{ mr: 1 }} />
              ));
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            },
          }}
        >
          {menus.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={data.menuIds.includes(item.id)} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={addonCategory.isRequired}
            onChange={(evt, value) => setData({ ...data, isRequired: value })}
          />
        }
        label="Required"
        sx={{ mb: 4 }}
      />
      <Button
        variant="contained"
        sx={{ width: "fit-content" }}
        onClick={handleUpdateAddonCategory}
      >
        Update
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm delete addon category</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this addon category?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDeleteAddonCategory}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddonCategoryDetail;
