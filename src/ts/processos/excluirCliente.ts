import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ExcluirCliente extends Processo {
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

        let opcao = this.entrada.receberNumero('Qual o número do cliente a excluir?')
        if (opcao < 1 || opcao > clientes.length) {
            console.log('Opção inválida.')
            return
        }

        let cliente = clientes[opcao - 1]

        // Se for titular, remove também seus dependentes
        if (cliente.Titular === undefined && cliente.Dependentes.length > 0) {
            console.log(`Atenção: o titular possui ${cliente.Dependentes.length} dependente(s) que também serão removidos.`)
            let confirmacao = this.entrada.receberTexto('Confirmar exclusão? (s/n)')
            if (confirmacao.toLowerCase() !== 's') {
                console.log('Exclusão cancelada.')
                return
            }
            // Remove dependentes do armazem
            cliente.Dependentes.forEach(dep => {
                let idx = armazem.Clientes.indexOf(dep)
                if (idx > -1) armazem.Clientes.splice(idx, 1)
            })
        }

        let index = armazem.Clientes.indexOf(cliente)
        armazem.Clientes.splice(index, 1)
        console.log(`Cliente ${cliente.Nome} removido com sucesso!`)
    }
}
