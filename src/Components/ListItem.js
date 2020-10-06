import React from 'react';
import { useHistory } from 'react-router-dom';
import '../Style/ListItem.scss';
import ic_shipping from '../Assets/ic_shipping.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';

const ListItem = (props) => {
    let history = useHistory();
    const handleClick = (id) => {
        history.push(`/items/${id}`);
    }

    return (
        <div className="item-product">
            {props.products.map(product=>(
                <ListGroup key={product.id} onClick={()=>handleClick(product.id)}>
                    <Row>
                        <Col sm={2}>
                            <Image width="180" height="180" src={product.picture} rounded />
                        </Col>
                        <Col sm={10}>
                            <Col className="price" sm={12}>
                                {product.price.currency} {product.price.amount.toLocaleString(navigator.language, { minimumFractionDigits: product.price.decimals })}
                                {product.free_shipping?<Image src={ic_shipping} />:''}
                            </Col>
                            <Col className="title" sm={12}>
                                {product.title} <br/>
                                {product.condition}
                            </Col>
                        </Col>
                    </Row>
                </ListGroup>
            ))}
        </div>
    );
};

export default ListItem;