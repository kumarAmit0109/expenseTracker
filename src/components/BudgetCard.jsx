import { currencyFormattor } from "../utils.js";

function BudgetCard({
    budgetName,
    amount,
    maxAmount,
    onAddExpenseClickHandler,
    onViewExpenseClickHandler,
    cardType,
}) {
    const amountAndMaxAmountPercentage = () => {
        return parseInt((amount * 100) / maxAmount) + "%";
    };

    const cardColor = () => {
        if (cardType === "uncategorized-card") {
            return "#6674cc";
        }
        const ratio = parseFloat(amount / maxAmount);
        if (ratio < 0.5) {
            return "#6674cc";
        } else if (ratio < 0.75) {
            return "#facc15";
        } else {
            return "#ef4444";
        }
    };

    return (
        <div
            className="flex flex-col gap-y-5 bg-white rounded-lg border-b-4 shadow-lg transition-colors duration-300 px-3 py-4"
            style={{ borderColor: cardColor() }}
        >
            <div className="flex justify-between items-baseline">
                <div className="text-lg sm:text-xl capitalize cursor-default">
                    {budgetName}
                </div>
                <div>
                    <span>{currencyFormattor.format(amount)} </span>
                    {cardType !== "uncategorized-card" && (
                        <span>/ {currencyFormattor.format(maxAmount)}</span>
                    )}
                </div>
            </div>
            {cardType !== "uncategorized-card" && (
                <div
                    className="w-full h-3.5 md:h-5 bg-white border rounded-full relative overflow-hidden transition-colors duration-300"
                    style={{ borderColor: cardColor() }}
                >
                    <div
                        className="absolute left-0 top-0 bottom-0 transition-progress duration-300"
                        style={{
                            width: amountAndMaxAmountPercentage(),
                            backgroundColor: cardColor(),
                        }}
                    ></div>
                </div>
            )}
            {cardType !== "total-card" && (
                <div className="flex justify-end items-center gap-x-3">
                    <button
                        type="button"
                        onClick={onAddExpenseClickHandler}
                        className="text-xs xsm:text-sm sm:text-base text-black border rounded sm:rounded-md px-2 sm:px-3 py-0.5 sm:py-1 transition-colors duration-300"
                        style={{ borderColor: cardColor() }}
                    >
                        Add Expense
                    </button>
                    <button
                        type="button"
                        onClick={onViewExpenseClickHandler}
                        className="text-xs xsm:text-sm sm:text-base text-white border rounded sm:rounded-md px-2 sm:px-3 py-0.5 sm:py-1 transition-colors duration-300"
                        style={{
                            backgroundColor: cardColor(),
                            borderColor: cardColor(),
                        }}
                    >
                        View Expenses
                    </button>
                </div>
            )}
        </div>
    );
}

export default BudgetCard;
