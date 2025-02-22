/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo } from '../types/Todo';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => (
  <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
    <label className="todo__status-label" htmlFor={`todo-status-${todo.id}`}>
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        id={`todo-status-${todo.id}`}
        checked={todo.completed}
        readOnly
      />
    </label>

    <span data-cy="TodoTitle" className="todo__title">
      {todo.title}
    </span>

    {/* Remove button appears only on hover
          Кнопка «Удалить» появляется только при наведении */}
    <button type="button" className="todo__remove" data-cy="TodoDelete">
      ×
    </button>

    {/* overlay will cover the todo while it is being deleted or updated
          наложение будет покрывать задачу,
          пока она удаляется или обновляется */}
    <div data-cy="TodoLoader" className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
      {/* {loading} */}
    </div>
  </div>
);
