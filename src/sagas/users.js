import { takeEvery, takeLatest, call, fork, put, take } from "redux-saga/effects";
import * as actions from "../actions/users";
import * as api from "../api/users";

function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(
      actions.getUsersSuccess({
        items: result.data.data,
      })
    );
    console.log(result);
  } catch (e) {
    yield put(actions.userError({
        error: 'An error occurred when trying to get the user'
    }))
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* watchCreateUsersRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUsers);
}

function* createUsers(action) {
  try {
     yield call(api.createUsers, {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
    });
    yield call(getUsers)
  } catch (e) {
    yield put(actions.userError({
        error: 'An error occurred when trying to create the user'
    }))
  }
}

function* deleteUser({userId}){
    try{
        yield call(api.deleteUser, userId)
    } catch(e){
        yield put(actions.userError({
            error: 'An error occurred when trying to delete the user'
        }))
    }
}

function* watchDeleteUserRequest(){
    while(true){
        const action = yield take(actions.Types.DELETE_USER_REQUEST);
        yield call(deleteUser, {userId: action.payload.id})
    }
   
}



const usersSagas = [fork(watchGetUsersRequest), fork(watchCreateUsersRequest), fork(watchDeleteUserRequest)];

export default usersSagas;
