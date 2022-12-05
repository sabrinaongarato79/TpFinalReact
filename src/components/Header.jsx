import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import AppBar from "@mui/material/AppBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Toolbar from "@mui/material/Toolbar";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/generalSlice";

export function Header({ setOpenCart }) {
  const user = useSelector(selectUser);

  return (
    <AppBar sx={{ backgroundColor: "#121212" }} component="nav">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">
          <BottomNavigationAction
            sx={{ color: "#B8B8B8" }}
            label="Compras"
            icon={<HomeIcon />}
          />
        </Link>

        <BottomNavigation sx={{ backgroundColor: "#121212" }}>
          <BottomNavigationAction
            sx={{ color: "#B8B8B8" }}
            label="Carrito"
            icon={<ShoppingCartIcon />}
            onClick={() => setOpenCart((prevState) => !prevState)}
          />

          <Link to="/purchases">
            <BottomNavigationAction
              sx={{ color: "#B8B8B8" }}
              label="Compras"
              icon={<InventoryIcon />}
            />
          </Link>

          <Link to="/login">
            <BottomNavigationAction
              sx={{ color: "#B8B8B8" }}
              label="Login"
              icon={<LoginIcon />}
            />
          </Link>
        </BottomNavigation>

        <p style={{ color: "white" }}>
          {user.info.firstName
            ? `Logueado como ${user.info.firstName}`
            : "Anónimo"}
        </p>
      </Toolbar>
    </AppBar>
  );
}
