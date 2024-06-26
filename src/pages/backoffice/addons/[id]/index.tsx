import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteAddon, updateAddon } from "@/store/slices/addonSlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { UpdateAddonOptions } from "@/types/addon";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AddonCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonDetail = () => {
  const router = useRouter();
  const addonId = router.query.id;
  const addons = useAppSelector((state) => state.addon.items);
  const addonCategories = useAppSelector((state) => state.addonCategory.items);
  const addon = addons.find((item) => item.id === addonId);
  const [data, setData] = useState<UpdateAddonOptions>();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (addon) {
      setData({
        id: addon.id,
        name: addon.name,
        price: addon.price,
        addonCategoryId: addon.addonCategoryId,
      });
    }
  }, [addon]);

  if (!addon || !data) return null;

  const handleOnChange = (evt: SelectChangeEvent<string>) => {
    const selectedId = evt.target.value as string;
    setData({ ...data, id: addon.id, addonCategoryId: selectedId });
  };

  const handleUpdateAddon = () => {
    dispatch(
      updateAddon({
        ...data,
        onSuccess: () => {
          router.push("/backoffice/addons");
          dispatch(setOpenSnackbar({ message: "Updated addon successfully." }));
        },
      })
    );
  };

  const handleDeleteAddon = () => {
    dispatch(
      deleteAddon({
        id: addon.id,
        onSuccess: () => {
          dispatch(setOpenSnackbar({ message: "Deleted addon successfully." }));
          router.push("/backoffice/addons");
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
        placeholder="Name"
        label="Name"
        defaultValue={data.name}
        sx={{ mb: 2, width: 400 }}
        onChange={(evt) =>
          setData({ ...data, id: addon.id, name: evt.target.value })
        }
      />
      <TextField
        placeholder="Price"
        label="Price"
        defaultValue={data.price}
        sx={{ mb: 2, type: "number", width: 400 }}
        onChange={(evt) =>
          setData({ ...data, id: addon.id, price: Number(evt.target.value) })
        }
      />
      <FormControl fullWidth>
        <InputLabel>Addon Category</InputLabel>
        <Select
          value={data.addonCategoryId as string | undefined}
          label="Addon Category"
          sx={{ width: 400 }}
          onChange={handleOnChange}
          renderValue={(selectedAddonCategoryId) => {
            return (
              addonCategories.find(
                (item) => item.id === selectedAddonCategoryId
              ) as AddonCategory
            ).name;
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
          {addonCategories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        sx={{ mt: 2, width: "fit-content" }}
        onClick={handleUpdateAddon}
      >
        Update
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm delete addon</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this addon?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDeleteAddon}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddonDetail;
