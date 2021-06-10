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
        type : types.onDeleteTask,
        data,
    }
)