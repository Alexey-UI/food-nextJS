import classNames from 'classnames';
import React from 'react';

import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  className,
  disabled,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const buttonClassName = classNames(
    styles.button,
    {
      [styles['button--disabled']]: disabled,
    },
    className
  );

  return (
    <button {...rest} disabled={isDisabled} className={buttonClassName}>
      {/*{loading && <Loader size="s" className={styles.loaderWhite} />}*/}

      <span className={styles['button__content']}>{children}</span>
    </button>
  );
};

export default Button;
