const userResponse = {
  default: {
    status: 'success',
    data: {
      token: 'oidehcfhioienwfszdfsf',
      username: 'Test User',
      email: 'user@test.com'
    }
  },
  facebook: {
    accessToken: '89923h8jenwjr9238yr9hjnidfjnswe98f'
  },
  google: {
    status: 'success',
    user: {
      name: 'name',
      email: 'test@email.com'
    }
  },
  apple: {
    fullName: 'name',
    email: 'test@email.com'
  }
}

export const getLoginResponse = loginProvider => {
  if (loginProvider === 'facebook') {
    return userResponse.facebook
  } else if (loginProvider === 'google') {
    return userResponse.google
  } else if (loginProvider === 'apple') {
    return userResponse.apple
  } else {
    return userResponse.default
  }
}
