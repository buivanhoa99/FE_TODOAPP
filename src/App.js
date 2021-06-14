import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,


  Link, Route
} from "react-router-dom";
import * as actions from './actions';
import './App.css';
import Modal from './components/Modal/index';
import TodoItem from './components/TodoItem';

const Index1 = ()=>(<h1>Index</h1>)
const About = ()=>(<h1>About</h1>)
function App(props) {
  const {todos,OnAddTask,onClickTask,onDeleteTask,AddTasks,GETALLTASKAPI,ADDTASKAPI,DeleteTaskAPI,ListAllBySaga,AddTaskBySaga,ChangeStatusAPI} = props;
  console.log("ABC",todos);
  const [listItem,setListItem] = useState(todos);
  const [inputValue,setInputValue] = useState("");
  const [searchValue,setSearchValue] = useState("");
  const [filteredData,setFilteredData] = useState(todos)
  const [isShow,setIsShow] = useState(false);
  console.log(inputValue);
  console.log("TODOSSSSSSS",todos);
  useEffect(()=>{
    // GETALLTASKAPI();
    ListAllBySaga();
  },[]);


  useEffect(()=>{
    console.log("TODOSS",todos);
    setFilteredData(todos);
  },[todos])


  useEffect(()=>{
    if (searchValue.length==0){
      setFilteredData(todos)
    }
    else {
      console.log(filteredData);
      let x = todos.filter(value=>
        value.title.toLowerCase().indexOf(searchValue.toLowerCase())>=0
      );
      console.log("xxX",x);
      setFilteredData(x);
    }
  },[searchValue])


  function onKeyPress(value){
    const a = document.getElementById("addItem").value;
    if (value.charCode==13){
      const newItem = {title: a,status:false}
      console.log(newItem);
      AddTaskBySaga(newItem);
      setInputValue("");
    }
  }



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
    <Modal
      isShow = {isShow}
      setIsShow = {setIsShow}
      AddTaskBySaga = {AddTaskBySaga}
    />

    <div className="App">
      <header className="App-header">
        <input  id="addItem" value ={inputValue} onChange = {onChange} type="text" onKeyPress= {onKeyPress} ></input>
        <input id="search" value = {searchValue} onChange = {onChangeInput} type="text"/>
        <button onClick = {()=>{setIsShow(true)}}>Add</button>
        {filteredData.map((value,index) => 
            <TodoItem 
              item = {value}
              key = {index}
              onClick = {()=>{ChangeStatusAPI(value)}}
              onItemDelete = {()=>{
                DeleteTaskAPI(value.id);
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
      ListAllBySaga : ()=>{
        dispatch(actions.ListAllBySaga());
      },
      AddTaskBySaga : (task)=>{
        dispatch(actions.AddTaskBySaga(task));
      },
      onClickTask : (index) =>{
        dispatch(actions.onItemClick(index));
      },
      onDeleteTask : (index) =>{
        dispatch(actions.onDeleteTask(index))
      },
      AddTasks : (data) =>{
        dispatch(actions.SetTasks(data));
      },
      GETALLTASKAPI : ()=>{
        dispatch(actions.GETALLTASKAPI());
      },
      ADDTASKAPI : (task)=>{
        dispatch(actions.ADDTASKAPI(task));
      },
      DeleteTaskAPI : id =>{
        dispatch(actions.DeleteTaskAPI(id));
      },
      ChangeStatusAPI : task =>{
        dispatch(actions.ChangeStatusAPI(task));
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
