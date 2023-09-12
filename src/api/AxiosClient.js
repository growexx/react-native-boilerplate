import axios from 'axios'
import { configs } from '@constants'

export const GET = async (url, params) => {
  // params can be passed when the end point requires some paramters like auth token it can be passed as below:
  // {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }
  return handleRequest(axios.get('https://newsapi.org' + url, { params }))
}

export const GET_BACKGROUND = async params => {
  // You can pass params if you want as described above.
  // This API gives response after 5 seconds of delay, so for example if you want to load the users list in a listview, without showing loader, you can use the api reducer and api action which will store the value so you dont have to call the api every time you navigate to some screen, also the using redux if the userList changes the UI where you have used that list will automatically re render so you dont have to show loading indicator while data is loaded and redux will handle that state management.
  // For example you can get the list of users from the reducer using the useSelector as below:

  /* const data = useSelector(state => state.apiReducer.userList)
  const dispatch = useDispatch()
  useEffect(() => {
    clearRedux()
    dispatch(fetchApi())
  }, []) */

  // Now you can use this value to update the UI whenever the API call completes, for example you want to display if of first user in the list you can use below example:

  // {data.length > 0 && <Text>{data[0].id}</Text>}

  // So when the list will be empty you will not have a TEXT in the screen but when the API call completes and you have data the text will be displayed automatically, as the state is managed by redux.

  return handleRequest(
    axios.get('https://reqres.in/api/users?delay=5', { params })
  )
}

export const POST = async (url, data, params) => {
  // data to be passed to the post request and also pass the params if you want as described above.
  return handleRequest(axios.post(configs.API_URL + url, data, { params }))
}

export const PATCH = async (url, data, params) => {
  // data to be passed to the patch request and also pass the params if you want as described above.
  return handleRequest(axios.patch(configs.API_URL + url, data, { params }))
}

export const DELETE = async (url, params) => {
  // pass the params to delete request if you want as described above.
  return handleRequest(axios.patch(configs.API_URL + url, { params }))
}

const handleRequest = async requestPromise => {
  return new Promise((resolve, reject) => {
    requestPromise
      .then(response => {
        if (response.status === 200) {
          // Check if the response data is directly usable
          if (response.data) {
            return response.data
          } else {
            // If the data is nested within the response, modify this according to your API's response structure
            return response
          }
        } else if (response.status === 400) {
          // This status indicates that the server cannot process the request due to a client error. It often occurs when the request is malformed or missing required parameters. Handle this status appropriately.
          reject({
            error: 'Inappropriate request',
            status: 'failed'
          })
          return
        } else if (response.status === 401) {
          // This status indicates that the request has not been applied because it lacks valid authentication credentials for the target end point. It often occurs when the user needs to log in or provide valid credentials. Logout the user, clear async storage and navigate user to login screen.
          reject({
            error: 'User not authorized',
            status: 'failed'
          })
          return
        } else if (response.status === 404) {
          // This status indicates that the server has not found anything matching the request URI. It often occurs when the requested resource does not exist. Recheck the URI exists in backend or has changed.
          reject({
            error: 'End point not found',
            status: 'failed'
          })
          return
        } else {
          // Any other status code should be handled by showing the appropriate error. The actual cause of the error should be investigated on the server side.
          reject({
            error: 'Something went wrong',
            status: 'failed'
          })
          return
        }
      })
      .then(responseJson => {
        resolve(responseJson)
      })
      .catch(error => {
        reject(error)
      })
  })
}
