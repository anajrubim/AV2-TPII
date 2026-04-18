"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
const impressorCliente_1 = __importDefault(require("../impressores/impressorCliente"));
class ListagemDependentesPorTitular extends processo_1.default {
    constructor() {
        super();
        this.clientes = armazem_1.default.InstanciaUnica.Clientes;
    }
    processar() {
        console.clear();
        let titulares = this.clientes.filter(c => c.Titular === undefined);
        if (titulares.length === 0) {
            console.log('Nenhum titular cadastrado.');
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
        console.log(`\nDependentes de ${titularEscolhido.Nome}:`);
        if (titularEscolhido.Dependentes.length === 0) {
            console.log('Este titular não possui dependentes cadastrados.');
            return;
        }
        titularEscolhido.Dependentes.forEach(dependente => {
            this.impressor = new impressorCliente_1.default(dependente);
            console.log(this.impressor.imprimir());
        });
    }
}
exports.default = ListagemDependentesPorTitular;
