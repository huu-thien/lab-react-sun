import { getFilterProduct } from '@/redux-toolkit/filter.slice';
import { RootState, useAppDispatch } from '@/store';
import { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const Rating = () => {
  const dispatch = useAppDispatch();
  const filterParams = useSelector((state: RootState) => state.filter.filterParams);
  const isFilter = useSelector((state: RootState) => state.filter.isFilter);

  const [itemSelected, setItemSelected] = useState<number | null>(null);
  useEffect(() => {
    if (!isFilter) {
      setItemSelected(null);
    }
  }, [isFilter]);

  const ratings = [
    { stars: 5, color: '#feb207', count: 123 },
    { stars: 4, color: '#feb207', count: 123 },
    { stars: 3, color: '#feb207', count: 123 },
    { stars: 2, color: '#feb207', count: 123 },
    { stars: 1, color: '#feb207', count: 123 }
  ];

  const handleRatings = (ratingScore: number) => {
    dispatch(getFilterProduct({ ...filterParams, rating: ratingScore }));
    setItemSelected(ratingScore);
  };

  return (
    <div>
      <h4 className='font-bold py-4'>Ratings</h4>
      <div className='flex flex-col gap-2'>
        {ratings.map((rating, index) => (
          <div
            key={index}
            className={`flex gap-2 items-center text-xl cursor-pointer ${
              itemSelected === rating.stars ? 'bg-cyan-50' : ''
            }`}
            onClick={() => handleRatings(rating.stars)}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <AiFillStar key={i} style={{ color: i < rating.stars ? rating.color : 'gray' }} />
            ))}
            <span className='text-xs p-1 bg-gray-200 font-bold rounded-md text-blue-400'>{rating.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rating;
