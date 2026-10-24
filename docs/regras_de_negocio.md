# Regras de Negócio (RN)

| ID | Regra | Requisito Relacionado |
| :--- | :--- | :--- |
| **RN01** | Todo lançamento precisa de valor maior que zero, data, categoria e tipo. | RF02 |
| **RN02** | Despesa com vencimento passado e sem pagamento fica com status "Atrasado". | RF06 |
| **RN03** | Saldo = soma das receitas pagas − soma das despesas pagas. | RF07 |
| **RN04** | Lançamentos conciliados ou de períodos fechados só podem ser alterados por administrador. | RF01, RF04 |
| **RN05** | Categorias com lançamentos vinculados não podem ser excluídas, apenas inativadas. | RF05 |
| **RN06** | Exclusão de lançamento é lógica (fica registrada no histórico). | RF04, RF10 |
| **RN07** | Perfis: Administrador (tudo), Financeiro (lança e edita), Consulta (só visualiza). | RF01 |