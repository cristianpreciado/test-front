import React, { useState, useEffect }  from 'react';
import '../Style/List.scss';
import {getListProducts} from '../Api/Api';
import ListItem from './ListItem';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup'
import queryString from 'query-string';

const List = (props) => {
    const search=props.location.search;
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const values = queryString.parse(query);
        const fetchData = async () => {
            if(values.search){
                const resultProducts = await getListProducts(values.search);
                setProducts(resultProducts);
            }
        };
        setQuery(search);
        fetchData();
    },[query]);


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