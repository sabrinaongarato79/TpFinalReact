const services = {};

const API_BASE_URL = "https://e-commerce-api.academlo.tech/api/v1";

services.getProducts = async (category) => {
  let endpoint = `${API_BASE_URL}/products`;

  if (category) endpoint += `?category=${category}`;

  return await fetch(endpoint)
    .then((res) => res.json())
    .catch((err) => err);
};

services.getCategory = async () => {
  const endpoint = `${API_BASE_URL}/products/categories`;

  return await fetch(endpoint)
    .then((res) => res.json())
    .catch((err) => err);
};

services.login = async (email, password) => {
  const endpoint = `${API_BASE_URL}/users/login`;

  return await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => err);
};

services.getCart = async (token) => {
  const endpoint = `${API_BASE_URL}/cart`;

  return await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => err);
};

services.buyCart = async (token) => {
  const endpoint = `${API_BASE_URL}/purchases`;

  return await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => err);
};

services.addItemCart = async (token, id, quantity) => {
  const endpoint = `${API_BASE_URL}/cart`;

  return await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, quantity }),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

services.getPurchases = async (token) => {
  const endpoint = `${API_BASE_URL}/purchases`;

  return await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => err);
};

services.getProductById = async (id) => {
  const endpoint = `${API_BASE_URL}/products/${id}`;

  return await fetch(endpoint)
    .then((res) => res.json())
    .catch((err) => err);
};

export default services;
