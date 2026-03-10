import classNames from 'classnames';
import React from 'react';

import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input: React.FC<InputProps> = ({
  value,
  afterSlot,
  className,
  disabled,
  placeholder,
  ...rest
}) => {
  const isDisabled = disabled === true;

  return (
    <div
      className={classNames(
        styles.inputWrapper,
        {
          [styles['inputWrapper--disabled']]: isDisabled,
          [styles['inputWrapper--withSlot']]: !!afterSlot,
        },
        className
      )}
    >
      <input
        {...rest}
        className={styles.input}
        type="text"
        value={value}
        disabled={isDisabled}
        placeholder={placeholder}
      />

      {afterSlot && <div className={styles.afterSlot}>{afterSlot}</div>}
    </div>
  );
};

export default Input;
