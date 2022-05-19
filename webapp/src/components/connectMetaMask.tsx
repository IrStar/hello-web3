import { useEffect } from 'react'
import { Grid, Card, Button, Text} from '@nextui-org/react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { UserRejectedRequestError } from '@web3-react/injected-connector'
import { injectedConnector } from 'utils/connectors'
import { formatAddress } from 'utils/helpers'

const ConnectMetaMask = () => {

    const { account, chainId, active, library, connector, 
      activate, deactivate, setError } = useWeb3React<Web3Provider>()

    const onClickConnect = () => {
      activate(injectedConnector,(error) => {
        if (error instanceof UserRejectedRequestError) {
          // ignore user rejected error
          console.log("user refused")
        } else {
          setError(error)
        }
      }, false)
    }

    const onClickDisconnect = () => {
        deactivate()
      }

    useEffect(() => {
      console.log(chainId, account, active, library, connector)
    })

    return (
      <>
        <Card bordered shadow={false} css={{my: "10px"}}>
          {active && typeof account === 'string' 
            ? <Grid><Button onPress={onClickDisconnect} >
                Account: {formatAddress(account,4)}
                </Button>
                <Text>ChainID: {chainId} connected</Text>
              </Grid>
            : <Grid><Button onPress={onClickConnect}>
                Connect MetaMask
                </Button>
              <Text> not connected </Text>
              </Grid>
          }
        </Card>
      </>
    )
}

export default ConnectMetaMask