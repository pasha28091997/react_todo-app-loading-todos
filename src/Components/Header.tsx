import { Todo } from '../types/Todo';

export const Header: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed
                эта кнопка должна иметь класс «active»,
                только если все задачи выполнены. */}
      <button
        type="button"
        className={`todoapp__toggle-all ${todos.length > 0 && todos.every(todo => todo.completed) ? 'active' : ''}`}
        data-cy="ToggleAllButton"
      />

      {/*Add a todo on form submit
              Добавить задачу при отправке формы */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
