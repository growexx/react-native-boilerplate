//example api request: replace with your API request here in folder API

export const loginUser = () => {
  try {
    return Promise.resolve({
      status: 'success',
      data: {
        token: 'sxjn239ym4f8e4d2145e45gdgas673p0-6ncfm',
        username: 'Test User',
        email: 'test@user.com'
      }
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = {
  loginUser
}
