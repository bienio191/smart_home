import Navigation from './Navigation';
import Room from './Room';
import { useEffect, useState } from "react";

import './App.css';

function App() {

  const [devices, setDevices] = useState(null);
  const [groups, setGroups] = useState(null);
  const [tabKey, setTabKey] = useState(null);


  useEffect(() => {
    var devicesList = [];
    var groupsList = [];
    setDevices([]);
    setGroups([]);

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

    fetch('http://192.168.1.251/api/9xUtlSPAoUhmbEpx7ylwbkc2v6pYDvD9LNjFHS62/groups/')
      .then(res => {
        return res.json();
      })
      .then(data => {
        Object.keys(data).forEach(function (key) {
          var group = {};
          group = data[key];
          //to be splint into lukasz/angela in the future
          group.room = 'lukasz_office';
          group.id = key;
          groupsList.push(group);
        });

        setGroups(groupsList);
      })

      console.log('data reloaded');
  }, [tabKey])

  return (
    <div>
      <Navigation />
      {devices && groups && <Room
        name='Angela Office'
        devicesList={[]}
        groupsList={[]}
        handleTabChange={setTabKey}
      />}

      {devices && groups && <Room
        name='Łukasz Office'
        devicesList={devices}
        groupsList={groups}
        handleTabChange={setTabKey}
      />}
    </div>
  );
}

export default App;

