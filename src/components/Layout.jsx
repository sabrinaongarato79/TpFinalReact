import { Button, List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  selectUser,
  setPendingCartActualization,
} from "../features/generalSlice";
import services from "../services";
import { Header } from "./Header";

export function Layout({ children }) {
  const [openCart, setOpenCart] = useState(false);
  const cart = useSelector(selectCart);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    let result = 0;

    cart.forEach((item) => {
      const value = Number(item.productsInCart?.quantity) * Number(item.price);
      result += value;
    });

    setTotal(result);
  }, [cart]);

  return (
    <>
      <Header setOpenCart={setOpenCart} />

      <main style={{ marginTop: 80, display: "flex" }}>
        {/* Hero unit */}
        <div
          style={{
            maxWidth: 360,
            width: openCart ? "100%" : "0%",
            transition: "width 1s",
          }}
        >
          <List
            sx={{
              top: 10,
              position: "fixed",
              width: openCart ? "100%" : "0%",
              height: "100vh",
              maxWidth: 360,
              backgroundColor: "#121212",
              transition: "width 1s",
              padding: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {openCart && (
              <>
                <div
                  style={{
                    flexBasis: "80%",
                    overflowY: "scroll",
                    paddingRight: 10,
                    paddingLeft: 10,
                    gap: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {cart.map((value) => (
                    <ListItem
                      sx={{
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                      key={value}
                      disableGutters
                      secondaryAction={
                        <p style={{ padding: 0, paddingTop: 30 }}>
                          Cantidad: {value.productsInCart?.quantity}
                        </p>
                      }
                    >
                      <ListItemText primary={value.title} />
                      <small style={{ padding: 0 }}>${value.price}</small>
                    </ListItem>
                  ))}
                </div>

                <div
                  style={{
                    width: "100%",
                    backgroundColor: "gray",
                    height: 2,
                    marginTop: 20,
                  }}
                />

                <p style={{ color: "white" }}>Total: ${total}</p>

                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    flexBasis: "8%",
                    marginBottom: 5,
                  }}
                  variant="contained"
                  size="large"
                  onClick={() =>
                    services
                      .buyCart(user.token)
                      .then((res) => {
                        if (res.status === "fail") throw new Error(res.message);

                        dispatch(setPendingCartActualization(true));
                        return alert("Compra realizada");
                      })
                      .catch((err) => {
                        console.log(err);
                        alert("Error al comprar");
                      })
                  }
                >
                  Comprar carrito
                </Button>
              </>
            )}
          </List>
        </div>

        {children}
      </main>
    </>
  );
}
