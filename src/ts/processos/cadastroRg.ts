import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";

export default class CadastroRg extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let numero = this.entrada.receberTexto('Qual o número do documento?')

        let jaExiste = Armazem.InstanciaUnica.Clientes.some(c =>
            c.Documentos.some(d => d.Tipo === TipoDocumento.RG && d.Numero === numero)
        )

        if (jaExiste) {
            console.log(`Já existe um cliente cadastrado com o RG número ${numero}. Documento não adicionado.`)
            return
        }

        let dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
        let rg = new Documento(numero, TipoDocumento.RG, dataExpedicao)
        this.cliente.Documentos.push(rg)
        console.log('RG cadastrado com sucesso!')
    }
}
