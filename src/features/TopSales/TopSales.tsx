import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectTopSales, fetchTopSales } from "./topSalesSlice";
import Card from "../../entities/Card/Card";
import Preloader1 from "../../entities/preloaders/Preloader1";
import Preloader2 from "../../entities/preloaders/Preloader2";
import Preloader3 from "../../entities/preloaders/Preloader3";
import Preloader4 from "../../entities/preloaders/Preloader4";


export default function TopSales() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector(selectTopSales);

  useEffect(() => {
    dispatch(fetchTopSales());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row">
        <Preloader4 />
        {!loading && items.map(item => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}