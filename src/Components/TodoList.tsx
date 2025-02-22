import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItems';

export const TodoList: React.FC<{
  filteredTodos: Todo[];
  loading: boolean;
}> = ({ filteredTodos, loading }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {loading ? (
      <p>Loading todos...</p>
    ) : (
      // eslint-disable-next-line prettier/prettier
      filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)
    )}
  </section>
);
