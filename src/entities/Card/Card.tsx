import { FC } from "react";
import { ProductCard } from "../Service";
import { useNavigate } from "react-router-dom";

const Card: FC<{ item: ProductCard }> = ({ item }) => {

  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault;
    navigate(`/catalog/${item.id}.html`);
  }

  return (
    <div className="col-4">
      <div className="card">
        <img src={item.images[0]}
          className="card-img-top img-fluid" alt={item.title} />
        <div className="card-body">
          <p className="card-text">{item.title}</p>
          <p className="card-text">{item.price + " руб."}</p>
          <a onClick={handleClick} className="btn btn-outline-primary">Заказать</a>
        </div>
      </div>
    </div>
  );
}

export default Card;