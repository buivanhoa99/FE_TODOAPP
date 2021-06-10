import * as types from '../constants'
var initialState = [
    {title : "Job0 ",status : true},
    {title : "Job1 ",status : true},
    {title : "Job2",status : false},
    {title : "Job3",status : true},
  ];



const myReducer = (state=initialState,action) =>{
    let newState = [...state];
    switch (action.type) {
        case types.LIST_ALL:
            console.log("reducer",state);
            return state;            
        case types.AddItem:
            newState = [...state,action.task];
            return newState;
        case types.onClickItem:
            newState[action.index].status = !newState[action.index].status;
            return newState;
        case types.onDeleteTask:
            newState.splice(action.index,1);
            return newState;
        case types.SetTasks:
            newState = action.data;
            return newState
        default:
            return state;

    }
    
}
export default myReducer;