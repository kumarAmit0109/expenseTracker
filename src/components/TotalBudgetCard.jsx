import { useBudget } from "../contexts";
import BudgetCard from "./BudgetCard";

function TotalBudgetCard() {
    const { budgets, expenses } = useBudget();

    const amount = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    const maxAmount = budgets.reduce(
        (total, budget) => total + budget.maxAmount,
        0
    );

    if (maxAmount === 0) {
        return null;
    }

    return (
        <BudgetCard
            budgetName="Total"
            amount={amount}
            maxAmount={maxAmount}
            cardType="total-card"
        />
    );
}

export default TotalBudgetCard;
