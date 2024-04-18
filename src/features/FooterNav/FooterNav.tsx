import { NavLink } from 'react-router-dom';

export default function FooterNav() {

  return (
    <section>
      <h5>Информация</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/about.html" className="nav-link">О магазине</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/catalog.html" className="nav-link">Каталог</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contacts.html" className="nav-link">Контакты</NavLink>
        </li>
      </ul>
    </section>
  );
}

