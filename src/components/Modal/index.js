import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {Form,Button} from 'react-bootstrap'
import {connect} from 'react-redux'

import * as actions from '../../actions'

function MyModal (props) {
    const {isShow,setIsShow,OnAddTask} = props;
    const [input,setInput] = useState("");
    const [status,setStatus] = useState(false);
    function closeModal(){
        setIsShow(false);
    }

    function handleClick(e){
        e.preventDefault();
        console.log(input);
        console.log(status);
        const task = {
            title : input,
            status : status,
        }
        OnAddTask(task);
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
        <Button onClick= {handleClick} variant="primary"  type="submit">
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
        OnAddTask : (task) =>{
          dispatch(actions.AddTask(task))
        },

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
