import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../route/mainNavigarion';
import {SvgUri} from 'react-native-svg';

type ChatListScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'ChatList'
>;

const ChatList = ({route, navigation}: ChatListScreenNavigationProp) => {
  const [chats, setChats] = useState([]);
  const [socket, setSocket] = useState<WebSocket>();
  useEffect(() => {
    const ws = new WebSocket(BASE_URL, null, {
      headers: {
        Cookie: `token=${route.params.id}`,
      },
    });
    ws.onerror = err => {
      console.log(err);
    };
    ws.onmessage = event => {
      JSON.parse(event.data).message_type !== 'CHAT' &&
        setChats(JSON.parse(event.data));
    };
    setSocket(ws);
  }, [route.params.id]);
  const renferItem = useCallback(
    item => {
      return (
        <TouchableOpacity
          onPress={() =>
            socket &&
            navigation.navigate('ChatScreen', {
              receiverId: item.item.user_id,
              senderId: route.params.id,
              socket: socket,
            })
          }>
          <View style={styles.chatItem}>
            <SvgUri width={50} height={50} uri={item.item.photo_url} />
            <Text style={styles.text}>{item.item.username}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation, route.params.id, socket],
  );

  return (
    <View style={styles.screen}>
      <FlatList data={chats} renderItem={renferItem} />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#799190ff',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    height: 70,
    backgroundColor: '#ffffff',
    margin: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
});
export default ChatList;
