import { Spinner } from 'phosphor-react';

import styles from './styles.module.scss';

export function Loader(){
  return(
    <Spinner className={styles.loader} />
  )
}