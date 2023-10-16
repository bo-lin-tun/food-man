import NewAddon from "@/components/NewAddon";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const AddonsPage = () => {
  const [open, setOpen] = useState(false);
  const addons = useAppSelector((state) => state.addon.items);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New addon
        </Button>
      </Box>
      {addons.map((item) => (
        <Typography key={item.id}>{item.name}</Typography>
      ))}
      <NewAddon open={open} setOpen={setOpen} />
    </Box>
  );
};

export default AddonsPage;
