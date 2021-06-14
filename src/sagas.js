import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import TodoItemApi from './api/TodoItemAPI';
import * as types from './constants'
import * as actions from './actions'
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser() {

   try {
      const user = yield call(TodoItemApi.GetAllItems);
      let new_user = user.map(value=>({
          id : value.id,
          title : value.name,
          status : value.status
      }))

      yield put(actions.SetTasks(new_user));
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

function* AddTask(action){
    console.log("FROM SAGA ADD");
    const new_item = {
        name : action.task.title,
        status : action.task.status
    }
    console.log(new_item);
    const res = yield call(TodoItemApi.AddItem,new_item);
    console.log("RES",res);
    yield put(actions.ListAllBySaga());
}

function* ChangeStatusAPI(action){
    const new_item = {
        id : action.task.id,
        name : action.task.title,
        status : !action.task.status
    }
    console.log("New item",new_item);
    const res = yield call(TodoItemApi.ChangeStatusItem,new_item)
    yield put(actions.ListAllBySaga());
}

function* mySaga() {
  yield takeEvery(types.ListAllBySaga, fetchUser);
  yield takeEvery(types.AddTaskBySaga,AddTask);
  yield takeEvery(types.ChangeStatusAPI,ChangeStatusAPI);
}


export default mySaga;