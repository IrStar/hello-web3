import { InjectedConnector } from "@web3-react/injected-connector";

export const injectedConnector = new InjectedConnector({
    supportedChainIds: [
        1,      // mainnet
        3,      // ropsten
        4,      // rinkeby
        5,      // goerli
        42,     // kovan
        31337,  // localhost
    ]
})