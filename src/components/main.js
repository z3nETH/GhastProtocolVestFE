import Convert from "./convert";
import Vest from "./vest";

const Main = () => {
  return (
    <div className="mt-20">
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
    </div>
  );
};

export default Main;
