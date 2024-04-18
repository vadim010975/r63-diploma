import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../widgets/Header/Header";
import Footer from "../widgets/Footer/Footer";
import Main from "../widgets/Main/Main";
import { BosaNogaAPI } from "../entities/Service";
import { setCart } from "../features/Cart/cartSlice";
import { useAppDispatch } from "./hooks";


const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigate("/");
    const cart = BosaNogaAPI.loadLoacalStorage();
    dispatch(setCart(cart));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}

export default Layout;