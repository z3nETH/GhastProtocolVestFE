import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { useState, useEffect, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import {
  esGHAcontractAddress,
  esGHAcontractABI,
} from "../contracts/contractAddressesEsGHA";
import { formatUnits, parseEther } from "ethers/lib/utils";

const Vest = () => {
  const address = useAddress();
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(0);

  const { contract: getBalance } = useContract(
    esGHAcontractAddress,
    esGHAcontractABI
  );
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
  }, [currentBalance, isLoadingBalance, balance]);

  const { contract: vestingContract } = useContract(
    esGHAcontractAddress,
    esGHAcontractABI
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

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className=" group inline-flex justify-center mt-16">
      <div className="ease-in-out duration-150 w-80 h-auto py-6 px-8 border-t-2 border-l-2 border-red-600 shadow-[3px_3px_3px_3px] group-hover:shadow-[4px_4px_4px_4px] group-hover:shadow-red-600 shadow-red-600 rounded-lg backdrop-blur-lg lg:py-12 lg:px-12 lg:w-96">
        <h2 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-400 mb-2 tracking-wider">
          Vest.
        </h2>
        <p className="text-center text-white ml-1 mt-2 text-lg">
          Vest your{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            esGHA {""}
          </span>
          back into {""}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            GHA
          </span>
        </p>
        <p className="text-center text-sm  text-white ml-1 mt-2">
          Vesting lasts{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            200 days
          </span>
          !
        </p>
        <button
          className="flex ease-in-out duration-150 w-fit bg-gradient-to-r from-red-700 to-orange-600 text-white mx-auto mt-5 py-2 px-10 tracking-widest font-semibold rounded-md hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[3px_3px_3px_3px] hover:shadow-orange-800"
          onClick={openModal}
        >
          Vest
        </button>
        <p className="text-center text-slate-300 ml-1 mt-4 text-sm">
          Your current balance: {balance !== 0 ? balance : 0} {""}
          <span className=" font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
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
                    className="text-3xl font-semibold tracking-wider leading-6 text-red-500"
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
                    className="ease-in-out duration-300 h-fit px-5 py-2 my-auto bg-transparent text-white text-base bg-gradient-to-r from-red-700 to-orange-600 rounded-lg hover:opacity-90 hover:rounded-lg"
                    type="submit"
                    onClick={vestAll}
                  >
                    Vest All
                  </button>
                  <p className="text-left text-slate-300 ml-1 mt-4 text-sm">
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
