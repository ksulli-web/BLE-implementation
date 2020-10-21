import React, {Component} from 'react';
import {
  FlatList,
  Button,
  StyleSheet
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';

class App extends React.Component {
  constructor() {
    super();
    this.manager = new BleManager();
    this.state = {
      items: []
    }
}

scanAndConnect() {
  var {items} = this.state;
  this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
          // Handle error (scanning will be stopped automatically)
          return
      }
      
      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      if (device.name === 'TI BLE Sensor Tag' || 
          device.name === 'SensorTag') {
          
          // Stop scanning as it's not necessary if you are scanning for one device.
          this.manager.stopDeviceScan();

          // Proceed with connection.
      }

      items.push({
        key: device.id,
        name: device.name 
      })
  });
  this.setState(items);
}

render(){
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  return (
    <>
      <Button title="Scan" onPress={()=>this.scanAndConnect()} />
      <FlatList
        data={this.state.items}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </>
  )
  }


}
export default App;