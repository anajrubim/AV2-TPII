# Atlantis - Sistema de Gestão CLI

Sistema de gestão de clientes desenvolvido em TypeScript como CLI, utilizando os padrões de projeto **Singleton** e **Strategy**.

## Requisitos

- Node.js
- TypeScript (`npm install -g typescript`)

## Instalação

```bash
npm install
```

## Executar

```bash
npm start
```

## Funcionalidades

**Clientes**
- Cadastrar titular
- Cadastrar dependente (vinculado a um titular)
- Editar cliente
- Excluir cliente (remove dependentes automaticamente se for titular)

**Listagens**
- Listar todos os titulares
- Listar dependentes de um titular específico
- Consultar o titular de um dependente específico
