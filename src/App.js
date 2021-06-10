import logo from './logo.svg';
import './App.css';
import TodoItem from './components/TodoItem';
import { useState,useEffect } from 'react';
import TrafficLight from './components/TrafficLight';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {connect} from 'react-redux'
import * as actions from './actions'
const Index1 = ()=>(<h1>Index</h1>)
const About = ()=>(<h1>About</h1>)
function App(props) {
  const {todos,OnAddTask,onClickTask,onDeleteTask,AddTasks} = props;
  
  const [listItem,setListItem] = useState(todos);
  const [inputValue,setInputValue] = useState("");
  const [searchValue,setSearchValue] = useState("");
  const [filteredData,setFilteredData] = useState(todos)
  console.log(inputValue);
  
  useEffect(()=>{
    if (searchValue.length==0){
      setFilteredData(listItem)
    }
    else {
      console.log(filteredData);
      let x = listItem.filter(value=>
        value.title.toLowerCase().indexOf(searchValue.toLowerCase())>=0
      );
      console.log("xxX",x);
      setFilteredData(x);
    }
  },[searchValue])


  const x =localStorage.getItem("Init");
  function onItemClick(value,index){
    let a = [...listItem];
    a[index].status = !a[index].status;
    setListItem(a);
  }
  function onKeyPress(value){
    const a = document.getElementById("addItem").value;
    if (value.charCode==13){
      const newItem = {title: a,status:false}
      console.log(newItem);
      OnAddTask(newItem)
      setInputValue("");
    }
  }

  function onItemDelete(index){
    let a = [...listItem]
    a.splice(index,1);
    setListItem(a);
    console.log(index);
  };

  function onChange(e){
    setInputValue(e.target.value);
  }
  function onChangeInput(e){
    setSearchValue(e.target.value);
  }

  return (
    <Router>
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
    <div className="App">
      <header className="App-header">
        <input  id="addItem" value ={inputValue} onChange = {onChange} type="text" onKeyPress= {onKeyPress} ></input>
        <input id="search" value = {searchValue} onChange = {onChangeInput} type="text"/>
        {filteredData.map((value,index) => 
            <TodoItem 
              item = {value}
              key = {index}
              onClick = {()=>{onClickTask(index)}}
              onItemDelete = {()=>{
                onDeleteTask(index);
              }}
            />
        )}
        <Route path ="/" exact component = {Index1}/>
        <Route path ="/about" exact component = {About}/>


      </header>
    </div>
    </Router>
  );
}
const mapStateToProps = state =>{
  return {
    todos : state.tasks,
  }
}

const mapDispatchToProps = (dispatch,props) =>{
  return {
      OnAddTask : (task) =>{
        dispatch(actions.AddTask(task))
      },
      onClickTask : (index) =>{
        dispatch(actions.onItemClick(index));
      },
      onDeleteTask : (index) =>{
        dispatch(actions.onDeleteTask(index))
      },
      AddTasks : (data) =>{
        dispatch(actions.SetTasks(data));
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
