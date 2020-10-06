import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Style/SearchBar.scss';
import logo from '../Assets/Logo_ML.png';
import iconSearch from '../Assets/ic_Search.png';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

const SearchBar = (props) => {
    let history = useHistory();
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/items?search=${value}`);
    }

    return (
        <div className="container-search">
            <Container>
                <Row>
                    <Col sm={1}>
                        <img src={logo} alt="logo" />
                    </Col>
                    <Col sm={11}>
                        <Form onSubmit={(e)=>handleSubmit(e)}>
                            <InputGroup className="mb-3">
                                <FormControl className="input-search"
                                placeholder="Nunca dejes de buscar"
                                value={value} 
                                onChange={(e)=>setValue(e.target.value)}
                                />
                                <InputGroup.Append>
                                <Button type="submit" variant="search">
                                    <Image src={iconSearch} />
                                </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SearchBar;