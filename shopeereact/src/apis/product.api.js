import http from '../utils/http'

const URL = 'products'
const productApi = {
  getProducts(params) {
    return http.get(URL, {
      params
    })
  },
  getProductDetail(id) {
    return http.get(`${URL}/${id}`)
  }
}

export default productApi
