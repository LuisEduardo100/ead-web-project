export interface CategoryDTO {
  id: number
  name: string
  position: number
}

export interface PaginatedCategoriesDTO {
  categories: CategoryDTO[]
  page: number
  perPage: number
  total: number
}
