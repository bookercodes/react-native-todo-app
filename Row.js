import React from 'react'
import {
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const Row = ({
  text,
  complete,
  editing,
  onComplete,
  onRemove,
  onUpdate,
  onToggleEdit,
}) => {
  const textComponent = (
    <TouchableOpacity
      style={rowStyles.textWrap}
      onLongPress={() => onToggleEdit(true)}
    >
      <Text style={[rowStyles.text, complete && rowStyles.complete]}>
        {text}
      </Text>
    </TouchableOpacity>
  )
  const removeButton = (
    <TouchableOpacity onPress={onRemove}>
      <Text style={rowStyles.destroy}>Delete</Text>
    </TouchableOpacity>
  )
  const editingComponent = (
    <View style={rowStyles.textWrap}>
      <TextInput
        onChangeText={onUpdate}
        autoFocus
        value={text}
        style={rowStyles.input}
        multiline
      />
    </View>
  )
  const doneButton = (
    <TouchableOpacity
      style={rowStyles.done}
      onPress={() => onToggleEdit(false)}
    >
      <Text style={rowStyles.doneText}>Save</Text>
    </TouchableOpacity>
  )
  return (
    <View style={rowStyles.container}>
      <Switch value={complete} onValueChange={onComplete} />
      {editing ? editingComponent : textComponent}
      {editing ? doneButton : removeButton}
    </View>
  )
}

const rowStyles = StyleSheet.create({
  done: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#7be290',
    padding: 7,
  },
  doneText: {
    color: '#4d4d4d',
    fontSize: 20,
  },
  input: {
    height: 100,
    flex: 1,
    fontSize: 24,
    padding: 0,
    color: '#4d4d4d',
  },
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10,
  },
  complete: {
    textDecorationLine: 'line-through',
  },
  text: {
    fontSize: 24,
    color: '#4d4d4d',
  },
  destroy: {
    fontSize: 20,
    color: '#cc9a9a',
  },
})
export default Row
