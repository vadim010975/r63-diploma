import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./app/Layout";
import Catalog from "./features/Catalog/Catalog";
import About from "./entities/About/About";
import Contacts from "./entities/Contacts/Contacts";
import ProductPage from "./features/ProductPage/ProductPage";
import Cart from "./features/Cart/Cart";
import Order from "./features/Order/Order";
import TopSales from "./features/TopSales/TopSales";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        element: <><TopSales /><Catalog /></>,
      },
      {
        path: "/catalog.html",
        element: <Catalog isSearch={true} />,
      },
      {
        path: "/about.html",
        Component: About,
      },
      {
        path: "/contacts.html",
        Component: Contacts,
      },
      {
        path: "/catalog/:id.html",
        Component: ProductPage,
      },
      {
        path: "/cart",
        element: <><Cart /><Order /></>
      }
    ],
  },
]);


export default function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}