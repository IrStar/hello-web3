import type { NextPage } from 'next'
import { Grid, Card, Text, Button} from "@nextui-org/react";
import ConnectMetaMask from 'components/connectMetaMask'
import HelloToken from 'components/HelloToken';

interface Props {
  title: string,
  content: string
}

const HomeCard = (props:Props) => {
  return (
    <>
      <Card hoverable bordered shadow={false} css={{my: "10px"}}>
        <Text h4> {props.title} </Text>
        <Card.Footer>
          <Text> {props.content} </Text>
        </Card.Footer>
      </Card>
    </>
  )
}

const Home: NextPage = () => {

  const addressContract = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  return (
    <>
      <Grid.Container justify="flex-start">
        <Text h2 css={{my: "1rem", px: "5px"}}>
          第一个 Web3 DApp
        </Text>
        <HomeCard title='本文目标' content='让DApp跑起来' />
        <ConnectMetaMask />
        <HelloToken addressContract={addressContract} />
      </Grid.Container>
    </>
  )
}

export default Home