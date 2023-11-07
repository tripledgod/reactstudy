import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Product from './Product'
import SortProductList from './SortProductList'
import AsideFilter from './AsideFilter'
import useQueryParams from '../../hooks/useQueryParams'
import productApi from '../../apis/product.api'
import Pagination from '../../components/Pagination'
import useQueryConfig from '../../hooks/useQueryConfig'
import categoryApi from '../../apis/category.api'

export default function ProductList() {
  const [page, setPage] = useState(1)
  const queryConfig = useQueryConfig()
  const queryParams = useQueryParams()
  const { data: productsData } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })
  return (
    <div className='bg-gray-200 py-6'>
      <div className='max-w-7xl mx-auto px-3'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={categoryData.data.data || []} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination pageSize={productsData.data.data.pagination.page_size} queryConfig={queryConfig} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
