import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Layout } from "../components/Layout";
import { selectUser } from "../features/generalSlice";
import services from "../services";

export default function Purchases() {
  const user = useSelector(selectUser);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    services
      .getPurchases(user.token)
      .then(({ data }) => setPurchases(data.purchases))
      .catch((err) => console.log(err));

    console.log(purchases);
  }, [user, purchases]);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 20,
          alignItems: "center",
        }}
      >
        <h2>Mis compras</h2>

        {purchases.map((purchase) => (
          <div
            style={{
              width: "80%",
              backgroundColor: "#00000080",
              borderRadius: "10px",
              minHeight: "300px",

              padding: 15,
            }}
          >
            <h3>
              {(new Date(purchase.createdAt) + "")
                .split(" ")
                .filter((date, index) => (index >= 5 ? false : true))
                .join(" ")}
            </h3>

            <ul
              style={{
                width: "90%",
              }}
            >
              {purchase.cart.products.map((product) => (
                <li
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", gap: 10 }}>
                    <p>[{product.productsInCart.quantity}]</p>
                    <p>{product.title}</p>
                  </div>

                  <p>
                    $
                    {Number(product.productsInCart.quantity) *
                      Number(product.price)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  );
}
