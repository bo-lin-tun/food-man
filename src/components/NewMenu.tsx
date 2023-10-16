import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewMenu = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create new menu</DialogTitle>
      <DialogContent>
        <h1>New menu form...</h1>
      </DialogContent>
    </Dialog>
  );
};

export default NewMenu;