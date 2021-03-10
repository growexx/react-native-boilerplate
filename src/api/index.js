import { GET } from './AxiosClient'
import { configs } from '@constants'

const getNews = (page, category) => {
  return GET(`/v2/top-headlines?country=in&category=${category}&apiKey=${configs.NEWSAPI_KEY}&pageSize=15&page=${page}`)
}

export { getNews }
