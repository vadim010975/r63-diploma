import "./Icons.css";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSearch } from "../Catalog/catalogSlice";
import { useNavigate } from "react-router-dom";
import { selectCart } from "../Cart/cartSlice";
import { fetchCatalogThunk } from "../Catalog/fetchCatalogThunk";

export default function Icons() {

  const formRef = useRef(null);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(selectCart);
  const navigate = useNavigate();

  const [visibility, setVisibility] = useState<boolean>(false);
  const [cartActivity, setCartActivity] = useState<boolean>(false);

  useEffect(() => {
    if (products.length > 0) {
      setCartActivity(true);
      return;
    }
    setCartActivity(false);
     
  }, [products]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setVisibility(!visibility);
    if (visibility) {
      if (formRef.current) {
        const form = formRef.current as HTMLFormElement;
        processForm(form);
      }
    }
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    processForm(form);
  }

  const processForm = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const searchWord = (data.search as string).trim();
    if (searchWord) {
      dispatch(setSearch(searchWord));
      dispatch(fetchCatalogThunk());
      navigate("/catalog.html");
      form.reset();
    }
    setVisibility(false);
  }

  const goToCart = () => {
    if (cartActivity) {
      navigate("/cart");
    }
  }

  return (
    <>
      <div className="header-controls-pics">
        <div onClick={handleClick} data-id="search-expander" className="header-controls-pic header-controls-search"></div>
        <div onClick={goToCart} className="header-controls-pic header-controls-cart" style={cartActivity ? {} : {cursor: "default"}}>
          {cartActivity && <div className="header-controls-cart-full">{products.length}</div>}
          <div className="header-controls-cart-menu"></div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        data-id="search-form"
        className={"header-controls-search-form form-inline" + (visibility ? "" : " invisible")}
        ref={formRef}
      >
        <input name="search" className="form-control" placeholder="Поиск" />
      </form>
    </>
  );
}