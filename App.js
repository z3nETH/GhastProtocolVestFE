import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import "./styles/Home.css";
import logo from "./images/ghastLogo.svg";
import { Toaster } from "react-hot-toast";
import Main from "./components/main";
import Connect from "./components/connect";

export default function Home() {
  const address = useAddress();
  return (
    <div className=" py-5 h-screen mb-5 lg:px-10">
      <header className="w-auto mt-3 pb-3 px-3 flex border-b-[1px] border-red-500">
        <a
          href="https://ghastprotocol.com/"
          className="mr-auto flex align-middle"
        >
          <img src={logo} alt="logo" />
          <h1 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-b from-red-600 to-orange-400 my-auto ml-3">
            GHA
          </h1>
        </a>
        <div className="">
          <ConnectWallet btnTitle="Connect" />
        </div>
      </header>

      {address ? <Main /> : <Connect />}
      <div className="border-t-2 border-red-500 mt-24 mx-20 lg:mx-96"></div>
      <footer className=" w-auto mx-auto mb-5">
        <h3 className="mt-5 text-center text-slate-300 ml-1">DISCLAIMER:</h3>
        <p className="text-center text-slate-400 ml-1 mt-1">
          This is an unofficial and{" "}
          <span className="text-red-400">TEMPORARY</span> interface made by me(
          <a
            href="https://twitter.com/0xKelz"
            className="text-orange-400 underline hover:text-red-500"
          >
            @0xKelz
          </a>
          ) as a contribution to the{" "}
          <a
            href="https://ghastprotocol.com/"
            className="text-orange-400 underline hover:text-red-500"
          >
            Ghast protocol
          </a>
          .
        </p>
        <br></br>
        <p className="text-center text-slate-400 ml-1 mt-1">
          Feel free to test this with small amounts and/or new wallets also make
          sure to share with me any concerns/feedbacks!
        </p>
      </footer>
      <Toaster />
    </div>
  );
}
