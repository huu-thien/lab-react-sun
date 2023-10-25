import { AiFillStar } from 'react-icons/ai';

interface PropsType {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  subCategory: string;
  brand: string;
  isFree: boolean;
  category: string;
}

const ProductItem = ({
  id,
  name,
  description,
  price,
  rating,
  image,
  subCategory,
  brand,
  isFree,
  category
}: PropsType) => {
  return (
    <div className='p-4 shadow-md rounded-md'>
      <img src={image} alt='name' className='max-w-full' />
      <p className='text-cyan-700 pt-6'>ID: {id}</p>
      <p className='font-bold text-red-500 text-sm pb-2 '> ParentCategory: {category}</p>
      <p className='font-bold text-cyan-600 text-sm pb-2 '> SubCategory: {subCategory}</p>
      <p className='font-bold text-gray-500 text-sm pb-2 '> Brand: {brand}</p>
      <p className='font-bold text-gray-500 text-sm pb-2 '> isFree: {isFree.toString()}</p>

      <h4 className='font-bold text-gray-700'>{name}</h4>
      <p className='line-clamp-2 font-thin text-sm text-gray-400 py-2'>{description}</p>
      <div className='flex gap-2 items-center'>
        <div>
          <span className='font-bold text-yellow-500'>$</span>
          <span className='font-bold text-gray-600 pl-2'>{price}</span>
        </div>
        <div className='flex items-center'>
          <AiFillStar style={{ color: '#feb207' }} />
          <span className='pl-2'>{Math.floor(rating)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
