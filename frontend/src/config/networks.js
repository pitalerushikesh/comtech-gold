import apothemDeployment from '@yodaplus/dapps-lib/contracts/apothem.json';
import mainnetDeployment from '@yodaplus/dapps-lib/contracts/mainnet.json';

const buildNetworkConfig = (contractsDeployment, base) => {
  const { address: tokenContractAddress, abi: tokenContractAbi } =
    contractsDeployment.contracts.Goldtoken;
  const { address: controllerContractAddress, abi: controllerContractAbi } =
    contractsDeployment.contracts.CGOController;

  return {
    ...base,
    tokenContractAddress,
    tokenContractAbi,
    controllerContractAddress,
    controllerContractAbi
  };
};

const NETWORKS = [
  buildNetworkConfig(mainnetDeployment, {
    id: 50,
    name: 'XDC Mainnet',
    rpcUrl: 'https://xdcpayrpc.blocksscan.io/',
    deploymentUrl: 'https://governance.comtechglobal.ae/'
  }),
  buildNetworkConfig(apothemDeployment, {
    id: 51,
    name: 'XDC Apothem Testnet',
    rpcUrl: 'https://apothemxdcpayrpc.blocksscan.io/',
    deploymentUrl: 'https://governance.comtechglobal.ae/'
  })
];

export default NETWORKS;
