import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCatalog, setCategoryById, setSearch } from '../Catalog/catalogSlice';

export default function HeaderNavbar() {

  const { selectedCategoryId, search } = useAppSelector(selectCatalog);
  const dispatch = useAppDispatch();

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = () => {
    if (selectedCategoryId) {
      dispatch(setCategoryById(null));
    }
    if (search) {
      dispatch(setSearch(""));
    }
  }

  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink to="/" onClick={handleClick} className="nav-link">Главная</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/catalog.html" onClick={handleClick} className="nav-link">Каталог</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/about.html" onClick={handleClick} className="nav-link">О магазине</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/contacts.html" onClick={handleClick} className="nav-link">Контакты</NavLink>
      </li>
    </ul>
  );
}

