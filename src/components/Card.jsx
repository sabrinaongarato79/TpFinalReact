import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import services from "../services/index";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  setPendingCartActualization,
} from "../features/generalSlice";

export function CustomCard({ title, img, price, id }) {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 400,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <CardActionArea onClick={() => navigate(`/product/${id}`)}>
        <CardMedia
          style={{ objectFit: "contain" }}
          component="img"
          image={img}
          height="150"
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Precio:{" "}
            <small>
              <strong>${price}</strong>
            </small>
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button
          onClick={() =>
            services
              .addItemCart(user.token, id, 1)
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
          size="small"
          color="primary"
        >
          Añadir al carrito
        </Button>
      </CardActions>
    </Card>
  );
}
