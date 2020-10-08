import React, { useState, useEffect }  from 'react';
import '../Style/List.scss';
import {getListProducts} from '../Api/Api';
import ListItem from './ListItem';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup'
import queryString from 'query-string';
/**
 * componenete encargado de generar el listado de de los prouductos haciendo uso de los queryparams pasados
 */
const List = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const values = queryString.parse(props.location.search);
        const fetchData = async () => {
            if(values.search){
                const resultProducts = await getListProducts(values.search);
                setProducts(resultProducts);
            }
        };
        
        fetchData();
    },[props.location.search]);

    if (products.categories && products.items) {
        return (
            <div>
                <Container>
                    <Breadcrumb>
                        {products.categories.map((breadcrumb,index,array)=>{
                            return array.length-1===index?<Breadcrumb.Item active key={index} href="#">{breadcrumb}</Breadcrumb.Item>:<Breadcrumb.Item key={index} href="#">{breadcrumb}</Breadcrumb.Item>
                        })}
                    </Breadcrumb>
                    <ListGroup variant="flush">
                        <ListItem products={products.items}/>
                    </ListGroup>
                </Container>
            </div>
        );
    }else{
        return (<div></div>);
    }
};

export default List;