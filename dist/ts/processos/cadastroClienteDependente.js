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
class CadastroClienteDependente extends processo_1.default {
    processar() {
        console.log('Iniciando o cadastro de um cliente dependente...');
        let armazem = armazem_1.default.InstanciaUnica;
        let titulares = armazem.Clientes.filter(c => c.Titular === undefined);
        if (titulares.length === 0) {
            console.log('Nenhum titular cadastrado. Por favor, cadastre um titular primeiro.');
            return;
        }
        console.log('Titulares disponíveis:');
        titulares.forEach((titular, index) => {
            console.log(`| ${index + 1} - ${titular.Nome} (${titular.NomeSocial})`);
        });
        let opcao = this.entrada.receberNumero('Qual o número do titular?');
        if (opcao < 1 || opcao > titulares.length) {
            console.log('Opção inválida.');
            return;
        }
        let titularEscolhido = titulares[opcao - 1];
        let nome = this.entrada.receberTexto('Qual o nome do dependente?');
        if (!nome || nome.trim() === '') {
            console.log('Nome inválido. Cadastro cancelado.');
            return;
        }
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do dependente?');
        if (!nomeSocial || nomeSocial.trim() === '') {
            console.log('Nome social inválido. Cadastro cancelado.');
            return;
        }
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?');
        if (dataNascimento >= new Date()) {
            console.log('Data de nascimento inválida. Cadastro cancelado.');
            return;
        }
        let dependente = new cliente_1.default(nome, nomeSocial, dataNascimento);
        this.processo = new cadastroEnderecoTitular_1.default(dependente);
        this.processo.processar();
        this.processo = new cadastrarDocumentosCliente_1.default(dependente);
        this.processo.processar();
        titularEscolhido.adicionarDependente(dependente);
        armazem.Clientes.push(dependente);
        console.log(`Dependente cadastrado com sucesso para o titular ${titularEscolhido.Nome}!`);
    }
}
exports.default = CadastroClienteDependente;
