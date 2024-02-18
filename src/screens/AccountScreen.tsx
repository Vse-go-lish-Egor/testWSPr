import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../route/mainNavigarion';
import {USER_ID_700, USER_ID_701} from '@env';
type AccountScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'AccountScreen'
>;
const AccountScreen = ({navigation}: AccountScreenNavigationProp) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          navigation.navigate('ChatList', {id: USER_ID_700});
        }}>
        <Text>Go to 700</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          navigation.navigate('ChatList', {id: USER_ID_701});
        }}>
        <Text>Go to 701</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 50,
    margin: 10,
    backgroundColor: '#8b9997',
  },
});
export default AccountScreen;
