import Category from '../Сategory/Сategory';
import { useAppSelector } from '../../app/hooks';
import { selectCatalog } from '../../features/Catalog/catalogSlice';

export default function Categories() {

  const { categories } = useAppSelector(selectCatalog);

  return (
    <ul className="catalog-categories nav justify-content-center">
      {categories.map(category => (
        <Category category={category} key={category.id} />
      ))}
    </ul>
  );
}