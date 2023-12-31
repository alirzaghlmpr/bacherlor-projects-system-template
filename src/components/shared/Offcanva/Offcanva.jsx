import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import ListItem from "@mui/material/ListItem";

import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export const Offcanva = ({ menu }) => {
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        sx={{ ...(open && { display: "none" }) }}>
        <MenuIcon />
      </IconButton>
      <Drawer
        sx={{
          flexShrink: 0,
        }}
        variant="persistent"
        anchor="right"
        open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className="flex flex-col gap-6 px-3 py-3">
          {menu.map(({ id, text, to }) => (
            <Link
              className={`cursor-pointer py-1 px-3 ${
                to === pathname ? "bg-slate-500 text-slate-50 rounded-lg" : ""
              }`}
              sx={{ padding: "15px 15px 0 50px" }}
              to={to}
              key={id}>
              {text}
            </Link>
          ))}
        </div>
      </Drawer>
    </Box>
  );
};

export default Offcanva;
