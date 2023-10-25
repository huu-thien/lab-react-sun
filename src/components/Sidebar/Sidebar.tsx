import { useDispatch } from 'react-redux';
import Brand from './Brand';
import Category from './Category';
import FreeShipping from './FreeShipping';
// import Price from './Price';
import Rating from './Rating';
import { BiRefresh } from 'react-icons/bi';
import { clearFilter } from '@/redux-toolkit/filter.slice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const handleClearFilter = () => {
    dispatch(clearFilter());
  };

  return (
    <div className='py-12 pr-4 min-w-[250px]'>
      <div className='flex items-center justify-between'>
        <p className='font-bold text-xl'>Filter</p>
        <div className='flex items-center gap-2 cursor-pointer'>
          <BiRefresh className='text-xl' />
          <span onClick={handleClearFilter}>Clear filter</span>
        </div>
      </div>
      <Category />
      <Brand />
      {/* <Price /> */}
      <FreeShipping />
      <Rating />
    </div>
  );
};

export default Sidebar;
