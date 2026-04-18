import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastroClienteTitular extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo cliente...')

        let nome = this.entrada.receberTexto('Qual o nome do novo cliente?')
        if (!nome || nome.trim() === '') {
            console.log('Nome inválido. Cadastro cancelado.')
            return
        }

        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?')
        if (!nomeSocial || nomeSocial.trim() === '') {
            console.log('Nome social inválido. Cadastro cancelado.')
            return
        }

        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
        if (dataNascimento >= new Date()) {
            console.log('Data de nascimento inválida. Cadastro cancelado.')
            return
        }

        let cliente = new Cliente(nome, nomeSocial, dataNascimento)

        this.processo = new CadastroEnderecoTitular(cliente)
        this.processo.processar()

        this.processo = new CadastrarDocumentosCliente(cliente)
        this.processo.processar()

        Armazem.InstanciaUnica.Clientes.push(cliente)
        console.log('Finalizando o cadastro do cliente...')
    }
}
