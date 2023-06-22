import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import Vest from "../src/components/vest";
import Convert from "./components/convert";
import logo from "./images/ghastLogo.svg";
export default function Home() {
  return (
    <div className=" py-5 h-screen mb-5 lg:px-10">
      <header className="w-auto mt-3 pb-3 px-3 flex border-b-[1px] border-red-500">
        <a href="https://ghastprotocol.com/" className="mr-auto">
          <img src={logo} alt="logo" />
        </a>
        <div className="">
          <ConnectWallet />
        </div>
      </header>
      <main className="mt-20">
        <h1 className="text-center text-white font-medium tracking-wide text-6xl">
          Boost your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            rewards
          </span>
          .
        </h1>
        <div className="flex flex-wrap justify-center mx-auto gap-0 lg:flex-nowrap lg:gap-16">
          <Convert />
          <Vest />
        </div>
      </main>
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
    </div>
  );
}
