import { FC } from "react";
import { type ProductCategory } from "../Service";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCatalog, setCategoryById } from "../../features/Catalog/catalogSlice";

const Category: FC<{ category: ProductCategory }> = ({ category }) => {

  const dispatch = useAppDispatch();
  const { selectedCategoryId } = useAppSelector(selectCatalog);

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    dispatch(setCategoryById(category.id));
  }

  return (
    <li className="nav-item">
      <a
        onClick={handleClick}
        className={"nav-link" + (category.id === selectedCategoryId ? " active" : "")}
        href="#"
      >{category.title}</a>
    </li>
  );
}

export default Category;