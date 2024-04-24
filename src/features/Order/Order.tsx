import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { BosaNogaAPI } from "../../entities/Service";
import { selectCart, setCart } from "../Cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Preloader4 from "../../entities/preloaders/Preloader4";

export default function Order() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(selectCart);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (successful) {
      dispatch(setCart([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  useEffect(() => {
    if (products.length === 0 && !successful) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData);
    const phone = data.phone as string;
    const address = data.address as string;
    const agreement = data.agreement;
    const items = products.map(product => ({ id: product.id, price: product.price, count: product.count }));
    const request = {
      owner: {
        phone,
        address,
      },
      items,
    }
    if (agreement) {
      setLoading(true);
      const r = await BosaNogaAPI.fetchOrder(request);
      if (r.status === 204) {
        setSuccessful(true);
      }
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Preloader4 />}
      {!loading && <>
        {successful && <h2>Заказ оформлен успешно!</h2>}
        {!successful && <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input name="phone" className="form-control" id="phone" placeholder="Ваш телефон" />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input name="address" className="form-control" id="address" placeholder="Адрес доставки" />
              </div>
              <div className="form-group form-check">
                <input name="agreement" type="checkbox" className="form-check-input" id="agreement" />
                <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
              </div>
              <button type="submit" className="btn btn-outline-secondary">Оформить</button>
            </form>
          </div>
        </section>}
      </>}
    </>

  );
}