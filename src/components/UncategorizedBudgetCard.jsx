import { UNCATEGORIZED_BUDGET_ID, useBudget } from "../contexts";
import BudgetCard from "./BudgetCard";

function UncategorizedBudgetCard({
    onAddExpenseClickHandler,
    onViewExpenseClickHandler,
}) {
    const { getBudgetExpenses } = useBudget();

    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount,
        0
    );

    if (amount === 0) {
        return null;
    }

    return (
        <BudgetCard
            budgetName="Uncategorized"
            amount={amount}
            cardType="uncategorized-card"
            onAddExpenseClickHandler={onAddExpenseClickHandler}
            onViewExpenseClickHandler={onViewExpenseClickHandler}
        />
    );
}

export default UncategorizedBudgetCard;
