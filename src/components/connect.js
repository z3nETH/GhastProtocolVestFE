import { ConnectWallet } from "@thirdweb-dev/react";

const Connect = () => {
  return (
    <div className="h-screen flex ">
      <div className="m-auto">
        <ConnectWallet btnTitle="Connect"/>
      </div>
    </div>
  );
};
export default Connect;
