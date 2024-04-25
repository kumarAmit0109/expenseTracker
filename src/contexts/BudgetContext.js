import { createContext, useContext } from "react";

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const BudgetContext = createContext({
    budgets: [],
    expenses: [],
    addBudget: (budgetName, maxAmount) => {},
    addExpense: (budgetId, description, amount) => {},
    getBudgetExpenses: (budgetId) => {},
    deleteBudget: (budgetId) => {},
    deleteExpense: (expenseId) => {},
});

export const BudgetProvider = BudgetContext.Provider;

export const useBudget = () => {
    return useContext(BudgetContext);
};
