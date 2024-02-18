import {
  View,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {RootStackParamList} from '../route/mainNavigarion';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type ChatScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'ChatScreen'
>;

type MessageType = {
  text: string;
  isPersonMessage: boolean;
};

const ChatScreen = ({route}: ChatScreenNavigationProp) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [socket] = useState<WebSocket>(route.params.socket);

  const handleSend = () => {
    if (socket && messageText.trim() !== '') {
      const messageObj = {
        sender_id: route.params.senderId,

        receiver_id: route.params.receiverId,

        text: messageText,
      };
      socket.send(JSON.stringify(messageObj));
      setMessages(prev => [
        ...prev,
        {isPersonMessage: false, text: messageText},
      ]);
      setMessageText('');
    }
  };

  useEffect(() => {
    socket.onmessage = e => {
      setMessages(prev => [
        ...prev,
        {isPersonMessage: true, text: JSON.parse(e.data).data.text},
      ]);
    };
  }, [socket]);
  console.log(messages);
  const renderMessage = useCallback(({item}) => {
    console.log(item);
    return (
      <View
        style={
          item.isPersonMessage ? styles.personMessage : styles.companionMessage
        }>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.screenContainer}>
      <FlatList renderItem={renderMessage} data={messages} />
      <TextInput
        style={styles.input}
        onChangeText={text => setMessageText(text)}
        value={messageText}
        placeholder="Введите сообщение"
      />
      <Button title="Отправить" onPress={handleSend} />
    </View>
  );
};
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a1a1a1',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  personMessage: {
    backgroundColor: '#788bb0',
    padding: 10,
    borderRadius: 8,
    margin: 5,
  },
  companionMessage: {
    margin: 5,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: 'black',
  },
});
export default ChatScreen;
