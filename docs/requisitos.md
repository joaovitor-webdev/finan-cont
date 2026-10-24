# Especificação de Requisitos

## 1. Requisitos Funcionais (RF)

| ID | Descrição | Prioridade |
| :--- | :--- | :--- |
| **RF01** | Login e logout de usuários, com perfis de acesso. | Alta |
| **RF02** | Cadastro de lançamentos financeiros (receita ou despesa) com descrição, valor, data, categoria e status. | Alta |
| **RF03** | Listagem de lançamentos com busca e filtros por período, categoria, tipo e status. | Alta |
| **RF04** | Edição e exclusão de lançamentos. | Alta |
| **RF05** | Cadastro e gerenciamento de categorias (ex.: Vendas, Aluguel, Salários, Impostos). | Média |
| **RF06** | Contas a pagar e a receber, com vencimento e marcação de "pago" ou "recebido". | Alta |
| **RF07** | Dashboard com saldo atual, total de receitas, total de despesas e contas a vencer. | Média |
| **RF08** | Relatórios por período, com exportação em PDF ou CSV. | Média |
| **RF09** | Cadastro de clientes e fornecedores. | Baixa |
| **RF10** | Histórico de alterações (quem mudou o quê e quando). | Baixa |

---

## 2. Requisitos Não Funcionais (RNF)

| ID | Descrição | Prioridade |
| :--- | :--- | :--- |
| **RNF01** | Interface responsiva (celular e desktop). | Alta |
| **RNF02** | Senhas armazenadas com hash e comunicação por HTTPS. | Alta |
| **RNF03** | Telas principais carregam em até 3 segundos. | Média |
| **RNF04** | Valores no formato brasileiro (R$ 1.234,56) e datas em DD/MM/AAAA. | Média |
| **RNF05** | Código versionado no GitHub, com README e pull requests revisados. | Média |
| **RNF06** | Interface simples, utilizável sem treinamento longo. | Média |
| **RNF07** | Compatível com Chrome, Edge e Firefox atuais. | Alta |