import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastroClienteDependente extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um cliente dependente...')

        let armazem = Armazem.InstanciaUnica
        let titulares = armazem.Clientes.filter(c => c.Titular === undefined)

        if (titulares.length === 0) {
            console.log('Nenhum titular cadastrado. Por favor, cadastre um titular primeiro.')
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

        let nome = this.entrada.receberTexto('Qual o nome do dependente?')
        if (!nome || nome.trim() === '') {
            console.log('Nome inválido. Cadastro cancelado.')
            return
        }

        let nomeSocial = this.entrada.receberTexto('Qual o nome social do dependente?')
        if (!nomeSocial || nomeSocial.trim() === '') {
            console.log('Nome social inválido. Cadastro cancelado.')
            return
        }

        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
        if (dataNascimento >= new Date()) {
            console.log('Data de nascimento inválida. Cadastro cancelado.')
            return
        }

        let dependente = new Cliente(nome, nomeSocial, dataNascimento)

        this.processo = new CadastroEnderecoTitular(dependente)
        this.processo.processar()

        this.processo = new CadastrarDocumentosCliente(dependente)
        this.processo.processar()

        titularEscolhido.adicionarDependente(dependente)
        armazem.Clientes.push(dependente)
        console.log(`Dependente cadastrado com sucesso para o titular ${titularEscolhido.Nome}!`)
    }
}
