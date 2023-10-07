import { useEffect, useState } from "react";
import { Button, Col, Container, Row, ButtonGroup, ToggleButton } from 'react-bootstrap';

const Device = (props) => {

    var device = props.device;

    const [state, setState] = useState(device.state.on);
    const [isReachable, setIsReachable] = useState(device.state.reachable);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    const [data, setData] = useState({ data: [] });


    const handleClick = async (id, state) => {
        sendStateAPI(id, state);
    };

    const sendStateAPI = async (id, state) => {
        setIsLoading(true);
        let url = 'http://192.168.1.251/api/9xUtlSPAoUhmbEpx7ylwbkc2v6pYDvD9LNjFHS62/lights/' + id + '/state';
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    on: state
                }),
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();

            setData(result);
            setState(state);
        } catch (err) {
            setErr('Request failed - try again later. (' + err.message + ')');
        } finally {
            setIsLoading(false);
        }

    };


    return (

        <div>
            <Container className="container_device">
                <Row className="row_device">
                    <Col className='col-3 column_device'>{device.name}</Col>
                    {isLoading &&
                        <Col className='col-9 column_device'>
                            <div>Please wait, sending state to api...</div>
                        </Col>
                    }
                    {!isReachable &&
                        <Col className='col-9 column_device error_msg'>
                            <div>Device is not reachable.</div>
                        </Col>
                    }
                    {!isLoading && isReachable &&
                        <Col className='col-9'>
                            <ButtonGroup>
                                <ToggleButton
                                    key={`radio-${device.id}-Off`}
                                    id={`radio-${device.id}-Off`}
                                    type="radio"
                                    variant='outline-danger'
                                    name={`radio-${device.id}-Off`}
                                    value='false'
                                    checked={state == false}
                                    onChange={(e) => handleClick(device.id, false)}
                                >
                                    OFF
                                </ToggleButton>
                                <ToggleButton
                                    key={`radio-${device.id}-On`}
                                    id={`radio-${device.id}-On`}
                                    type="radio"
                                    variant='outline-success'
                                    name={`radio-${device.id}-Off`}
                                    value='true'
                                    checked={state == true}
                                    onChange={(e) => handleClick(device.id, true)}
                                >
                                    ON
                                </ToggleButton>
                            </ButtonGroup>


                            {err &&
                                <span className="error_msg">{err}</span>
                            }
                        </Col>
                    }
                </Row>
            </Container>
        </div >
    );
}

export default Device;
