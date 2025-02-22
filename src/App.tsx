/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './Components/Header';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    setLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
        setError(null);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
        setError('Unable to load todos');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const handleFilterChenge = (newFilter: 'all' | 'active' | 'completed') => {
    setFilter(newFilter);
  };

  const hasCompleted = todos.some(todo => todo.completed);

  const onClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        {/* show only one message at a time
        показывать только одно сообщение за раз */}
        {error || 'No error'}
      </div>
      {loading && <p>Loading todos...</p>}
      <div className="todoapp__content">
        <Header todos={todos} />
        {todos.length > 0 && (
          <TodoList filteredTodos={filteredTodos} loading={loading} />
        )}
        {/* Hide the footer if there are no todos
        Скрыть нижний колонтитул, если задач нет */}
        {todos.length > 0 && (
          <Footer
            activeCount={activeCount}
            filter={filter}
            hasCompleted={hasCompleted}
            handleFilterChenge={handleFilterChenge}
            // eslint-disable-next-line max-len
            onClearCompleted={onClearCompleted}
          />
        )}
      </div>
      {/* DON'T use conditional rendering to hide the notification
      НЕ используйте условный рендеринг, чтобы скрыть уведомление. */}
      {/* Add the 'hidden' class to hide the message smoothly
      Добавьте класс «скрытый», чтобы плавно скрыть сообщение. */}
    </div>
  );
  // return (
  //   <div className="todoapp">
  //     <h1 className="todoapp__title">todos</h1>

  //     <div className="todoapp__content">
  //       <header className="todoapp__header">
  //         {/* this button should have `active` class only if all todos are completed
  //           эта кнопка должна иметь класс «active»,
  //           только если все задачи выполнены. */}
  //         <button
  //           type="button"
  //           className="todoapp__toggle-all active"
  //           data-cy="ToggleAllButton"
  //         />

  //         {/*Add a todo on form submit
  //         Добавить задачу при отправке формы */}
  //         <form>
  //           <input
  //             data-cy="NewTodoField"
  //             type="text"
  //             className="todoapp__new-todo"
  //             placeholder="What needs to be done?"
  //           />
  //         </form>
  //       </header>

  //       <section className="todoapp__main" data-cy="TodoList">
  //         {/* This is a completed todo
  //         Это завершенная задача */}
  //         <div data-cy="Todo" className="todo completed">
  //           <label className="todo__status-label">
  //             <input
  //               data-cy="TodoStatus"
  //               type="checkbox"
  //               className="todo__status"
  //               checked
  //             />
  //           </label>

  //           <span data-cy="TodoTitle" className="todo__title">
  //             Completed Todo
  //           </span>

  //           {/* Remove button appears only on hover
  //           Кнопка «Удалить» появляется только при наведении */}
  //           <button type="button" className="todo__remove" data-cy="TodoDelete">
  //             ×
  //           </button>

  //           {/* overlay will cover the todo while it is being deleted or updated
  //           наложение будет покрывать задачу,
  //           пока она удаляется или обновляется */}
  //           <div data-cy="TodoLoader" className="modal overlay">
  //             <div className="modal-background has-background-white-ter" />
  //             <div className="loader" />
  //           </div>
  //         </div>

  //         {/* This todo is an active todo
  //         Эта задача является активной. */}
  //         <div data-cy="Todo" className="todo">
  //           <label className="todo__status-label">
  //             <input
  //               data-cy="TodoStatus"
  //               type="checkbox"
  //               className="todo__status"
  //             />
  //           </label>

  //           <span data-cy="TodoTitle" className="todo__title">
  //             Not Completed Todo
  //           </span>
  //           <button type="button" className="todo__remove" data-cy="TodoDelete">
  //             ×
  //           </button>

  //           <div data-cy="TodoLoader" className="modal overlay">
  //             <div className="modal-background has-background-white-ter" />
  //             <div className="loader" />
  //           </div>
  //         </div>

  //         {/* This todo is being edited
  //         Эта задача находится на редактировании */}
  //         <div data-cy="Todo" className="todo">
  //           <label className="todo__status-label">
  //             <input
  //               data-cy="TodoStatus"
  //               type="checkbox"
  //               className="todo__status"
  //             />
  //           </label>

  //           {/* This form is shown instead of the title and remove button
  //           Эта форма отображается вместо заголовка и кнопки удаления. */}
  //           <form>
  //             <input
  //               data-cy="TodoTitleField"
  //               type="text"
  //               className="todo__title-field"
  //               placeholder="Empty todo will be deleted"
  //               value="Todo is being edited now"
  //             />
  //           </form>

  //           <div data-cy="TodoLoader" className="modal overlay">
  //             <div className="modal-background has-background-white-ter" />
  //             <div className="loader" />
  //           </div>
  //         </div>

  //         {/* This todo is in loadind state
  //         Эта задача находится в состоянии загрузки */}
  //         <div data-cy="Todo" className="todo">
  //           <label className="todo__status-label">
  //             <input
  //               data-cy="TodoStatus"
  //               type="checkbox"
  //               className="todo__status"
  //             />
  //           </label>

  //           <span data-cy="TodoTitle" className="todo__title">
  //             Todo is being saved now
  //           </span>

  //           <button type="button" className="todo__remove" data-cy="TodoDelete">
  //             ×
  //           </button>

  //           {/* 'is-active' class puts this modal on top of the todo
  //           Класс is-active помещает это модальное окно поверх списка задач. */}
  //           <div data-cy="TodoLoader" className="modal overlay is-active">
  //             <div className="modal-background has-background-white-ter" />
  //             <div className="loader" />
  //           </div>
  //         </div>
  //       </section>

  //       {/* Hide the footer if there are no todos
  //       Скрыть нижний колонтитул, если задач нет */}
  //       <footer className="todoapp__footer" data-cy="Footer">
  //         <span className="todo-count" data-cy="TodosCounter">
  //           3 items left
  //         </span>

  //         {/* Active link should have the 'selected' class
  //         Активная ссылка должна иметь класс «выбранный». */}
  //         <nav className="filter" data-cy="Filter">
  //           <a
  //             href="#/"
  //             className="filter__link selected"
  //             data-cy="FilterLinkAll"
  //           >
  //             All
  //           </a>

  //           <a
  //             href="#/active"
  //             className="filter__link"
  //             data-cy="FilterLinkActive"
  //           >
  //             Active
  //           </a>

  //           <a
  //             href="#/completed"
  //             className="filter__link"
  //             data-cy="FilterLinkCompleted"
  //           >
  //             Completed
  //           </a>
  //         </nav>

  //         {/* this button should be disabled if there are no completed todos
  //         эту кнопку следует отключить, если нет завершенных задач */}
  //         <button
  //           type="button"
  //           className="todoapp__clear-completed"
  //           data-cy="ClearCompletedButton"
  //         >
  //           Clear completed
  //         </button>
  //       </footer>
  //     </div>

  //     {/* DON'T use conditional rendering to hide the notification
  //     НЕ используйте условный рендеринг, чтобы скрыть уведомление. */}
  //     {/* Add the 'hidden' class to hide the message smoothly
  //     Добавьте класс «скрытый», чтобы плавно скрыть сообщение. */}
  //     <div
  //       data-cy="ErrorNotification"
  //       className="notification is-danger is-light has-text-weight-normal"
  //     >
  //       <button data-cy="HideErrorButton" type="button" className="delete" />
  //       {/* show only one message at a time
  //       показывать только одно сообщение за раз */}
  //       Unable to load todos
  //       <br />
  //       Title should not be empty
  //       <br />
  //       Unable to add a todo
  //       <br />
  //       Unable to delete a todo
  //       <br />
  //       Unable to update a todo
  //     </div>
  //   </div>
  // );
};
