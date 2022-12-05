import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CustomCard as Card } from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, selectUser } from "../features/generalSlice";
import { IconButton, TextField } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import {
  changeSearchProductText,
  selectSearchProductText,
  selectCategories,
  fetchProducts,
  fetchCart,
  selectPendingCartActualization,
  setPendingCartActualization,
} from "../features/generalSlice";
import { Layout } from "../components/Layout";

const theme = createTheme();

export default function Home() {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(selectProducts);
  const selectedSearchProductText = useSelector(selectSearchProductText);
  const selectedCategories = useSelector(selectCategories);
  const user = useSelector(selectUser);
  const pendingCartAct = useSelector(selectPendingCartActualization);

  useEffect(() => {
    dispatch(fetchCart(user.token));

    if (pendingCartAct) dispatch(setPendingCartActualization(false));
  }, [user, dispatch, pendingCartAct]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Layout>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                E-commerce
              </Typography>

              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                Los mejores productos a tu alcance.
              </Typography>

              <TextField
                fullWidth
                id="search-bar"
                className="text"
                onInput={(e) => {
                  dispatch(changeSearchProductText(e.target.value));
                }}
                label="Busca un producto"
                variant="outlined"
                placeholder="Nombre del producto a buscar"
                size="small"
                InputProps={{
                  endAdornment: (
                    <IconButton type="submit" aria-label="search">
                      <SearchOutlined style={{ fill: "blue" }} />
                    </IconButton>
                  ),
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: 20,
                }}
              >
                <h3>O busca por categoría:</h3>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <li>
                    <Button
                      onClick={() => dispatch(fetchProducts())}
                      variant="contained"
                    >
                      Todas
                    </Button>
                  </li>

                  {selectedCategories.data.map((category) => (
                    <li>
                      <Button
                        onClick={() => dispatch(fetchProducts(category.id))}
                        variant="contained"
                      >
                        {category.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </Box>
          <Container
            sx={{
              py: 8,
            }}
            maxWidth="md"
          >
            {/* End hero unit */}
            {selectedProducts.isLoading ? (
              <p style={{ textAlign: "center" }}>Cargando productos...</p>
            ) : selectedProducts.fetchError ? (
              <p>Error al cargar los productos :(</p>
            ) : (
              <>
                <Grid container spacing={4}>
                  {selectedProducts.data
                    .filter((product) =>
                      selectedSearchProductText
                        ? new RegExp(selectedSearchProductText, "i").test(
                            product.title
                          )
                        : true
                    )
                    .map((product) => (
                      <Grid item key={product} xs={12} sm={6} md={4}>
                        <Card
                          title={product.title}
                          price={product.price}
                          img={product.productImgs[0]}
                          id={product.id}
                        />
                      </Grid>
                    ))}
                </Grid>

                {/* Footer */}
                <Box
                  sx={{ bgcolor: "background.paper", paddingTop: 10 }}
                  component="footer"
                >
                  <Typography variant="h6" align="center" gutterBottom>
                    Todos los derechos reservados
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                  >
                    Desde 2022
                  </Typography>
                </Box>
                {/* End footer */}
              </>
            )}
          </Container>
        </div>
      </Layout>
    </ThemeProvider>
  );
}
