import React, { Component } from 'react';
import '../Style/ItemDetail.scss';
import {getItemDetail} from '../Api/Api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ic_shipping from '../Assets/ic_shipping.png';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

class ItemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {detailProduct: []};
    }

    componentDidMount = async () =>{
        const resultProductDetail = await getItemDetail(this.props.match.params.id);
        this.setState({ detailProduct: resultProductDetail });
    }

    render(){
        const detailProduct = this.state.detailProduct.item;
        if(detailProduct){
            return (
                <div>
                    <Container>
                        <Breadcrumb>
                            <Breadcrumb.Item active href="#">celular</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row className="container-detail">
                            <Col sm={8}>
                                <Image width="680" src={detailProduct.picture} />
                            </Col>
                            <Col sm={4}>
                                <Col className="consition-sold-quantity" sm={12}>
                                    {detailProduct.condition} - {detailProduct.sold_quantity} vendidos
                                </Col>
                                <Col className="title" sm={12}>
                                    {detailProduct.title} <br/>
                                </Col>
                                <Col className="price" sm={12}>
                                    {detailProduct.price.currency} {detailProduct.price.amount.toLocaleString(navigator.language, { minimumFractionDigits: detailProduct.price.decimals })}
                                    {detailProduct.free_shipping?<Image src={ic_shipping} />:''}
                                </Col>
                                <Col sm={12}>
                                    <Button variant="primary btn-buy" size="lg" block>
                                        Comprar
                                    </Button>
                                </Col>
                            </Col>
                        </Row>
                        <Row className="container-detail">
                            <Col className="title-descripcion" sm={12}>
                                Descripción del producto
                            </Col>
                            <Col className="description" sm={12}>
                                {detailProduct.description}
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }else{
            return (<div></div>);
        }
    }
}
export default ItemDetail;