import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { useState, useEffect, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import {
  GHAcontractAddress,
  GHAcontractABI,
} from "../contracts/contractAddressesGHA";
import {
  esGHAcontractAddress,
  esGHAcontractABI,
} from "../contracts/contractAddressesEsGHA";
import { formatUnits, parseEther } from "ethers/lib/utils";

const Convert = () => {
  const address = useAddress();
  const [isOpen, setIsOpen] = useState(false);
  const [approveBtn, setApproveBtn] = useState("Approve");
  const [balance, setBalance] = useState(0);
  const [lockBtn, setLockBtn] = useState("Lock");

  const { contract } = useContract(GHAcontractAddress, GHAcontractABI);
  const { mutateAsync: approve, isLoading: isLoadingApproval } =
    useContractWrite(contract, "approve");

  const getApproval = async () => {
    if (!isLoadingApproval && approve) {
      setApproveBtn("Approving");
      try {
        await approve({ args: [esGHAcontractAddress, 1] });
        document.querySelector(".modal").style.display = "flex";
        document.querySelector(".approveBtn").style.display = "none";
        setApproveBtn("Approved");
        console.log("Approved");
      } catch (err) {
        setApproveBtn("Something went wrong, try again!");
        console.error("contract call failure", err);
      }
    }
  };

  const { data: currentBalance, isLoading: isLoadingBalance } = useContractRead(
    contract,
    "balanceOf",
    [address]
  );

  useEffect(() => {
    if (!isLoadingBalance && currentBalance) {
      setBalance(Number(formatUnits(currentBalance)).toString());
      console.log(balance);
    }
  }, [currentBalance, isLoadingBalance, balance]);

  const { contract: esGHA } = useContract(
    esGHAcontractAddress,
    esGHAcontractABI
  );
  const { mutateAsync: lock, isLoading: isLoadingLock } = useContractWrite(
    esGHA,
    "lock"
  );

  const lockAmount = async (e) => {
    e.preventDefault();
    if (!isLoadingLock && lock) {
      setLockBtn("Locking");
      try {
        const data = await lock({ args: [parseEther(balance)] });
        closeModal();
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
    <div className="inline-flex justify-center mt-16">
      <div className="w-80 h-auto py-6 px-8 border-2 border-purple-600 rounded-lg backdrop-blur-lg lg:py-12 lg:px-12 lg:w-96">
        <h2 className=" text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-purple-500 ">
          Lock.
        </h2>
        <p className="text-center text-slate-400 ml-1 mt-2">
          Lock your{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-600">
            GHA{" "}
          </span>
          and get{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            esGHA
          </span>
          .
        </p>
        <button
          className="modal ease-in-out duration-500 w-fit bg-gradient-to-r from-blue-800 to-purple-600 text-white mx-auto mt-5 py-1 px-5 rounded-md hidden hover:opacity-80"
          onClick={openModal}
        >
          {lockBtn}
        </button>
        <button
          className="approveBtn flex ease-in-out duration-500 w-fit bg-gradient-to-r from-blue-800 to-purple-600 text-white mx-auto mt-5 py-1 px-5 rounded-md hover:opacity-80"
          onClick={getApproval}
        >
          {approveBtn}
        </button>
        <p className="text-center text-slate-400 ml-1 mt-4 text-sm">
          Your current balance: {balance}
          {""}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-600">
            {""} GHA
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-center align-middle shadow-xl transition-all border-4 border-purple-600">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-semibold tracking-wider leading-6 text-purple-700"
                  >
                    Are you sure?
                  </Dialog.Title>
                  <p className="text-gray-200 font-light text-base text-left my-3">
                    Lock your tokens for{" "}
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                      boosted
                    </span>{" "}
                    rewards.{" "}
                    <a
                      href="https://ghast-protocol.gitbook.io/ghast-protocol/usdgha-token/usdesgha"
                      className="text-purple-500 underline font-medium"
                    >
                      Learn more
                    </a>
                  </p>
                  <button
                    className="ease-in-out duration-300 h-fit px-5 py-2 my-auto bg-transparent text-white text-base bg-gradient-to-r from-blue-800 to-purple-600 rounded-lg hover:bg-orange-950 hover:rounded-lg"
                    type="submit"
                    onClick={lockAmount}
                  >
                    Lock
                  </button>
                  <p className="text-left text-slate-400 ml-1 mt-4 text-sm">
                    Current balance: {balance} {""}
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-600">
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

export default Convert;
