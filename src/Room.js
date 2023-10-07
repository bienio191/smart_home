import { useState, useEffect } from "react";
import Device from './Device';
import { Card, Tabs, Tab } from 'react-bootstrap';
import Group from "./Group";

const Room = (props) => {

    const [key, setKey] = useState('group');

    const handleTabChange = (key) => {
        props.handleTabChange(key);
        setKey(key);
    };


    return (

        <Card className='card_room'>
            <Card.Header>{props.name}</Card.Header>
            <Card.Body>
                <Tabs
                    id="tabs"
                    activeKey={key}
                    onSelect={(k) => handleTabChange(k)}
                    className="mb-3"
                >
                    <Tab eventKey="group" title="Groups">
                        {props.groupsList.map(group => (
                            <Card.Text key={group.id}>
                                <Group group={group} key={key} />
                            </Card.Text>
                        ))}
                    </Tab>
                    <Tab eventKey="device" title="Devices">
                        {props.devicesList.map(device => (
                            <Card.Text key={device.id}>
                                <Device device={device} key={key} />
                            </Card.Text>
                        ))}
                    </Tab>
                </Tabs>
            </Card.Body>
        </Card >

    );
}

export default Room;