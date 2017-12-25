import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
export default ({ filter, onFilter, count, onClearComplete }) => (
  <View style={styleSheet.container}>
    <Text>{count} Count</Text>
    <View style={styleSheet.filters}>
      <TouchableOpacity
        style={[styleSheet.filter, filter === 'ALL' && styleSheet.selected]}
        onPress={() => onFilter('ALL')}
      >
        <Text>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styleSheet.filter, filter === 'ACTIVE' && styleSheet.selected]}
        onPress={() => onFilter('ACTIVE')}
      >
        <Text>Active</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styleSheet.filter,
          filter === 'COMPLETED' && styleSheet.selected
        ]}
        onPress={() => onFilter('COMPLETED')}
      >
        <Text>Completed</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={onClearComplete}>
      <Text>Clear completed</Text>
    </TouchableOpacity>
  </View>
)

const styleSheet = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filters: {
    flexDirection: 'row'
  },
  filter: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  selected: {
    borderColor: 'rgba(175, 47, 47, .2)'
  }
})
