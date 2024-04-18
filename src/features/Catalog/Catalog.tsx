import "./Catalog.css"
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import Categories from "../Categories/Categories";
import { selectCatalog } from "./catalogSlice";
import Card from "../../entities/Card/Card";
import { fetchCatalogThunk } from "./fetchCatalogThunk";
import SearchForm from "../SearchForm/SearchForm";


export default function Catalog({ isSearch = false } : { isSearch?: boolean }) {

  const dispatch = useAppDispatch();
  const { items, selectedCategoryId, visibilityBtn } = useAppSelector(selectCatalog);

  useEffect(() => {
    dispatch(fetchCatalogThunk(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId]);

  const handleClick = () => {
    dispatch(fetchCatalogThunk(items.length));
  }


  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {isSearch && <SearchForm />}
      <Categories />
      <div className="row">
        {items.map(item => (
          <Card item={item} key={item.id} />
        ))}
      </div>
      <div className="text-center btn-wrapper">
        {visibilityBtn && <button onClick={handleClick} className="btn btn-outline-primary">Загрузить ещё</button>}
      </div>
    </section>
  );
}