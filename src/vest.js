import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { useState, useEffect, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { contractAddress, contractABI } from "./contracts/contractAddresses";
import { formatUnits, parseEther } from "ethers/lib/utils";

const Vest = () => {
  const address = useAddress();
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const [balance, setBalance] = useState(0);

  const inputAmount = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
    console.log(amount);
  };

  const { contract: getBalance } = useContract(contractAddress, contractABI);
  const { data: currentBalance, isLoading: isLoadingBalance } = useContractRead(
    getBalance,
    "balanceOf",
    [address]
  );

  useEffect(() => {
    if (!isLoadingBalance && currentBalance) {
      setBalance(Number(formatUnits(currentBalance)).toString());
      console.log(balance);
    }
  }, [currentBalance, isLoadingBalance, balance, amount]);

  const { contract: vestingContract } = useContract(
    contractAddress,
    contractABI
  );
  const { mutateAsync: vest, isLoading: isLoadingVesting } = useContractWrite(
    vestingContract,
    "vest"
  );

  const vestAll = async (e) => {
    e.preventDefault();
    if (!isLoadingVesting && vest) {
      try {
        const data = await vest({ args: [parseEther(balance)] });
        console.info("contract call successs", data);
      } catch (err) {
        console.error("contract call failure", err);
      }
    }
  };

  //   const vestInput = async (e) => {
  //     e.preventDefault();
  //     setAmount(formatUnits(amount));
  //     if (!isLoadingVesting && vest) {
  //       try {
  //         const data = await vest({ args: [parseEther(amount)] });
  //         console.info("contract call successs", data);
  //       } catch (err) {
  //         console.error("contract call failure", err);
  //       }
  //     }
  //   };

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="flex justify-center mt-16">
      <div className="w-fit h-auto py-6 px-8 border-2 border-red-500 rounded-lg backdrop-blur-lg lg:py-12 lg:px-24">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-400 ">
          Vest now
        </h2>
        <p className="text-left text-slate-400 ml-1 mt-2">
          Click the button below to vest your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            esGHA
          </span>
          .
        </p>
        <button
          className=" ease-in-out duration-500 w-fit bg-gradient-to-r from-red-600 to-purple-400 text-white mx-auto mt-5 py-1 px-5 rounded-md hover:opacity-80"
          onClick={openModal}
        >
          Vest
        </button>
        <p className="text-left text-slate-400 ml-1 mt-4 text-sm">
          Your current balance: {balance !== 0 ? balance : 0} {""}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            esGHA
          </span>
        </p>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4"></div>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-center align-middle shadow-xl transition-all border-4 border-red-700">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-semibold tracking-wider leading-6 text-orange-500"
                  >
                    Are you sure?
                  </Dialog.Title>
                  <p className="text-gray-200 font-light text-base text-left my-3">
                    Vesting will last 200 days.{" "}
                    <a
                      href="https://ghast-protocol.gitbook.io/ghast-protocol/usdgha-token/usdesgha"
                      className="text-red-500 underline font-medium"
                    >
                      Learn more
                    </a>
                  </p>
                  <button
                    className="ease-in-out duration-300 h-fit px-5 py-2 my-auto bg-transparent text-white text-base bg-gradient-to-r from-orange-500 to-purple-700 rounded-lg hover:bg-orange-950 hover:rounded-lg"
                    type="submit"
                    onClick={vestAll}
                  >
                    Vest All
                  </button>
                  {/* <form className="modal w-auto max-w-sm mx-auto justify-evenly">
                    <div className="flex items-center border-b border-orange-500 py-2">
                      <input
                        className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Amount"
                        aria-label="Amount to mint"
                        onChange={inputAmount}
                      />
                      <button
                        className="ease-in-out duration-300 flex-shrink-0 bg-gradient-to-r from-red-700 to-orange-400 hover:opacity-80 text-sm text-white py-2 px-3 rounded"
                        type="submit"
                        onClick={vestInput}
                      >
                        Vest
                      </button>
                      <button
                        className="ease-in-out duration-300 h-fit px-5 py-2 my-auto bg-transparent text-white text-base hover:bg-orange-950 hover:rounded-lg"
                        type="submit"
                        onClick={vestAll}
                      >
                        Max
                      </button>
                    </div>
                  </form> */}
                  <p className="text-left text-slate-400 ml-1 mt-4 text-sm">
                    Current balance: {balance !== 0 ? balance : 0} {""}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
                      esGHA
                    </span>
                  </p>
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Vest;
