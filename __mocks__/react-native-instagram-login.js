const React = require('react')
const { View } = require('react-native')

const mock = jest.fn().mockImplementation((...props) => {
  return React.createElement(
    View,
    { ...props },
    React.createElement(React.Fragment, null)
  )
})

export default mock()
