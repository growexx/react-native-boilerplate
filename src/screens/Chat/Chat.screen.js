import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

class ChatScreen extends Component {
  state = {
    messages: []
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://tiny.cc/s7iavz'
          }
        }
      ]
    })
  }

  renderBubble(props) {
    return (
      <View style={styles.bubbleContainer}>
        <Bubble {...props} />
        {/* <View style={styles.iconContainer}>
          <FontAwesomeIcon name="user-circle" size={36} color="gray" />
        </View> */}
      </View>
    )
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderBubble={this.renderBubble}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bubbleContainer: {
    flexDirection: 'row'
  },
  iconContainer: {
    marginLeft: 10
  }
})

export default ChatScreen
