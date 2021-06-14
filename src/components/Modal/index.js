import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {Form,Button} from 'react-bootstrap'
import {connect} from 'react-redux'

import * as actions from '../../actions'

function MyModal (props) {
    const {isShow,setIsShow,OnAddTask,AddTaskBySaga} = props;
    const [input,setInput] = useState("");
    const [status,setStatus] = useState(false);

    useEffect(()=>{
        setInput("");
        setStatus(false);
    },[isShow])

    function closeModal(){
        setIsShow(false);
    }

    function handleClick(e){
        e.preventDefault();
        const task = {
            title : input,
            status : status==='true',
        }
        AddTaskBySaga(task);
        closeModal();
    }
    function handleChange(e){
        setInput(e.target.value);
    }
    function handleChangeSelect(e) {
        setStatus(e.target.value);
    }

    return (
        <Modal
            ariaHideApp = {false}
            isOpen={isShow}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={customStyles}
        >

        <Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Task</Form.Label>
            <Form.Control value={input} onChange ={handleChange} type="text" placeholder="Enter Task" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Status</Form.Label>
        <div>
            <select value ={status} onChange = {handleChangeSelect}>
                <option value= {true}>Hoàn thành</option>
                <option value = {false}>Chưa hoàn thành</option>
            </select>
        </div>
        </Form.Group>
        <br></br>
        <Button onClick= {handleClick} variant="primary" >
            Add
        </Button>
        </Form>
      </Modal>

    )
}

const mapStateToProps = state =>{
    return {
    //   todos : state.tasks,
    }
  }
  const mapDispatchToProps = (dispatch,props) =>{
    return {

        OnAddTaskSaga : task =>{
            dispatch(actions.AddTaskBySaga(task));
        }

    }
  }
  

export default connect(mapStateToProps,mapDispatchToProps)(MyModal)

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
