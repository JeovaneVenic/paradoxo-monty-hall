import PortaModel from "../model/porta";

// Função para criar portas
export function criarPortas(qtde: number, selecionada: number): PortaModel[] {
    return Array.from({ length: qtde }, (_, i) => {
        const numero = i + 1;
        const temPresente = numero === selecionada;
        return new PortaModel(numero, temPresente);
    });
}

// Função para atualizar portas
export function atualizarPortas(portas: PortaModel[], portaModificada: PortaModel): PortaModel[] {
    return portas.map(portaAtual => {
        const portaIgualModificada = portaAtual.numero === portaModificada.numero;
        if (portaIgualModificada) {
            return portaModificada;
        } else {
            return portaModificada.aberta ? portaAtual : portaAtual.desmarcarPorta();
        }
    });
}

// Função para redistribuir o presente sem embaralhar portas
export function redistribuirPresente(portas: PortaModel[]): PortaModel[] {
    const novaPosicaoPresente = Math.floor(Math.random() * portas.length) + 1;
    return portas.map(porta => {
        const temPresente = porta.numero === novaPosicaoPresente;
        return new PortaModel(porta.numero, temPresente, porta.selecionada, porta.aberta);
    });
}
