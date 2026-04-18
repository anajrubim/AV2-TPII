"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
const impressorCliente_1 = __importDefault(require("../impressores/impressorCliente"));
class ListagemTitularPorDependente extends processo_1.default {
    constructor() {
        super();
        this.clientes = armazem_1.default.InstanciaUnica.Clientes;
    }
    processar() {
        console.clear();
        let dependentes = this.clientes.filter(c => c.Titular !== undefined);
        if (dependentes.length === 0) {
            console.log('Nenhum dependente cadastrado.');
            return;
        }
        console.log('Dependentes disponíveis:');
        dependentes.forEach((dep, index) => {
            console.log(`| ${index + 1} - ${dep.Nome} (${dep.NomeSocial})`);
        });
        let opcao = this.entrada.receberNumero('Qual o número do dependente?');
        if (opcao < 1 || opcao > dependentes.length) {
            console.log('Opção inválida.');
            return;
        }
        let dependenteEscolhido = dependentes[opcao - 1];
        console.log(`\nTitular de ${dependenteEscolhido.Nome}:`);
        this.impressor = new impressorCliente_1.default(dependenteEscolhido.Titular);
        console.log(this.impressor.imprimir());
    }
}
exports.default = ListagemTitularPorDependente;
