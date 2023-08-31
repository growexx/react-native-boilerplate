import { GET, GET_BACKGROUND } from './AxiosClient'
import { configs } from '@constants'

const getNews = (page, category) => {
  return GET(
    `/v2/top-headlines?country=in&category=${category}&apiKey=${configs.NEWSAPI_KEY}&pageSize=15&page=${page}`
  )
}

const getUsers = () => {
  return GET_BACKGROUND()
}

export { getNews, getUsers }
