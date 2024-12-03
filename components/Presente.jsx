import styles from "../styles/Presente.module.css";

export default function Presente() {
    return (
        <div className={styles.presente}>
            <div className={styles.tampa}></div>
            <div className={styles.caixa}></div>
            <div className={styles.laco_vertical}></div>
            <div className={styles.laco_horizontal}></div>
        </div>
    );
}
