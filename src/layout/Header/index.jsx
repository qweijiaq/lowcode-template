import styles from "./index.less";

export default function Header(props) {
  console.log(styles.main);
  return <div className={styles.main}>Header</div>;
}
