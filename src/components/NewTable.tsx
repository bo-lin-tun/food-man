import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewTable = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create new table</DialogTitle>
      <DialogContent>
        <h1>New table form...</h1>
      </DialogContent>
    </Dialog>
  );
};

export default NewTable;
