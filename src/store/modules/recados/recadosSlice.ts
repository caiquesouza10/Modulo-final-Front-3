import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { Recado } from '../users';

const adapter = createEntityAdapter<Recado>({
  selectId: (item) => item.id,
});

export const { selectAll: buscarTodosRecados, selectById: buscarRecadoPorId } = adapter.getSelectors(
  (state: RootState) => state.recados
);

const recadosSlice = createSlice({
  name: 'recados',
  initialState: adapter.getInitialState(),
  reducers: {
    adicionarRecado: adapter.addOne,
    atualizarRecado: adapter.updateOne,
    deletarRecado: adapter.removeOne,
    deletarTodos: adapter.removeAll,
    adicionarTodosRecados: adapter.setAll,
  },
});

export const {
  adicionarRecado,
  atualizarRecado,
  deletarRecado,
  deletarTodos,
  adicionarTodosRecados,
} = recadosSlice.actions;
export default recadosSlice.reducer;
