import { useState } from 'react';
import ChildCategory from './ChildCategory';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import { getFilterProduct } from '@/redux-toolkit/filter.slice';

interface Propstype {
  id: number;
  name: string;
  isSelected: boolean;
  onSelect: (value: React.SetStateAction<number | null>) => void;
}

const ParentCategory = ({ id, name, isSelected, onSelect }: Propstype) => {
  const filterParams = useSelector((state: RootState) => state.filter.filterParams);
  const isFilter = useSelector((state: RootState) => state.filter.isFilter);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const subCategoryList = useSelector((state: RootState) => state.product.subCategoryList);
  const subCategoryListMatcher = subCategoryList.filter((item) => item.idCategory === id);

  const handleChangeparentCategory = (idCategory: number) => {
    setIsOpen(!isOpen);
    dispatch(getFilterProduct({ ...filterParams, categoryId: idCategory, subCategoryId: undefined }));
  };

  return (
    <div>
      <div
        className={`flex items-center gap-2 cursor-pointer hover:text-cyan-700  py-1 ${
          isSelected && isFilter ? 'font-bold text-cyan-700' : ''
        }`}
        onClick={() => {
          setIsOpen(!isOpen);
          handleChangeparentCategory(id);
          onSelect(id); 
        }}
      >
        <AiOutlineArrowDown className='text-xs' />
        <p>{name}</p>
      </div>
      {isOpen && (
        <>
          {subCategoryListMatcher.map((subCategory, index) => (
            <ChildCategory key={`${subCategory.name}_${index}`} name={subCategory.name} id={subCategory.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default ParentCategory;
