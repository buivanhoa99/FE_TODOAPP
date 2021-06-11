import TodoItemsAPI from '../api/TodoItemAPI'
import * as types from '../constants'
var initialState  = [];

const myReducer = (state=initialState,action) =>{
    let newState = [...state];
    switch (action.type) {
        case types.LIST_ALL:
            return state;            
        case types.AddItem:
            // newState = [...state,action.task];
            // console.log("ADD ITEM",action.task);
            return newState;
        case types.onClickItem:
            newState[action.index].status = !newState[action.index].status;
            return newState;
        case types.onDeleteTask:
            // console.log("DELETE NE");
            // newState.splice(action.index,1);
            return newState;
        case types.SetTasks:
            console.log("SETTASK ne");
            console.log("DATA:",action.data);
            newState = action.data;
            return newState
        default:
            return state;
            

    }
    
}
export default myReducer;