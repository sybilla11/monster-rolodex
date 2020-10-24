import React, { Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import {Searchbox} from './components/search-box/search-box.component'

class App extends Component {
  state = {
    monsters:[],
    searchField: ''
  };

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => 
      response.json())
      .then(users => this.setState({monsters:users}));
  }

  changeHandler = (e) => {
    this.setState({searchField: e.target.value});
  };
  render(){
    const {monsters, searchField} = this.state;
    const filteredMonster = monsters.filter(monster => 
monster.name.toLowerCase().includes(searchField.toLowerCase()));
    return (
  <div>
  <h1>Monster Rolodex</h1>
 <Searchbox placeholder = 'search Monster' changeHandle = {this.changeHandler}></Searchbox>
  <CardList monsters={filteredMonster}>
  </CardList>
</div>
  );}
}

export default App;
