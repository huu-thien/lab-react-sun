export interface FilterType {
  [key: string]: boolean | number | undefined | string;
  isFree: boolean | undefined;
  subCategoryId: number | undefined;
  rating: number | undefined;
  brandId: number | undefined;
  categoryId: number | undefined;
  typeSort: string | undefined;
  keySearch: string;
}
