"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
const cliente_1 = __importDefault(require("../modelos/cliente"));
const cadastrarDocumentosCliente_1 = __importDefault(require("./cadastrarDocumentosCliente"));
const cadastroEnderecoTitular_1 = __importDefault(require("./cadastroEnderecoTitular"));
class CadastroClienteTitular extends processo_1.default {
    processar() {
        console.log('Iniciando o cadastro de um novo cliente...');
        let nome = this.entrada.receberTexto('Qual o nome do novo cliente?');
        if (!nome || nome.trim() === '') {
            console.log('Nome inválido. Cadastro cancelado.');
            return;
        }
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?');
        if (!nomeSocial || nomeSocial.trim() === '') {
            console.log('Nome social inválido. Cadastro cancelado.');
            return;
        }
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?');
        if (dataNascimento >= new Date()) {
            console.log('Data de nascimento inválida. Cadastro cancelado.');
            return;
        }
        let cliente = new cliente_1.default(nome, nomeSocial, dataNascimento);
        this.processo = new cadastroEnderecoTitular_1.default(cliente);
        this.processo.processar();
        this.processo = new cadastrarDocumentosCliente_1.default(cliente);
        this.processo.processar();
        armazem_1.default.InstanciaUnica.Clientes.push(cliente);
        console.log('Finalizando o cadastro do cliente...');
    }
}
exports.default = CadastroClienteTitular;
