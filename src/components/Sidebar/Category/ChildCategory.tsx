import { getFilterProduct } from '@/redux-toolkit/filter.slice';
import { RootState, useAppDispatch } from '@/store';

import { AiOutlineArrowUp } from 'react-icons/ai';
import { useSelector } from 'react-redux';

interface Propstype {
  name: string;
  id: number;
}

const ChildCategory = ({ name, id }: Propstype) => {
  const filterParams = useSelector((state: RootState) => state.filter.filterParams);
  const dispatch = useAppDispatch();
  const handleChangeCate = (subCategoryId: number) => {
    dispatch(getFilterProduct({ ...filterParams, subCategoryId: subCategoryId, categoryId: undefined }));
    console.log(123);
    
  };
  return (
    <div
      className='flex items-center gap-2 pl-4 py-1 text-md text-gray-600 cursor-pointer hover:text-yellow-600 hover:font-bold'
      onClick={() => handleChangeCate(id)}
    >
      <AiOutlineArrowUp className='text-xs' />
      <span>{name}</span>
    </div>
  );
};

export default ChildCategory;
