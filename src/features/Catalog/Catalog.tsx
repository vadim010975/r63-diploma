import "./Catalog.css"
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import Categories from "../../entities/Categories/Categories";
import { selectCatalog } from "./catalogSlice";
import Card from "../../entities/Card/Card";
import { fetchCatalogThunk } from "./fetchCatalogThunk";
import SearchForm from "../SearchForm/SearchForm";
import Preloader2 from "../../entities/preloaders/Preloader2";
import { fetchCategoriesThunk } from "./fetchCatesoriesThunk";
import ErrorComponent from "../../entities/ErrorComponent/ErrorComponent";


export default function Catalog({ isSearch = false }: { isSearch?: boolean }) {

  const dispatch = useAppDispatch();
  const { items, selectedCategoryId, visibilityBtn, catalogloading, categoriesloading, error } = useAppSelector(selectCatalog);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    setLoading(catalogloading || categoriesloading);
  }, [catalogloading, categoriesloading])

  useEffect(() => {
    dispatch(fetchCatalogThunk(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId]);

  const handleClick = () => {
    dispatch(fetchCatalogThunk(items.length));
  }

  return (
    <>
      {error && <ErrorComponent error={error} />}
      {!error && <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        {isSearch && <SearchForm />}
        {!categoriesloading && <Categories />}
        {(!loading || items.length > 0) && <>
          <div className="row">
            {items.map(item => (
              <Card item={item} key={item.id} />
            ))}
          </div>
        </>}
        {loading && <Preloader2 />}
        {(!loading || items.length > 0) && <div className="text-center btn-wrapper">
          {visibilityBtn && <button onClick={handleClick} className="btn btn-outline-primary">Загрузить ещё</button>}
        </div>}
      </section>}
    </>

  );
}