import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SwipeableTextMobileStepper } from "../components/Carrousel";
import { Layout } from "../components/Layout";
import {
  selectCategories,
  selectUser,
  setPendingCartActualization,
} from "../features/generalSlice";
import services from "../services";
import { CustomCard as Card } from "../components/Card";

export default function Product() {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const [productQuantity, setProductQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    services
      .getProductById(id)
      .then(({ data }) => {
        setProduct(data.product);
        const payload = data.product.productImgs.map((pImg) => ({
          imgPath: pImg,
          label: data.product.title,
        }));

        let categoryToSearch = data.product.category;
        categoryToSearch = categories?.data?.find(
          (cat) => cat?.name === categoryToSearch
        );
        services
          .getProducts(categoryToSearch?.id)
          .then(({ data }) => setSimilarProducts(data.products))
          .catch((err) => console.log(err));

        return setImages(payload);
      })
      .catch((err) => console.error(err));
  }, [id, categories]);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 50,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 50,
          }}
          className="Product-product"
        >
          <SwipeableTextMobileStepper images={images} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              justifyContent: "center",
              maxWidth: 500,
            }}
          >
            <p>
              <strong>Price: </strong>${product.price}
            </p>
            <TextField
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              type="number"
              id="outlined-basic"
              label="Cantidad"
              variant="outlined"
            />
            <p>{product.description}</p>
            <Button
              onClick={() =>
                services
                  .addItemCart(user.token, id, productQuantity)
                  .then((res) => {
                    if (res.status === "fail") throw new Error(res.message);

                    dispatch(setPendingCartActualization(true));
                    return alert("Agregado con éxito");
                  })
                  .catch((err) =>
                    alert(
                      "Error al agregar el producto al carrito, posiblemente porque ya lo has agregado."
                    )
                  )
              }
              variant="contained"
            >
              Agregar al carrito
            </Button>
          </div>
        </div>

        <div>
          <h3>Productos similares:</h3>

          <Grid container spacing={4}>
            {similarProducts.map((product) => (
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
        </div>
      </div>
    </Layout>
  );
}
