import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class EditarCliente extends Processo {
    processar(): void {
        let armazem = Armazem.InstanciaUnica
        let clientes = armazem.Clientes

        if (clientes.length === 0) {
            console.log('Nenhum cliente cadastrado.')
            return
        }

        console.log('Clientes cadastrados:')
        clientes.forEach((cliente, index) => {
            let tipo = cliente.Titular === undefined ? 'Titular' : 'Dependente'
            console.log(`| ${index + 1} - ${cliente.Nome} (${cliente.NomeSocial}) [${tipo}]`)
        })

        let opcao = this.entrada.receberNumero('Qual o número do cliente a editar?')
        if (opcao < 1 || opcao > clientes.length) {
            console.log('Opção inválida.')
            return
        }

        let cliente = clientes[opcao - 1]
        console.log(`Editando: ${cliente.Nome}`)
        console.log('Deixe em branco para manter o valor atual.')

        let nome = this.entrada.receberTexto(`Nome atual: ${cliente.Nome} | Novo nome:`)
        if (nome && nome.trim() !== '') cliente.Nome = nome

        let nomeSocial = this.entrada.receberTexto(`Nome social atual: ${cliente.NomeSocial} | Novo nome social:`)
        if (nomeSocial && nomeSocial.trim() !== '') cliente.NomeSocial = nomeSocial

        console.log('Cliente atualizado com sucesso!')
    }
}
