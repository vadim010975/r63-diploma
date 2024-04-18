import { useAppSelector } from "../../app/hooks";
import { BosaNogaAPI } from "../../entities/Service";
import { selectCart } from "../Cart/cartSlice";

export default function Order() {

  const { products } = useAppSelector(selectCart);

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
      await BosaNogaAPI.fetchOrder(request);
    }
  }

  return (
    <section className="order">
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
    </section>
  );
}