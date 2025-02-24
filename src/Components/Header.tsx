import { Todo } from '../types/Todo';

type HeaderProps = {
  todos: Todo[];
  title: string;
  setTitle: (value: string) => void;
  setError: (value: string | null) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const Header: React.FC<HeaderProps> = ({
  todos,
  title,
  setTitle,
  setError,
  handleSubmit,
}) => {
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
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            setError(null);
          }}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
