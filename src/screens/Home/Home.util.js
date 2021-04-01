import { GET } from '@api/AxiosClient'

jest.mock('@api/AxiosClient')

export const newsListResponse = Array(15).fill({
  publishedAt: '2021-03-24T10:27:00Z',
  title:
    'Sensex dives 871 points; Nifty ends below 14,550: Top reasons behind fall - Times of India',
  source: {
    id: null,
    name: 'The Times of India'
  },
  urlToImage:
    'photo.jpg'
})

export const getSuccessResponse = {
  status: 'ok',
  articles: newsListResponse
}

export const getEmptyResponse = {
  status: 'error',
  articles: []
}

export const mockedGetRequest = function (type) {
  if (type === 'success') {
    GET.mockImplementation(() => Promise.resolve(getSuccessResponse))
  } else if (type === 'failed') {
    GET.mockImplementation(() => Promise.reject(new Error('Request failed!')))
  } else {
    GET.mockImplementation(() => Promise.resolve(getEmptyResponse))
  }
}

