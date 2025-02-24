import React from 'react';
import { FilterType } from '../types/FilterType';

type FooterProps = {
  activeCount: number;
  filter: FilterType;
  handleFilterChange: (newFilter: FilterType) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
};

export const Footer: React.FC<FooterProps> = ({
  activeCount,
  filter,
  handleFilterChange: handleFilterChange,
  onClearCompleted,
  hasCompleted,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeCount} items left
    </span>
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={() => handleFilterChange('all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
        data-cy="FilterLinkActive"
        onClick={() => handleFilterChange('active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
        data-cy="FilterLinkCompleted"
        onClick={() => handleFilterChange('completed')}
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
