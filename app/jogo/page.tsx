"use client";  // Adicione esta linha

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Modal from 'react-modal';
import Porta from "../../components/Porta";
import { atualizarPortas, criarPortas, redistribuirPresente } from "../../functions/portas";
import PortaModel from '../../model/porta';
import styles from '../../styles/Jogo.module.css';
import Link from 'next/link';

// Estilo do modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',  // Centraliza o conteúdo do modal
    backgroundColor: '#0000ff', // Fundo azul
    color: 'white' // Texto branco
  }
};

export default function Jogo() {
    const [portas, setPortas] = useState(criarPortas(5, Math.floor(Math.random() * 5) + 1));
    const [tentativas, setTentativas] = useState(0);
    const [pontos, setPontos] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            opacity: 1,
            transition: { duration: 0.5 }
        });
    }, [controls]);

    function verificarErro(porta) {
        setTentativas(prev => prev + 1);
        if (!porta.temPresente) {
            setPontos(prev => prev - 1);
            setMensagemErro("Você errou, tente novamente.");
            setShowModal(true);
        } else {
            setPontos(prev => prev + 3); // Cada presente equivale a 3 pontos
            setMensagemErro("PARABÉNS!");
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                // Fechando todas as portas após 3 segundos e redistribuindo o presente
                const portasFechadas = portas.map(porta => new PortaModel(porta.numero, false, false, false));
                setPortas(redistribuirPresente(portasFechadas)); // Redistribuindo o presente
            }, 3000);
        }
    }

    function reiniciarJogo() {
        const novaPortas = criarPortas(5, Math.floor(Math.random() * 5) + 1); // Garantindo novas portas e redistribuição do presente
        setPortas(novaPortas);
        setShowModal(false);
    }

    function fecharModal() {
        setShowModal(false);
    }

    function renderizarPortas() {
        return portas.map(porta => (
            <motion.div
                key={porta.numero}
                initial={{ opacity: 0 }}
                animate={controls}
            >
                <Porta
                    value={porta}
                    onChange={novaPorta => {
                        setPortas(atualizarPortas(portas, novaPorta));
                        verificarErro(novaPorta);
                    }}
                />
            </motion.div>
        ));
    }

    return (
        <div id={styles.jogo}>
            <h2 className={styles.titulo}>SEUS PONTOS SERÃO CONVERTIDOS EM: R$ (REAIS)</h2>
            <div className={styles.tentativas}>
                <h3>Tentativas: {tentativas}</h3>
                <h3>Pontos: {pontos}</h3>
            </div>
            <div className={styles.portas}>
                {renderizarPortas()}
            </div>
            <div className={styles.botoes}>
                <Link href="/">
                    <button onClick={reiniciarJogo}>Reiniciar Jogo!</button>    
                </Link>
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={fecharModal}
                style={customStyles}
                contentLabel="Mensagem de Erro"
            >
                <h2>{mensagemErro}</h2>
                <button 
                  onClick={fecharModal}
                  style={{
                    display: 'block',
                    margin: '20px auto', 
                    padding: '10px 20px', 
                    borderRadius: '10px', 
                    backgroundColor: 'white', 
                    color: '#c0392c', 
                    border: 'none'
                  }}
                >Fechar</button>
            </Modal>
        </div>
    );
}
