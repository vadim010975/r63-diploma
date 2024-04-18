import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { removeProduct, selectCart } from "./cartSlice";
import { ProductCart } from "../../entities/Service";

export default function Cart() {

  const dispatch = useAppDispatch();
  const { products } = useAppSelector(selectCart);

  const handleClick = (product: ProductCart) => {
    dispatch(removeProduct(product));
  }

  const calculateTotalCost = () => {
    return products.reduce((acc, item) => item.price * item.count + acc, 0);
  }

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, key) => (
              <tr key={key}>
                <td scope="row">{key + 1}</td>
                <td><a href="/products/1.html">{product.title}</a></td>
                <td>{product.size}</td>
                <td>{product.count}</td>
                <td>{product.price} руб.</td>
                <td>{product.price * product.count} руб.</td>
                <td><button onClick={() => handleClick(product)} className="btn btn-outline-danger btn-sm">Удалить</button></td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} className="text-right">Общая стоимость</td>
              <td>{calculateTotalCost()} руб.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>

  );
}