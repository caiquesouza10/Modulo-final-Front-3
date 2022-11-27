// REFLEXÃO - o dado que vou manipular/representar de forma global neste reducer é uma lista?
// SIM - precisa de um adapter
// NAO - um slice serve

// adapter - gerenciador da entidade (user, recados...)
// slice = (reducer + action), gerenciador do estado users, recados
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';

export interface Recado {
    id: string;
    description: string;
    detail: string;
}

export interface User {
    name: string;
    email: string;
    password: string;
    recados: Recado[];
}

const userAdapter = createEntityAdapter<User>({
    selectId: (user) => user.email,
})

export const { selectAll: buscarTodosUsuarios, selectById: buscarUsuarioPorEmail } = userAdapter.getSelectors(
    (state: RootState) => state.users
);


// quando utilizamos o adapter é ele quem define o initial state
const userSlice = createSlice({
  name: 'users',
  initialState: userAdapter.getInitialState(),
  reducers: {
    adicionar: userAdapter.addOne,
    atualizar: userAdapter.updateOne
  }
});

export const { adicionar, atualizar }  = userSlice.actions;
export default userSlice.reducer;
