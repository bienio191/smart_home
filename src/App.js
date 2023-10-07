import Navigation from './Navigation';
import Room from './Room';
import { useEffect, useState } from "react";

import './App.css';

function App() {

  const [devices, setDevices] = useState(null)


  useEffect(() => {
    var devicesList = []

    fetch('http://192.168.1.251/api/9xUtlSPAoUhmbEpx7ylwbkc2v6pYDvD9LNjFHS62/lights/')
      .then(res => {
        return res.json();
      })
      .then(data => {
        Object.keys(data).forEach(function (key) {
          var device = {};
          //to be splint into lukasz/angela in the future
          device.room = 'lukasz_office';
          device.id = key;
          device.state = data[key].state; 
          device.name = data[key].name; 
          devicesList.push(device);
        });

        setDevices(devicesList);
      })
  }, [])

  return (
    <div>
      <Navigation />
      {devices && <Room
        name='Angela Office'
        devicesList = {[]}
      />}

      {devices && <Room
        name='Łukasz Office'
        devicesList = {devices}
      />}
    </div>
  );
}

export default App;

