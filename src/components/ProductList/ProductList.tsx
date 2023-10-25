import { useSelector } from 'react-redux';
import ProductItem from '../ProductItem';
import { RootState, useAppDispatch } from '@/store';
import { getBrands, getParentCategory, getProductList, getSubCategories } from '@/redux-toolkit/product.slide';
import { useEffect, useState } from 'react';
import { getFilterProduct } from '@/redux-toolkit/filter.slice';

const stylePaginate = `flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700`;

const ProductList = () => {
  const productList = useSelector((state: RootState) => state.product.productList);
  const subCategoryList = useSelector((state: RootState) => state.product.subCategoryList);
  const subBrandList = useSelector((state: RootState) => state.product.brandList);
  const parentCategoryList = useSelector((state: RootState) => state.product.parentCategoryList);

  const isFilterMode = useSelector((state: RootState) => state.filter.isFilter);
  const filterProductList = useSelector((state: RootState) => state.filter.productListFilter);
  const filterParams = useSelector((state: RootState) => state.filter.filterParams);
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageFilter, setCurrentPageFilter] = useState<number>(1);

  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  // const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(productList.length / itemsPerPage);

  const startIndexFilter = (currentPageFilter - 1) * itemsPerPage;
  const endIndexFilter = startIndexFilter + itemsPerPage;
  const totalPagesFilter = Math.ceil(filterProductList.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePageChangePageFilter = (page: number) => {
    setCurrentPageFilter(page);
  };

  const productsToDisplay = productList.slice(startIndex, endIndex);
  const productsFilterToDisplay = filterProductList.slice(startIndexFilter, endIndexFilter);

  const handleChangeSortType = (typeSort: string) => {
    dispatch(getFilterProduct({ ...filterParams, typeSort: typeSort }));
  };

  useEffect(() => {
    if (isFilterMode) {
      setCurrentPageFilter(1);
      setCurrentPage(1);
    }
  }, [isFilterMode]);
  // goi api get product
  useEffect(() => {
    const promise1 = dispatch(getProductList());
    const promise2 = dispatch(getSubCategories());
    const promise3 = dispatch(getBrands());
    const promise4 = dispatch(getParentCategory());
    return () => {
      promise1.abort();
      promise2.abort();
      promise3.abort();
      promise4.abort();
    };
  }, [dispatch]);

  // handle get name sub cate
  const handleGetSubCategory = (idSubCategory: number) => {
    const subCategory = subCategoryList.find((item) => item.id === idSubCategory);
    if (subCategory) {
      return subCategory.name;
    } else {
      return 'gg';
    }
  };
  // get brand
  const handleGetbrand = (idBrand: number) => {
    const subBrand = subBrandList.find((item) => item.id === idBrand);
    if (subBrand) {
      return subBrand.name;
    } else {
      return 'gg';
    }
  };
  const handleGetParentCategoryID = (idCategory: number) => {
    const parentCategory = parentCategoryList.find((item) => item.id === idCategory);
    if (parentCategory) {
      return parentCategory.name;
    } else {
      return 'gg';
    }
  };
  return (
    <div className='py-12 flex flex-col w-full'>
      <div className='flex items-center justify-between'>
        <div className='mx-auto w-full'>
          <nav aria-label='Page navigation example'>
            <div className='inline-flex -space-x-px text-sm '>
              <a
                href='#'
                className='flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 '
              >
                Previous
              </a>
              {!isFilterMode
                ? Array.from({ length: totalPages }, (_, index) => (
                    <a
                      key={index + 1}
                      href='#'
                      className={`${stylePaginate} ${currentPage === index + 1 ? 'bg-yellow-200' : ''}`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </a>
                  ))
                : Array.from({ length: totalPagesFilter }, (_, index) => (
                    <a
                      key={index + 1}
                      href='#'
                      className={`${stylePaginate} ${currentPageFilter === index + 1 ? 'bg-yellow-200' : ''}`}
                      onClick={() => handlePageChangePageFilter(index + 1)}
                    >
                      {index + 1}
                    </a>
                  ))}
              <a
                href='#'
                className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 '
              >
                Next
              </a>
            </div>
          </nav>
        </div>
        <div className='flex gap-2 justify-end '>
          <div className=''>
            <select
              id='Sort By Price'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              onChange={(e) => handleChangeSortType(e.target.value)}
            >
              <option value='asc'>Acsending Price</option>
              <option value='desc'>Desending Price</option>
            </select>
          </div>
          <div className=''>
            <select
              id='hits per page'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value='4'>4 hits per page</option>
              <option value='8'>8 hits per page</option>
              <option value='12'>12 hits per page</option>
            </select>
          </div>
        </div>
      </div>
      {isFilterMode && (
        <div className='grid grid-cols-4 gap-4'>
          {productsFilterToDisplay.map((product, index) => (
            <ProductItem
              key={`${product.name}_${index}`}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              rating={product.rating}
              image={product.image}
              category={handleGetParentCategoryID(product.categoryId)}
              subCategory={handleGetSubCategory(product.subCategoryId)}
              brand={handleGetbrand(product.brandId)}
              isFree={product.isFree}
            />
          ))}
        </div>
      )}
      {!isFilterMode && (
        <div className='grid grid-cols-4 gap-4 pt-6'>
          {productsToDisplay.map((product, index) => (
            <ProductItem
              key={`${product.name}_${index}`}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              rating={product.rating}
              image={product.image}
              category={handleGetParentCategoryID(product.categoryId)}
              subCategory={handleGetSubCategory(product.subCategoryId)}
              brand={handleGetbrand(product.brandId)}
              isFree={product.isFree}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
