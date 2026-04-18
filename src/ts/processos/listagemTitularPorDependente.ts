import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemTitularPorDependente extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor

    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        console.clear()
        let dependentes = this.clientes.filter(c => c.Titular !== undefined)

        if (dependentes.length === 0) {
            console.log('Nenhum dependente cadastrado.')
            return
        }

        console.log('Dependentes disponíveis:')
        dependentes.forEach((dep, index) => {
            console.log(`| ${index + 1} - ${dep.Nome} (${dep.NomeSocial})`)
        })

        let opcao = this.entrada.receberNumero('Qual o número do dependente?')
        if (opcao < 1 || opcao > dependentes.length) {
            console.log('Opção inválida.')
            return
        }

        let dependenteEscolhido = dependentes[opcao - 1]

        console.log(`\nTitular de ${dependenteEscolhido.Nome}:`)
        this.impressor = new ImpressaorCliente(dependenteEscolhido.Titular)
        console.log(this.impressor.imprimir())
    }
}
