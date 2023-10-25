import { AiOutlineSearch } from 'react-icons/ai';
import { debounce } from 'lodash';
import { RootState, useAppDispatch } from '@/store';
import { getFilterProduct } from '@/redux-toolkit/filter.slice';
import { useSelector } from 'react-redux';
import { getProductList } from '@/redux-toolkit/product.slide';

const Header = () => {
  const filterParams = useSelector((state: RootState) => state.filter.filterParams);
  const dispatch = useAppDispatch();

  // Search
  const handleChangeSearchValue = debounce((e) => {
    const keySearch = e.target.value.trim().toLowerCase();
    if (keySearch) {
      dispatch(getFilterProduct({ ...filterParams, keySearch }));
    } else {
      dispatch(getFilterProduct({ ...filterParams, keySearch: '' }));
    }
  }, 500);

  return (
    <header className='bg-imageHeader bg-no-repeat min-h-[368px] w-full bg-cover object-cover'>
      <div className='max-w-2xl mx-auto py-24 object-cover text-center'>
        <div>
          <p className='text-4xl text-white py-12'>Stop looking for an item — find it</p>
        </div>
        <form className=''>
          <label htmlFor='default-search' className='mb-2 text-sm font-medium text-gray-900 sr-only '>
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <AiOutlineSearch />
            </div>
            <input
              onChange={(e) => handleChangeSearchValue(e)}
              type='search'
              id='default-search'
              className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none'
              placeholder='Search product'
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
