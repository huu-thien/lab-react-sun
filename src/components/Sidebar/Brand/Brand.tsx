import { BrandType } from '@/@types/brand';
import { RootState, useAppDispatch } from '@/store';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import _, { debounce } from 'lodash';
import { getFilterProduct } from '@/redux-toolkit/filter.slice';

const Brand = () => {
  const brandList: BrandType[] = useSelector((state: RootState) => state.product.brandList);
  const isFilter = useSelector((state: RootState) => state.filter.isFilter);
  const searchParams = useSelector((state: RootState) => state.filter.filterParams);
  const dispatch = useAppDispatch();

  const [currentListBrand, setCurrentListBrand] = useState<BrandType[]>(brandList);
  useEffect(() => {
    setCurrentListBrand(brandList);
  }, [brandList]);
  const [itemSelected, setItemSelected] = useState<number | null>(null);

  // Search brand
  const handleSearch = debounce((e) => {
    const keySearch = e.target.value.toLowerCase().trim();
    if (keySearch) {
      let listBrandSearch = _.cloneDeep(currentListBrand);
      listBrandSearch = listBrandSearch.filter((brand) => brand.name.toLowerCase().includes(keySearch));

      setCurrentListBrand(listBrandSearch);
    } else {
      setCurrentListBrand(brandList);
    }
  }, 500);
  // handle filter brand
  const handleFilter = (brandId: number) => {
    dispatch(getFilterProduct({ ...searchParams, brandId: brandId }));
    setItemSelected(brandId);
  };
  return (
    <div>
      <h4 className='font-bold py-4'>Brands</h4>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <AiOutlineSearch />
        </div>
        <input
          // value={valueSearch}
          onChange={(e) => handleSearch(e)}
          type='search'
          id='default-search'
          className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none'
          placeholder='Search for brand'
        />
      </div>
      <ul className='flex flex-col gap-2 pt-4'>
        {currentListBrand.map((brand, index) => (
          <li
            key={`${brand.name}-${index}`}
            onClick={() => handleFilter(brand.id)}
            className={`py-1 list-disc cursor-pointer hover:text-yellow-600 ${
              itemSelected === brand.id && isFilter ? 'text-yellow-600 font-bold' : ''
            }`}
          >
            {brand.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Brand;
