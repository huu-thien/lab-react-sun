import { useEffect, useState } from 'react';

import { RootState, useAppDispatch } from '@/store';
import { getCategories } from '@/redux-toolkit/product.slide';
import { useSelector } from 'react-redux';
import ParentCategory from './ParentCategory';

const Category = () => {
  const categoryList = useSelector((state: RootState) => state.product.categorylist);
  const [selectedParentCategory, setSelectedParentCategory] = useState<null | number>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(getCategories());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <div>
      <h4 className='font-bold py-4'>Category</h4>
      {categoryList.map((category, index) => (
        <ParentCategory
          key={`${category.name}_${index}`}
          name={category.name}
          id={category.id}
          isSelected={selectedParentCategory === category.id}
          onSelect={() => setSelectedParentCategory(category.id)}
        />
      ))}
    </div>
  );
};

export default Category;
