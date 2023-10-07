import { useEffect, useState } from "react";
import { Button, Col, Container, Row, ButtonGroup, ToggleButton } from 'react-bootstrap';

const Group = (props) => {

    var group = props.group;

    const [key, setKey] = useState(props.key);
    const [lastUpdated, setLastUpdated] = useState(props.lastUpdated);
    const [state, setState] = useState(group.action.on);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    const [data, setData] = useState({ data: [] });


    useEffect(() => {
        setState(group.action.on);
    }, [key, lastUpdated]);

    const handleClick = async (id, state) => {
        sendStateAPI(id, state);
    };

    const refreshApp = () => {
        props.handleRefreshApp(Date.now());
    };

    const sendStateAPI = async (id, state) => {
        setIsLoading(true);
        let url = 'http://192.168.1.251/api/9xUtlSPAoUhmbEpx7ylwbkc2v6pYDvD9LNjFHS62/groups/' + id + '/action';
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
            refreshApp();
        } catch (err) {
            setErr('Request failed - try again later. (' + err.message + ')');
        } finally {
            setIsLoading(false);
        }

    };


    return (

        <div>
            <Container className="container_group">
                <Row className="row_group">
                    <Col className='col-3 column_group'>{group.name}</Col>
                    {isLoading &&
                        <Col className='col-9 column_group'>
                            <div>Please wait, sending state to api...</div>
                        </Col>
                    }
                    {!isLoading &&
                        <Col className='col-9'>
                            <ButtonGroup>
                                <ToggleButton
                                    key={`gr-radio-${group.id}-Off`}
                                    id={`gr-radio-${group.id}-Off`}
                                    type="radio"
                                    variant='outline-danger'
                                    name={`gr-radio-${group.id}-Off`}
                                    value='false'
                                    checked={state == false}
                                    onChange={(e) => handleClick(group.id, false)}
                                >
                                    OFF
                                </ToggleButton>
                                <ToggleButton
                                    key={`gr-radio-${group.id}-On`}
                                    id={`gr-radio-${group.id}-On`}
                                    type="radio"
                                    variant='outline-success'
                                    name={`gr-radio-${group.id}-Off`}
                                    value='true'
                                    checked={state == true}
                                    onChange={(e) => handleClick(group.id, true)}
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

export default Group;
