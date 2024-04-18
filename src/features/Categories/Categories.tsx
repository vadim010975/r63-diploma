import { useEffect } from 'react';
import Category from '../../entities/Сategory/Сategory';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCatalog } from '../Catalog/catalogSlice';
import { fetchCategoriesThunk } from '../Catalog/fetchCatesoriesThunk';

export default function Categories() {

  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(selectCatalog);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  return (
    <ul className="catalog-categories nav justify-content-center">
      {categories.map(category => (
        <Category category={category} key={category.id} />
      ))}
    </ul>
  );
}