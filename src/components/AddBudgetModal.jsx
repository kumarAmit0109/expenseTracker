import { useRef } from "react";
import { useBudget } from "../contexts";
import { RxCross1 } from "react-icons/rx";

function AddBudgetModal({ show, closeHandler }) {
    const budgetNameRef = useRef();
    const maxAmountRef = useRef();
    const { addBudget } = useBudget();

    const addBudgetHandler = (event) => {
        event.preventDefault();
        addBudget(
            budgetNameRef.current.value,
            parseInt(maxAmountRef.current.value)
        );
        budgetNameRef.current.value = "";
        maxAmountRef.current.value = "";
        closeHandler();
    };

    const addBudgetModalCloseHandler = () => {
        budgetNameRef.current.value = "";
        maxAmountRef.current.value = "";
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
                onClick={addBudgetModalCloseHandler}
            ></div>
            <div
                className={`w-11/12 md:w-2/3 max-w-lg mx-auto absolute left-1/2 top-1/2 z-20 -translate-x-1/2 bg-white rounded-md ${
                    show
                        ? "opacity-100 pointer-events-auto -translate-y-1/2"
                        : "opacity-0 pointer-events-none -translate-y-1/4"
                } transition-all duration-200 px-3 sm:px-5 py-2 sm:py-4`}
            >
                <div className="flex justify-between items-center pb-3 border-b border-blackWith44">
                    <div className="text-lg md:text-xl">New Budget</div>
                    <button
                        type="button"
                        onClick={addBudgetModalCloseHandler}
                        className="text-xl"
                    >
                        <RxCross1 />
                    </button>
                </div>
                <form
                    onSubmit={addBudgetHandler}
                    className="flex flex-col gap-y-2 pt-3"
                >
                    <label
                        htmlFor="budget-name"
                        className="text-base md:text-lg"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="budget-name"
                        ref={budgetNameRef}
                        required
                        minLength={3}
                        maxLength={12}
                        className="text-base md:text-lg border border-blackWith44 rounded focus:outline-none focus:border-black transition-colors duration-300 px-2 py-0.5"
                    />
                    <label
                        htmlFor="budget-max-spending"
                        className="text-base md:text-lg pt-1"
                    >
                        Maximum Spending
                    </label>
                    <input
                        type="number"
                        id="budget-max-spending"
                        ref={maxAmountRef}
                        min={0}
                        max={1000000000}
                        step={1}
                        required
                        className="text-base md:text-lg border border-blackWith44 rounded focus:outline-none focus:border-black transition-colors duration-300 px-2 py-0.5"
                    />
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

export default AddBudgetModal;
