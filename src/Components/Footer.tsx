import React from 'react';

type FooterProps = {
  activeCount: number;
  filter: 'all' | 'active' | 'completed';
  handleFilterChenge: (newFilter: 'all' | 'active' | 'completed') => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
};

export const Footer: React.FC<FooterProps> = ({
  activeCount,
  filter,
  handleFilterChenge,
  onClearCompleted,
  hasCompleted,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeCount} items left
    </span>

    {/* Active link should have the 'selected' class
            Активная ссылка должна иметь класс «выбранный». */}
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={() => handleFilterChenge('all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
        data-cy="FilterLinkActive"
        onClick={() => handleFilterChenge('active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
        data-cy="FilterLinkCompleted"
        onClick={() => handleFilterChenge('completed')}
      >
        Completed
      </a>
    </nav>

    {/* this button should be disabled if there are no completed todos
            эту кнопку следует отключить, если нет завершенных задач */}
    {hasCompleted && (
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    )}
  </footer>
);
