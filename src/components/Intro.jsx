import man from "../assets/man.png";
import woman from "../assets/woman.png";
import coins from "../assets/coins-and-notes.png";
import coupons from "../assets/discount-coupons.png";
import account from "../assets/account.png";

function Intro() {
    return (
        <div className="w-11/12 md:w-10/12 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-3 pt-10">
            <div className="flex flex-col gap-y-0 md:gap-y-2">
                <div className="font-bold text-3xl xsm:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-black tracking-wider">
                    Take Control of{" "}
                    <span className="text-violetBlue">Your Money</span>
                </div>
                <div className="text-lg sm:text-xl md:text-2xl text-black tracking-wide">
                    Personal budgeting is the secret to financial freedom. Start
                    your journey today.
                </div>
            </div>
            <div className="flex justify-between items-baseline relative">
                <img src={man} className="w-[38%]" />
                <img src={woman} className="w-[44%]" />
                <img
                    src={coins}
                    className="w-1/6 absolute left-[45%] -top-6 animate-topdown"
                />
                <img
                    src={account}
                    className="w-1/3 absolute left-[15%] top-[45%] animate-topdown"
                />
                <img
                    src={coupons}
                    className="w-[30%] absolute right-[15%] top-1/2 animate-topdown"
                />
            </div>
        </div>
    );
}

export default Intro;
