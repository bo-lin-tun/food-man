import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPrimaryColor } from "@/store/slices/appSlice";
import { config } from "@/utils/config";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

const ThemeChanger = () => {
  const [color, setColor] = useState("#aabbcc");
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const handleShow = () => {
    setShow(!show);
  };

  const handleSubmit = () => {
    if (window && color) {
      window.localStorage.setItem("primaryColor", color);
      console.log({ color });
      dispatch(setPrimaryColor);
      //!
      fetch(`${config.backofficeApiUrl}/theme?theme=${color.slice(1)}`).catch(
        (err) => console.log({ err })
      );

      window.location.reload();
    }
  };

  return (
    <Box sx={{ width: "100%", mt: 10, height: 300, bgcolor: "wheat" }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ bgcolor: color }}
        onClick={handleShow}
      >
        {color}
      </Button>
      <Button onClick={handleSubmit}>set color</Button>
      <ShowPicker color={color} setColor={setColor} show={show} />
    </Box>
  );
};

export default ThemeChanger;

interface ShowPickerProps {
  color: string;
  show: boolean;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}
export const ShowPicker = ({ color, setColor, show }: ShowPickerProps) => {
  if (!show) return null;
  return <HexColorPicker color={color} onChange={setColor} />;
};
