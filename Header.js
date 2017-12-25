import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native'

const Header = ({ value, onChange, onAddItem, onToggleAllComplete }) => (
  <View style={headerStyles.header}>
    <TouchableOpacity onPress={onToggleAllComplete}>
      <Text style={headerStyles.toggleIcon}>{String.fromCharCode(10003)}</Text>
    </TouchableOpacity>
    <TextInput
      value={value}
      onChangeText={onChange}
      onSubmitEditing={onAddItem}
      placeholder="What needs to be done?"
      blurOnSubmit={false}
      returnKeyType="done"
      style={headerStyles.input}
    />
  </View>
)

const headerStyles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ececec'
  },
  input: {
    flex: 1,
    marginLeft: 16,
    height: 50
  },
  toggleIcon: {
    fontSize: 30,
    color: '#CCCCCC'
  }
})
export default Header
