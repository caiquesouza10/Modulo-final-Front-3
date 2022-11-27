import { combineReducers } from '@reduxjs/toolkit';
import users from './modules/users/usersSlice';
import recados from './modules/recados/recadosSlice';
import userLogged from './modules/users/userLogged';
import config from './modules/config/ConfigSlice'

const combinedReducers = combineReducers({
  users,
  recados,
  userLogged,
  config,
});

export type State = ReturnType<typeof combineReducers>

export default combinedReducers;