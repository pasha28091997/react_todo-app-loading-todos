import React from 'react';

type Props = {
  error: string | null;
  isVisible: boolean;
  onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  isVisible,
  onClose,
}) => (
  <div
    className={`notification is-danger is-light has-text-weight-normal ${isVisible ? '' : 'hidden'}`}
    data-cy="ErrorNotification"
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={onClose}
    />
    {error}
  </div>
);
