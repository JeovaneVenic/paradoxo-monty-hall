import PortaModel from "../model/porta";
import styles from "../styles/Porta.module.css";
import Presente from './Presente';

interface PortaProps {
    value: PortaModel;
    onChange: (novaPorta: PortaModel) => void;
}

export default function Porta(props: PortaProps) {
    const porta = props.value;
    const selecionada = porta.selecionada && !porta.aberta ? styles.porta_selecionada : '';

    const alternarSelecao = e => props.onChange(porta.alternarSelecao());
    const abrir = e => {
        e.stopPropagation();
        props.onChange(porta.abrir());
    };

    function renderizarPorta() {
        return (
            <div className={styles.porta}>
                <div className={styles.numero}>{porta.numero}</div>
                <div className={styles.marcaneta} onClick={abrir}></div>
            </div>
        );
    }

    return (
        <div className={styles.area} onClick={alternarSelecao}>
            <div className={`${styles.grade} ${selecionada}`}>
                {porta.fechada ? renderizarPorta() : porta.temPresente ? <Presente /> : false}
            </div>
            <div className={styles.piso}></div>
        </div>
    );
}
