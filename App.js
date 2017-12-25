import React from 'react'
import Row from './Row'
import Header from './Header'
import Footer from './Footer'
import {
  AsyncStorage,
  ListView,
  Keyboard,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'

const filterItems = (filter, items) => {
  return items.filter(item => {
    if (filter === 'ALL') return true
    if (filter === 'COMPLETED') return item.complete
    if (filter === 'ACTIVE') return !item.complete
  })
}
export default class App extends React.Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: true,
      allComplete: false,
      filter: 'ALL',
      value: '',
      items: [],
      dataSource: ds.cloneWithRows([]),
    }
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this)
    this.setSource = this.setSource.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleToggleComplete = this.handleToggleComplete.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleClearComplete = this.handleClearComplete.bind(this)
    this.handleUpdateText = this.handleUpdateText.bind(this)
    this.handleToggleEditing = this.handleToggleEditing.bind(this)
  }
  componentWillMount() {
    AsyncStorage.getItem('items').then(json => {
      try {
        const items = JSON.parse(json)
        this.setSource(items, items, { loading: false })
      } catch (e) {
        this.setState({ loading: false })
      }
    })
  }
  handleClearComplete() {
    const newItems = filterItems('ACTIVE', this.state.items)
    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }
  handleFilter(filter) {
    this.setSource(this.state.items, filterItems(filter, this.state.items), {
      filter,
    })
  }
  handleUpdateText(key, text) {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return item
      return {
        ...item,
        text,
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }
  handleToggleEditing(key, editing) {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return item
      return {
        ...item,
        editing,
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }
  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return item
      return {
        ...item,
        complete,
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }
  handleRemoveItem(key) {
    const newItems = this.state.items.filter(item => item.key !== key)
    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }
  setSource(items, itemsDataSoure, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSoure),
      ...otherState,
    })
    AsyncStorage.setItem('items', JSON.stringify(items))
  }
  handleToggleAllComplete() {
    const complete = !this.state.allComplete
    const newItems = this.state.items.map(item => ({
      ...item,
      complete,
    }))
    this.setSource(newItems, filterItems(this.state.filter, newItems), {
      allComplete: complete,
    })
    console.table(newItems)
  }
  handleAddItem() {
    if (!this.state.value) return
    const newItems = [
      ...this.state.items,
      { key: Date.now(), text: this.state.value, complete: false },
    ]
    this.setSource(newItems, filterItems(this.state.filter, newItems), {
      value: '',
    })
  }
  render() {
    return (
      <View style={stylesheet.container}>
        <Header
          onToggleAllComplete={this.handleToggleAllComplete}
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={value => this.setState({ value })}
        />
        <View style={stylesheet.content}>
          <ListView
            style={stylesheet.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({ key, ...value }) => {
              console.log({ ...value })
              return (
                <Row
                  key={key}
                  {...value}
                  onUpdate={text => this.handleUpdateText(key, text)}
                  onToggleEdit={editing => {
                    this.handleToggleEditing(key, editing)
                  }}
                  onRemove={() => this.handleRemoveItem(key)}
                  onComplete={complete =>
                    this.handleToggleComplete(key, complete)
                  }
                />
              )
            }}
            renderSeperator={(sectionId, rowId) => {
              return <View key={rowId} style={stylesheet.seperator} />
            }}
          />
        </View>
        <Footer
          filter={this.state.filter}
          onFilter={this.handleFilter}
          onClearComplete={this.handleClearComplete}
          count={filterItems('ACTIVE', this.state.items).length}
        />
        {this.state.loading && (
          <View style={stylesheet.loading}>
            <ActivityIndicator animating size="large" />
          </View>
        )}
      </View>
    )
  }
}

const stylesheet = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.2)',
  },
  list: {},
  seperator: {
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    paddingTop: 30,
  },
  content: { flex: 1 },
})
