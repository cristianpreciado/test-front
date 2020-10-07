import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Style/App.scss';
import SearchBar from './Components/SearchBar';
import List from './Components/List';
import ItemDetail from './Components/ItemDetail';

const App = () => (
  <Router>
    <Route path="/" component={SearchBar}></Route>
    <Route exact path="/items" component={List}></Route>
    <Route exact path="/items/:id" component={ItemDetail}></Route>
  </Router>
);

export default App;
