import { Order, ProductCart } from "./model";

const _URL = "http://localhost:7070/api/";

export async function fetchTopSales() {
  const r = await fetch(_URL + "top-sales");
  const response = await r.json();
  return response;
}

export async function fetchCategories() {
  const r = await fetch(_URL + "categories");
  const response = await r.json();
  return response;
}

export async function fetchCatalog(
  q: string,
  categoryId: number | null = null,
  offset: number | null = null
) {
  const req = _URL +
  "items" +
  (categoryId || offset || q
    ? "?" +
      (q ? "q=" + encodeURIComponent(q) : "") +
      (q && categoryId ? "&" : "") +
      (categoryId ? "categoryId=" + categoryId : "") +
      ((categoryId && offset) || (q && offset) ? "&" : "") +
      (offset ? "offset=" + offset : "")
    : "")
  const r = await fetch(req);
  const response = await r.json();
  return response;
}

export async function fetchProduct(id: string) {
  const r = await fetch(_URL + "items/" + id);
  const response = await r.json();
  return response;
}

export function saveLocalStorage(products: ProductCart[]) {
  localStorage.setItem("BosaNoga", JSON.stringify(products));
}

export function loadLoacalStorage() {
  const data = localStorage.getItem("BosaNoga");
  return data ? JSON.parse(data) : [];
}

export async function fetchOrder(order: Order) {
  await fetch(_URL + "order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
}
