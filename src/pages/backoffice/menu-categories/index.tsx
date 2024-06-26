import ItemCard from "@/components/ItemCard";
import NewMenuCategory from "@/components/NewMenuCategory";
import { useAppSelector } from "@/store/hooks";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const MenuCategoriesPage = () => {
  const [open, setOpen] = useState(false);
  const menuCategories = useAppSelector((state) => state.menuCategory.items);
  const disabledLocationMenuCategories = useAppSelector(
    (state) => state.disabledLocationMenuCategory.items
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New menu category
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        {menuCategories.map((item) => {
          const exist = disabledLocationMenuCategories.find(
            (disabledLocationMenuCategory) =>
              disabledLocationMenuCategory.locationId ===
                (localStorage.getItem("selectedLocationId")) &&
              disabledLocationMenuCategory.menuCategoryId === item.id
          );
          const isAvailable = exist ? false : true;
          return (
            <ItemCard
              icon={<CategoryIcon fontSize="large" />}
              href={`/backoffice/menu-categories/${item.id}`}
              key={item.id}
              title={item.name}
              isAvailable={isAvailable}
            />
          );
        })}
      </Box>
      <NewMenuCategory open={open} setOpen={setOpen} />
    </Box>
  );
};

export default MenuCategoriesPage;
