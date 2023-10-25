import { getFilterProduct } from '@/redux-toolkit/filter.slice';
import { RootState, useAppDispatch } from '@/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const FreeShipping = () => {
  const filterParams = useSelector((state: RootState) => state.filter.filterParams);
  const isFilter = useSelector((state: RootState) => state.filter.isFilter);
  const dispatch = useAppDispatch();
  const [isFreeShipping, setIsFreeShipping] = useState<boolean>(false);

  useEffect(() => {
    if (isFilter === false) {
      setIsFreeShipping(false);
    }
  }, [isFilter]);

  const handleToggleFreeShipping = () => {
    setIsFreeShipping(!isFreeShipping);

    dispatch(getFilterProduct({ ...filterParams, isFree: !isFreeShipping }));
  };

  return (
    <div className=''>
      <h4 className='font-bold py-4'>Free Shipping</h4>

      <label className='relative inline-flex items-center cursor-pointer'>
        <input type='checkbox' checked={isFreeShipping} onChange={handleToggleFreeShipping} className='sr-only peer' />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
        <span className='ml-3 text-sm font-thin text-gray-900'>Items with free shipping</span>
      </label>
    </div>
  );
};

export default FreeShipping;
