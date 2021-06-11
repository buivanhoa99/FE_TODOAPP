import TodoItemAPI from '../api/TodoItemAPI'
import * as types from '../constants'
export const listAll = () =>(
    {
        type : types.LIST_ALL
    }
)
export const AddTask = (task) => (
    {
        type : types.AddItem,
        task,
    }
)
export const onClick = () => (
    {
        type : types.onClickItem,
    }
)
export const onItemClick = (index) => (
    {
        type : types.onClickItem,
        index
    }
)
export const onDeleteTask = (index) =>(
    {
        type : types.onDeleteTask,
        index,
    }
)
export const SetTasks = (data) =>(
    {
        type : types.SetTasks,
        data,
    }
)

export const ADDTASKAPI =  task =>{
    console.log("XXXXXXXXXXXXX");

    return async dispatch =>{
        const data = {
            name : task.title,
            status : task.status,
        }
        const x = await TodoItemAPI.AddItem(data);
        dispatch(AddTask(task));
        dispatch(GETALLTASKAPI());
        // TodoItemAPI.AddItem(data)
        //     .then(res=>{
        //         console.log("RES LA :",res);
        //         dispatch(AddTask(task));
        //         dispatch(GETALLTASKAPI());
        //     })
        //     .catch(err=>{
        //         console.log(err);
        //     })
    }
}

export const DeleteTaskAPI =  id=>{
    return dispatch =>{
        TodoItemAPI.DeleteItem(id)
            .then(res=>{
                dispatch(onDeleteTask(id));
                dispatch(GETALLTASKAPI());
            })
            .catch(err=>console.log(err));

    }
}

export const ChangeStatusAPI =  id=>{
    return async dispatch =>{
        TodoItemAPI.DeleteItem(id)
            .then(res=>{
                dispatch(onDeleteTask(id));
                dispatch(GETALLTASKAPI());
            })
            .catch(err=>console.log(err));

    }
}

export const GETALLTASKAPI = () =>{
        return dispatch =>{
             TodoItemAPI.GetAllItems()
                .then(res=>{
                    console.log("RES",res);
                    const data  = res.map(x => {
                        return {
                            id : x.id,
                            title : x.name,
                            status : x.status
                        }
                    })
                    dispatch(SetTasks(data));
                })
                .catch(err=>console.log(err));
        }
}