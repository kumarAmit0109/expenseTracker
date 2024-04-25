import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, BudgetProvider } from "./contexts";
import useLocalStorage from "./hooks";
import components from "./components";
import toast, { Toaster } from "react-hot-toast";

function App() {
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(
        UNCATEGORIZED_BUDGET_ID
    );
    const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState(
        UNCATEGORIZED_BUDGET_ID
    );

    const openAddExpenseModal = (budgetId) => {
        setShowAddExpenseModal(true);
        setAddExpenseModalBudgetId(budgetId);
    };

    const openViewExpenseModal = (budgetId) => {
        setShowViewExpenseModal(true);
        setViewExpenseModalBudgetId(budgetId);
    };

    const addBudget = (budgetName, maxAmount) => {
        toast.promise(
            new Promise((resolve, reject) => {
                setBudgets((previousBudgets) => {
                    if (
                        previousBudgets.find(
                            (budget) => budget.budgetName === budgetName
                        )
                    ) {
                        reject(previousBudgets);
                        return previousBudgets;
                    }

                    const newBudget = {
                        budgetId: Date.now().toString(),
                        budgetName: budgetName,
                        maxAmount: maxAmount,
                    };

                    resolve([...previousBudgets, newBudget]);

                    return [...previousBudgets, newBudget];
                });
            }),
            {
                loading: "Adding...",
                success: "Budget added successfully!",
                error: "Budget already exists!",
            }
        );
    };

    const addExpense = (budgetId, description, amount) => {
        setExpenses((previousExpenses) => [
            ...previousExpenses,
            {
                expenseId: Date.now().toString(),
                budgetId: budgetId,
                description: description,
                amount: amount,
            },
        ]);
        toast.success("Expense added successfully!");
    };

    const getBudgetExpenses = (budgetId) => {
        return expenses.filter((expense) => expense.budgetId === budgetId);
    };

    const deleteBudget = (budgetId) => {
        setExpenses((previousExpenses) => {
            return previousExpenses.map((expense) => {
                if (expense.budgetId !== budgetId) {
                    return expense;
                } else {
                    return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
                }
            });
        });

        setBudgets((previousBudgets) =>
            previousBudgets.filter((budget) => budget.budgetId !== budgetId)
        );

        toast.success("Budget deleted successfully!");
    };

    const deleteExpense = (expenseId) => {
        setExpenses((previousExpenses) =>
            previousExpenses.filter(
                (expense) => expense.expenseId !== expenseId
            )
        );

        toast.success("Expense deleted successfully!");
    };

    return (
        <BudgetProvider
            value={{
                budgets,
                expenses,
                addBudget,
                addExpense,
                getBudgetExpenses,
                deleteBudget,
                deleteExpense,
            }}
        >
            <div
                className={`w-full bg-lightGrayishBlue relative ${
                    showAddBudgetModal ||
                    showAddExpenseModal ||
                    showViewExpenseModal
                        ? "h-screen overflow-y-hidden"
                        : "min-h-screen overflow-y-auto"
                } overflow-x-hidden`}
            >
                <components.Header
                    onAddBudgetClickHandler={() => setShowAddBudgetModal(true)}
                    onAddExpenseClickHandler={() =>
                        openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)
                    }
                />
                {budgets.length === 0 && expenses.length === 0 && (
                    <components.Intro />
                )}
                <div className="w-11/12 md:w-10/12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-start gap-5 py-3">
                    {budgets.map((budget) => {
                        const amount = getBudgetExpenses(
                            budget.budgetId
                        ).reduce((total, expense) => total + expense.amount, 0);
                        return (
                            <components.BudgetCard
                                key={budget.budgetId}
                                budgetName={budget.budgetName}
                                budget={budget}
                                amount={amount}
                                maxAmount={budget.maxAmount}
                                onAddExpenseClickHandler={() =>
                                    openAddExpenseModal(budget.budgetId)
                                }
                                onViewExpenseClickHandler={() =>
                                    openViewExpenseModal(budget.budgetId)
                                }
                                cardType="budget-card"
                            />
                        );
                    })}
                    <components.UncategoriedBudgetCard
                        onAddExpenseClickHandler={() =>
                            openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)
                        }
                        onViewExpenseClickHandler={() =>
                            openViewExpenseModal(UNCATEGORIZED_BUDGET_ID)
                        }
                    />
                    <components.TotalBudgetCard />
                </div>
                <components.AddBudgetModal
                    show={showAddBudgetModal}
                    closeHandler={() => setShowAddBudgetModal(false)}
                />
                <components.AddExpenseModal
                    show={showAddExpenseModal}
                    defaultBudgetId={addExpenseModalBudgetId}
                    closeHandler={() => setShowAddExpenseModal(false)}
                />
                <components.ViewExpensesModal
                    show={showViewExpenseModal}
                    budgetId={viewExpenseModalBudgetId}
                    closeHandler={() => setShowViewExpenseModal(false)}
                />
                <Toaster />
            </div>
        </BudgetProvider>
    );
}

export default App;
