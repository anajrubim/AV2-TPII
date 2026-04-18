"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MenuTipoDocumento {
    mostrar() {
        console.clear();
        console.log(`****************************`);
        console.log(`| Qual o tipo do documento para cadastro? `);
        console.log(`----------------------`);
        console.log(`| 1 - Registro Geral`);
        console.log(`| 2 - CPF`);
        console.log(`| 3 - Passaporte`);
        console.log(`| 0 - Finalizar cadastro de documentos`);
        console.log(`----------------------`);
    }
}
exports.default = MenuTipoDocumento;
