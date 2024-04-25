import { UNCATEGORIZED_BUDGET_ID, useBudget } from "../contexts";
import { currencyFormattor } from "../utils";
import { MdDeleteOutline } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

function ViewExpensesModal({ show, budgetId, closeHandler }) {
    const {
        budgets,
        expenses,
        getBudgetExpenses,
        deleteBudget,
        deleteExpense,
    } = useBudget();

    const budget =
        budgetId === UNCATEGORIZED_BUDGET_ID
            ? { budgetName: "Uncategorized", budgetId: UNCATEGORIZED_BUDGET_ID }
            : budgets.find((budget) => budget.budgetId === budgetId);

    if (budgets.length === 0 && expenses.length === 0) {
        closeHandler();
        return null;
    }

    return (
        <>
            <div
                className={`w-full h-full absolute inset-0 z-10 bg-blackWith18 backdrop-blur-sm ${
                    show
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                } transition-opacity duration-200`}
                onClick={closeHandler}
            ></div>
            <div
                className={`w-11/12 md:w-2/3 max-w-lg mx-auto absolute left-1/2 top-1/2 z-20 -translate-x-1/2 bg-white rounded-md ${
                    show
                        ? "opacity-100 pointer-events-auto -translate-y-1/2"
                        : "opacity-0 pointer-events-none -translate-y-1/4"
                } transition-all duration-200 px-3 sm:px-5 py-2 sm:py-4`}
            >
                <div className="flex justify-between items-center gap-x-2 pb-3 border-b border-blackWith44">
                    <div className="flex items-center gap-x-1 xsm:gap-x-2 sm:gap-x-3">
                        <div className="text-lg md:text-xl capitalize">
                            {budget?.budgetName}
                        </div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <button
                                type="button"
                                onClick={() => {
                                    deleteBudget(budgetId);
                                    closeHandler();
                                }}
                                className="text-base md:text-lg text-black border border-violetBlue rounded-md px-1.5 sm:px-3 py-0 sm:py-0.5"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={closeHandler}
                        className="text-xl"
                    >
                        <RxCross1 />
                    </button>
                </div>
                {getBudgetExpenses(budgetId).length === 0 && (
                    <div className="text-base md:text-lg text-center pt-3">
                        No expenses
                    </div>
                )}
                <div className="max-h-44 flex flex-col gap-x-2.5 overflow-y-auto pt-3">
                    {getBudgetExpenses(budgetId).map((expense) => (
                        <div
                            key={expense.expenseId}
                            className="flex justify-between items-center"
                        >
                            <div className="text-base md:text-lg capitalize">
                                {expense.description}
                            </div>
                            <div className="flex items-center gap-x-3">
                                <div className="text-base md:text-lg">
                                    {currencyFormattor.format(expense.amount)}
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        deleteExpense(expense.expenseId)
                                    }
                                    className="text-lg md:text-xl"
                                >
                                    <MdDeleteOutline />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ViewExpensesModal;
