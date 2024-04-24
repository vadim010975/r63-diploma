import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectTopSales, fetchTopSales, loadingFailed } from "./topSalesSlice";
import Card from "../../entities/Card/Card";
import Preloader1 from "../../entities/preloaders/Preloader1";
import ErrorComponent from "../../entities/ErrorComponent/ErrorComponent";


export default function TopSales() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(selectTopSales);

  useEffect(() => {
    dispatch(fetchTopSales())
      .unwrap()
      .catch((e) => {
        dispatch(loadingFailed({ name: (e as Error).name, message: (e as Error).message }));
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {error && <ErrorComponent error={error} />}
      {!error && <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <div className="row">
          {loading && <Preloader1 />}
          {!loading && items.map(item => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      </section>}
    </>
  );
}