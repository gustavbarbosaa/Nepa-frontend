# Nepa-frontend

Este é o frontend do sistema Nepa, desenvolvido em Angular. O projeto tem como objetivo permitir o gerenciamento de projetos, editais, professores e alunos de maneira intuitiva, robusta e responsiva.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar Localmente](#como-executar-localmente)
- [Scaffolding de Código](#scaffolding-de-código)
- [Boas Práticas](#boas-práticas)
- [Recursos Adicionais](#recursos-adicionais)

---

## Visão Geral

O Nepa-frontend é uma aplicação web para gerenciamento acadêmico de projetos, editais, professores e alunos. A interface é moderna, com uso intensivo de componentes reutilizáveis e integração com backend via serviços Angular. O sistema permite operações de CRUD (criar, visualizar, atualizar e excluir) para os principais objetos do domínio.

## Funcionalidades Principais

- **Gerenciamento de Projetos:** Cadastro, filtro, aprovação, exclusão e listagem de projetos, com status dinâmicos (Pendente, Em Andamento, Concluído, Cancelado).
- **Gerenciamento de Editais:** Permite cadastrar e filtrar editais publicados.
- **Gerenciamento de Professores e Alunos:** Cadastro, edição e filtragem por status e nome.
- **Controle de Acesso e Navegação:** Interface simples, com navegação clara entre módulos e filtros inteligentes.
- **Feedback visual:** Uso de diálogos de confirmação, toasts de sucesso/erro e indicadores de loading.
- **Responsividade:** Componentes adaptados para diferentes resoluções.

## Estrutura do Projeto

```
src/
 ├── app/
 │    ├── core/            # Configurações centrais, serviços globais, guards, interceptors etc.
 │    ├── features/
 │    │    ├── projects/
 │    │    │     ├── components/
 │    │    │     │     ├── header-projects/       # Header e filtros de projetos
 │    │    │     │     ├── table-projects/        # Listagem de todos os projetos (admin)
 │    │    │     │     ├── table-my-projects/     # Listagem dos projetos do usuário
 │    │    ├── notices/
 │    │    ├── teachers/
 │    │    └── students/
 │    └── shared/         # Componentes reutilizáveis
 └── index.html           # Ponto de entrada da aplicação
```

- O diretório **core** centraliza serviços e definições globais como autenticação, tratamento de erros, guards, interceptors e providers utilizados em toda a aplicação.
- Cada módulo em **features** possui componentes para header (filtros e ações principais) e tabelas (listagem e ações de cada item).
- Os serviços (`projectService`, `courseService` etc.) realizam a integração com o backend.

## Como Executar Localmente

1. **Pré-requisitos:** Node.js, Angular CLI instalado globalmente.
2. **Instalação das dependências:**

   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**

   ```bash
   ng serve
   ```

   Acesse [http://localhost:4200/](http://localhost:4200/) no navegador.

## Scaffolding de Código

Para gerar novos componentes, utilize o Angular CLI:

```bash
ng generate component nome-do-componente
```

Veja todos os schematics disponíveis:

```bash
ng generate --help
```

## Boas Práticas

- Utilize os componentes compartilhados para manter o padrão visual e de usabilidade.
- Prefira Observables e Signals para reatividade dos dados.
- Separe lógica de apresentação (componentes) da lógica de negócios (serviços).
- Sempre realize tratamento de erros nas requisições.

## Recursos Adicionais

- [Documentação Angular CLI](https://github.com/angular/angular-cli)
- [Angular Docs](https://angular.io/docs)
- [PrimeNG](https://primeng.org/) (caso utilize componentes PrimeNG)

---
