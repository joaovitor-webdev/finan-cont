# Fluxo do Usuário e Diagrama de Processo

## Descrição do Fluxo

1. **Autenticação:** O usuário realiza o login com suas credenciais e é redirecionado para o **Dashboard**.
2. **Navegação Principal:** No menu do sistema, o usuário pode navegar entre as seções: *Lançamentos*, *Contas a Pagar/Receber*, *Categorias*, *Clientes/Fornecedores* ou *Relatórios*.
3. **Gestão de Lançamentos:**
   - Na tela de *Lançamentos*, seleciona "Novo Lançamento".
   - Preenche o formulário com dados obrigatórios.
   - O sistema valida as regras de negócio (ex.: RN01 - validação de campos obrigatorios e valores) e salva os dados.
   - O lançamento é exibido na listagem principal, onde pode ser filtrado, editado ou excluído.
4. **Liquidação de Contas:**
   - Em *Contas a Pagar/Receber*, o usuário localiza o título desejado e o marca como "Pago" ou "Recebido".
   - O sistema atualiza o status da conta e recalcula automaticamente os saldos do *Dashboard*.
5. **Geração de Relatórios:**
   - Na seção de *Relatórios*, o usuário define o período e filtros desejados.
   - Seleciona o formato de exportação (PDF ou CSV) e realiza o download.

---

## Diagrama do Fluxo de Usuário

```mermaid
flowchart TD
    A([Início: Tela de Login]) --> B[Usuário digita credenciais]
    B --> C{Autenticação Válida?}
    C -- Não --> B
    C -- Sim --> D[Dashboard Principal]

    D --> E{Selecione uma opção no Menu}

    %% Opção Lançamentos
    E -->|Lançamentos| F[Visualizar Lista de Lançamentos]
    F --> F1[Filtrar / Buscar / Editar / Excluir]
    F --> F2[Clicar em 'Novo Lançamento']
    F2 --> F3[Preencher Formulário]
    F3 --> F4{Validação do Sistema - RN01}
    F4 -- Dados Inválidos --> F3
    F4 -- Dados Válidos --> F5[Salvar Lançamento]
    F5 --> F

    %% Opção Contas a Pagar/Receber
    E -->|Contas Pagar/Receber| G[Listar Contas]
    G --> G1[Selecionar Conta]
    G1 --> G2[Marcar como 'Pago' ou 'Recebido']
    G2 --> G3[Atualizar Saldo no Dashboard]
    G3 --> D

    %% Opção Categorias
    E -->|Categorias| H[Gerenciar Categorias: Criar, Editar, Excluir]

    %% Opção Clientes/Fornecedores
    E -->|Clientes e Fornecedores| I[Gerenciar Pessoas]

    %% Opção Relatórios
    E -->|Relatórios| J[Selecionar Período e Filtros]
    J --> J1{Escolher Formato}
    J1 -->|PDF| J2[Exportar em PDF]
    J1 -->|CSV| J3[Exportar em CSV]
    J2 --> K([Fim])
    J3 --> K
```