import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import Vest from "./vest";

export default function Home() {
  return (
    <div className="px-10 py-5">
      <header className="mr-auto mt-3 flex justify-end">
        <ConnectWallet />
      </header>
      <main className="mt-20 min-h-screen">
        <h1 className="text-center text-white font-medium tracking-wide text-6xl">
          Vest your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            esGHA
          </span>
        </h1>
        <Vest />
      </main>
      <footer className="border-t-2 border-red-500  w-auto mt-auto">
        <h3 className="mt-5 text-left text-slate-300 ml-1">DISCLAIMER:</h3>
        <p className="text-left text-slate-400 ml-1 mt-1">
          This is an unofficial and{" "}
          <span className="text-red-400 underline">TEMPORARY</span> interface
          made by me(
          <a href="https://twitter.com/0xKelz" className="text-orange-400">
            @0xKelz
          </a>
          ) as a contribution to the{" "}
          <a href="https://ghastprotocol.com/" className="text-orange-400">
            Ghast protocol
          </a>
          .
        </p>
        <br></br>
        <p className="text-left text-slate-400 ml-1 mt-1">
          Feel free to test this with small amounts and/or new wallets also make
          sure to share with me any concerns/feedbacks!
        </p>
      </footer>
    </div>
  );
}
