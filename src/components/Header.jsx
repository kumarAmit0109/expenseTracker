import { AiOutlineHome } from "react-icons/ai";

function Header({ onAddBudgetClickHandler, onAddExpenseClickHandler }) {
    return (
        <div className="w-11/12 md:w-10/12 max-w-7xl mx-auto flex justify-between items-center py-4">
            <div className="flex items-center gap-x-1 cursor-default">
                <AiOutlineHome className="text-4xl text-black" />
                <div className="hidden sm:inline-block font-medium text-2xl tracking-wider pt-1">
                    <span className="text-violetBlue">Home</span>
                    <span className="text-black">Budget</span>
                </div>
            </div>
            <div className="flex items-center gap-x-3">
                <button
                    type="button"
                    onClick={onAddBudgetClickHandler}
                    className="text-xs xsm:text-sm sm:text-base text-black border border-violetBlue rounded sm:rounded-md px-3 sm:px-4 py-1 sm:py-1.5"
                >
                    Add Budget
                </button>
                <button
                    type="button"
                    onClick={onAddExpenseClickHandler}
                    className="text-xs xsm:text-sm sm:text-base text-white bg-violetBlue border border-violetBlue rounded sm:rounded-md px-3 sm:px-4 py-1 sm:py-1.5"
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
}

export default Header;
