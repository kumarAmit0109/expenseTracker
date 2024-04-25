import { useRef } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudget } from "../contexts";
import { RxCross1 } from "react-icons/rx";

function AddExpenseModal({ show, defaultBudgetId, closeHandler }) {
    const budgetIdRef = useRef();
    const descriptionRef = useRef();
    const amountRef = useRef();
    const { budgets, addExpense } = useBudget();

    const addExpenseHandler = (event) => {
        event.preventDefault();
        addExpense(
            budgetIdRef.current.value,
            descriptionRef.current.value,
            parseInt(amountRef.current.value)
        );
        budgetIdRef.current.value = defaultBudgetId;
        descriptionRef.current.value = "";
        amountRef.current.value = "";
        closeHandler();
    };

    const addExpenseModalCloseHandler = () => {
        budgetIdRef.current.value = defaultBudgetId;
        descriptionRef.current.value = "";
        amountRef.current.value = "";
        closeHandler();
    };

    return (
        <>
            <div
                className={`w-full h-full absolute inset-0 z-10 bg-blackWith18 backdrop-blur-sm ${
                    show
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                } transition-opacity duration-200`}
                onClick={addExpenseModalCloseHandler}
            ></div>
            <div
                className={`w-11/12 md:w-2/3 max-w-lg mx-auto absolute left-1/2 top-1/2 z-20 -translate-x-1/2 bg-white rounded-md ${
                    show
                        ? "opacity-100 pointer-events-auto -translate-y-1/2"
                        : "opacity-0 pointer-events-none -translate-y-1/4"
                } transition-all duration-200 px-3 sm:px-5 py-2 sm:py-4`}
            >
                <div className="flex justify-between items-center pb-3 border-b border-blackWith44">
                    <div className="text-lg md:text-xl">New Expense</div>
                    <button
                        type="button"
                        onClick={addExpenseModalCloseHandler}
                        className="text-xl"
                    >
                        <RxCross1 />
                    </button>
                </div>
                <form
                    onSubmit={addExpenseHandler}
                    className="flex flex-col gap-y-2 pt-3"
                >
                    <label
                        htmlFor="expense-description"
                        className="text-base md:text-lg"
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        id="expense-description"
                        ref={descriptionRef}
                        minLength={3}
                        maxLength={12}
                        required
                        className="text-base md:text-lg border border-blackWith44 rounded focus:outline-none focus:border-black transition-colors duration-300 px-2 py-0.5"
                    />
                    <label
                        htmlFor="expense-amount"
                        className="text-base md:text-lg"
                    >
                        Amount
                    </label>
                    <input
                        type="number"
                        id="expense-amount"
                        ref={amountRef}
                        min={0}
                        max={1000000000}
                        step={1}
                        required
                        className="text-base md:text-lg border border-blackWith44 rounded focus:outline-none focus:border-black transition-colors duration-300 px-2 py-0.5"
                    />
                    <label htmlFor="budget-id" className="text-base md:text-lg">
                        Budget
                    </label>
                    <select
                        id="budget-id"
                        ref={budgetIdRef}
                        className="text-base md:text-lg border border-blackWith44 rounded focus:outline-none focus:border-black transition-colors duration-300 px-1 py-0.5 capitalize"
                    >
                        <option
                            value={UNCATEGORIZED_BUDGET_ID}
                            selected={
                                defaultBudgetId === UNCATEGORIZED_BUDGET_ID
                                    ? true
                                    : false
                            }
                        >
                            Uncategorized
                        </option>
                        {budgets.map((budget) => (
                            <option
                                key={budget.budgetId}
                                value={budget.budgetId}
                                selected={
                                    defaultBudgetId === budget.budgetId
                                        ? true
                                        : false
                                }
                            >
                                {budget.budgetName}
                            </option>
                        ))}
                    </select>
                    <div className="flex justify-end items-center">
                        <button
                            type="submit"
                            className="text-base md:text-lg text-white bg-violetBlue rounded-md px-4 py-1 mt-1"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddExpenseModal;
