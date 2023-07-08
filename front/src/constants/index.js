import { createTheme } from "@mui/material";
import { Theta, ThetaTestnet } from "@usedapp/core";
import { JsonRpcProvider } from "@ethersproject/providers";

export const APP_NAME = 'Event Go'
export const APP_DESC = 'Event Go はイベントに参加してNFTを集めることができるサービスです'

export const APP_THEME = createTheme({
    palette: {
        primary: {
            main: '#b8b8b8'
        },
        success: {
            main: '#0d66b4'
        },
    }
});

export const ACTIVE_NETWORK = ThetaTestnet;

export const DEFAULT_HOME_PAGE = '/mypage'

// usedapp theta testnet config
export const APP_NETWORK_CONFIG = {
    readOnlyChainId: ACTIVE_NETWORK.chainId,
    readOnlyUrls: {
        [ACTIVE_NETWORK.chainId]: 'https://eth-rpc-api-testnet.thetatoken.org/rpc'
    },
    networks: [ACTIVE_NETWORK],
}