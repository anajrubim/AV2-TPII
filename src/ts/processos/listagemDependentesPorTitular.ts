import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemDependentesPorTitular extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor

    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        console.clear()
        let titulares = this.clientes.filter(c => c.Titular === undefined)

        if (titulares.length === 0) {
            console.log('Nenhum titular cadastrado.')
            return
        }

        console.log('Titulares disponíveis:')
        titulares.forEach((titular, index) => {
            console.log(`| ${index + 1} - ${titular.Nome} (${titular.NomeSocial})`)
        })

        let opcao = this.entrada.receberNumero('Qual o número do titular?')
        if (opcao < 1 || opcao > titulares.length) {
            console.log('Opção inválida.')
            return
        }

        let titularEscolhido = titulares[opcao - 1]

        console.log(`\nDependentes de ${titularEscolhido.Nome}:`)

        if (titularEscolhido.Dependentes.length === 0) {
            console.log('Este titular não possui dependentes cadastrados.')
            return
        }

        titularEscolhido.Dependentes.forEach(dependente => {
            this.impressor = new ImpressaorCliente(dependente)
            console.log(this.impressor.imprimir())
        })
    }
}
