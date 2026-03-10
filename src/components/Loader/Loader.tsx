import classNames from 'classnames';

import styles from './Loader.module.scss';

export type LoaderProps = {
  size?: 's' | 'm' | 'l';
  className?: string;
};

const config = {
  l: {wrapper: 60, svg: 40},
  m: {wrapper: 48, svg: 32},
  s: {wrapper: 24, svg: 16},
};

const paths = {
  l: 'M23.3788 34.62C15.3068 36.4835 7.25249 31.4506 5.38894 23.3787C3.52538 15.3068 8.55828 7.25244 16.6302 5.38888C24.7022 3.52533 32.7565 8.55822 34.62 16.6302L39.4919 15.5054C37.0071 4.74282 26.2681 -1.96771 15.5055 0.517031C4.74287 3.00177 -1.96765 13.7409 0.517088 24.5035C3.00183 35.266 13.7409 41.9766 24.5035 39.4918L23.3788 34.62Z',
  m: 'M18.703 27.696C12.2454 29.1868 5.80199 25.1605 4.31115 18.7029C2.82031 12.2454 6.84662 5.80193 13.3042 4.31108C19.7617 2.82024 26.2052 6.84655 27.696 13.3041L31.5935 12.4043C29.6057 3.79423 21.0144 -1.57419 12.4044 0.4136C3.7943 2.40139 -1.57412 10.9927 0.41367 19.6027C2.40146 28.2128 10.9927 33.5812 19.6028 31.5934L18.703 27.696Z',
  s: 'M9.3515 13.848C6.12272 14.5934 2.901 12.5802 2.15558 9.35147C1.41015 6.12269 3.42331 2.90096 6.65209 2.15554C9.88087 1.41012 13.1026 3.42328 13.848 6.65205L15.7968 6.20215C14.8029 1.89711 10.5072 -0.787096 6.20219 0.2068C1.89715 1.2007 -0.787061 5.49633 0.206835 9.80137C1.20073 14.1064 5.49637 16.7906 9.8014 15.7967L9.3515 13.848Z',
};

const Loader = ({size = 'l', className}: LoaderProps) => {
  const {svg} = config[size];

  return (
    <div
      className={classNames(
        styles.loaderWrapper,
        {
          [styles.sizeL]: size === 'l',
          [styles.sizeM]: size === 'm',
          [styles.sizeS]: size === 's',
        },
        className
      )}
    >
      <svg
        className={styles.loader}
        width={svg}
        height={svg}
        viewBox={`0 0 ${svg} ${svg}`}
        fill="none"
      >
        <path
          d={paths[size]}
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default Loader;
