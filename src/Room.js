import Device from './Device';
import { Card, Container } from 'react-bootstrap';

const Room = (props) => {

    return (

        <Card className='card_room'>
            <Card.Header>{props.name}</Card.Header>
            <Card.Body>
                {props.devicesList.map(device => (
                    <Card.Text key={device.id}>
                        <Device device={device} />
                    </Card.Text>
                ))}
            </Card.Body>
        </Card>

    );
}

export default Room;