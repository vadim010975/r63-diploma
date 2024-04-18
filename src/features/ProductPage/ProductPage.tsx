import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useParams, useNavigate } from "react-router-dom";
import { BosaNogaAPI, Product } from "../../entities/Service";
import Size from "../../entities/Size/Size";
import { addProduct } from "../Cart/cartSlice";
import Preloader3 from "../../entities/preloaders/Preloader3";

export default function ProductPage() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const productId = useParams().id;

  const [product, setProduct] = useState<Product>();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const [elementVisibility, setElementVisibility] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (productId) {
      try {
        setLoading(true);
        BosaNogaAPI.fetchProduct(productId).then(res => {
          setProduct(res);
          setLoading(false);
        }, rej => {
          setLoading(false);
          throw new Error(rej);
        })
      } catch (e) {
        console.log(e);
      }
    }
  }, [productId]);

  useEffect(() => {
    if (product && product.sizes.every(size => size.available === false)) {
      setElementVisibility(false);
      return;
    }
    setElementVisibility(true);
  }, [product]);

  const handleClick = (productSize: string) => {
    setSelectedSize(productSize);
  }

  const handleIncrement = () => {
    setCount(count => count < 10 ? count + 1 : 10);
  }

  const handleDecrement = () => {
    setCount(count => count > 1 ? count - 1 : 1);
  }

  const goToCart = () => {
    if (!selectedSize) {
      return;
    }
    const { id, title, price } = product as Product;
    dispatch(addProduct({
      id,
      title,
      price,
      size: selectedSize,
      count,
    }));
    navigate("/cart");
  }

  return (
    <section className="catalog-item">
      {loading && <Preloader3 />}
      {!loading && <>
        <h2 className="text-center">{product?.title}</h2>
        <div className="row">
          <div className="col-5">
            <img src={product?.images[0]}
              className="img-fluid" alt="" />
          </div>
          <div className="col-7">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Артикул</td>
                  <td>{product?.sku}</td>
                </tr>
                <tr>
                  <td>Производитель</td>
                  <td>{product?.manufacturer}</td>
                </tr>
                <tr>
                  <td>Цвет</td>
                  <td>{product?.color}</td>
                </tr>
                <tr>
                  <td>Материалы</td>
                  <td>{product?.material}</td>
                </tr>
                <tr>
                  <td>Сезон</td>
                  <td>{product?.season}</td>
                </tr>
                <tr>
                  <td>Повод</td>
                  <td>{product?.reason}</td>
                </tr>
              </tbody>
            </table>
            <div className="text-center">
              <p>Размеры в наличии: {product?.sizes.map((item, key) => (
                item.available && <Size productSize={item.size} handleClick={handleClick} selected={selectedSize} key={key} />
              ))}</p>
              {elementVisibility && <p>Количество: <span className="btn-group btn-group-sm pl-2">
                <button onClick={handleDecrement} className="btn btn-secondary">-</button>
                <span className="btn btn-outline-primary">{count}</span>
                <button onClick={handleIncrement} className="btn btn-secondary">+</button>
              </span>
              </p>}
            </div>
            {elementVisibility && <button onClick={goToCart} className="btn btn-danger btn-block btn-lg">В корзину</button>}
          </div>
        </div>
      </>}
    </section>
  );
}