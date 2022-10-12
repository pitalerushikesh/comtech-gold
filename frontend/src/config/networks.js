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
    rpcUrl: 'https://rpc.xinfin.yodaplus.net',
    deploymentUrl: 'https://tokenization.yodaplus.net/'
  }),
  buildNetworkConfig(apothemDeployment, {
    id: 51,
    name: 'XDC Apothem Testnet',
    rpcUrl: 'https://rpc-apothem.xinfin.yodaplus.net',
    deploymentUrl: 'https://tokenization-apothem.yodaplus.net/'
  })
];

export default NETWORKS;
