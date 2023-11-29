import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTheme } from "@/store/slices/appSlice";
import { updateCompany } from "@/store/slices/companySlice";
import { UpdateCompanyOptions } from "@/types/company";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

const SettingsPage = () => {
  const { theme } = useAppSelector((state) => state.app);
  const comapny = useAppSelector((state) => state.company.item);
  const [data, setData] = useState<UpdateCompanyOptions>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (comapny) {
      setData({
        id: comapny.id,
        name: comapny.name,
        street: comapny.street,
        township: comapny.township,
        city: comapny.city,
      });
    }
  }, [comapny]);

  if (!comapny || !data) return null;

  const handleUpdateCompany = () => {
    dispatch(updateCompany(data));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={theme === "dark"}
              onChange={(evt, value) => {
                const theme = value ? "dark" : "light";
                dispatch(setTheme(theme));
                localStorage.setItem("theme", theme);
              }}
            />
          }
          label="Use dark mode"
        />
      </Box>
      <TextField
        defaultValue={data.name}
        sx={{ mb: 2 }}
        onChange={(evt) =>
          setData({ ...data, id: comapny.id, name: evt.target.value })
        }
      />
      <TextField
        defaultValue={data.street}
        sx={{ mb: 2 }}
        onChange={(evt) =>
          setData({ ...data, id: comapny.id, street: evt.target.value })
        }
      />
      <TextField
        defaultValue={data.township}
        sx={{ mb: 2 }}
        onChange={(evt) =>
          setData({ ...data, id: comapny.id, township: evt.target.value })
        }
      />
      <TextField
        defaultValue={data.city}
        sx={{ mb: 2 }}
        onChange={(evt) =>
          setData({ ...data, id: comapny.id, city: evt.target.value })
        }
      />
      <Button
        variant="contained"
        sx={{ mt: 2, width: "fit-content" }}
        onClick={handleUpdateCompany}
      >
        Update
      </Button>
    </Box>
  );
};

export default SettingsPage;
