import React, { useEffect,useState } from 'react'
import { Card, Text, Input, Button } from "@nextui-org/react"
import {HelloTokenABI as abi} from 'abi/HelloTokenABI'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import {Contract} from "@ethersproject/contracts";
import { formatEther } from "@ethersproject/units"
import { parseEther }from "@ethersproject/units"

interface Props {
    addressContract: string
}

export default function HelloToken(props:Props){
  const addressContract = props.addressContract
  const [symbol,setSymbol]= useState<string>("")
  const [totalSupply,setTotalSupply]=useState<string>()
  const [balance,setBalance]=useState<string|undefined>(undefined)
  const [toAddress, setToAddress]=useState<string>("")
  const [amount,setAmount]=useState<string>('100')

  const { account, active, library } = useWeb3React<Web3Provider>()

  useEffect( () => {
    if(!(active && account && library)) return

    const contract = new Contract(addressContract, abi, library);
    library.getCode(addressContract).then((result:string)=>{
      //check whether it is a contract
      if(result === '0x') return
      
      contract.symbol().then((result:string) => {
        setSymbol(result)
      }).catch('error', console.error)
  
      contract.totalSupply().then((result:string) => {
        setTotalSupply(formatEther(result))
      }).catch('error', console.error)
    })
  //called only when changed to active
  },[active])

  useEffect(()=>{
    if(!(active && account && library)) {
        setBalance(undefined)
        return
    }

    const contract = new Contract(addressContract, abi, library);
    library.getCode(addressContract).then((result:string)=>{
      //check whether it is a contract
      if(result === '0x') return

      balanceOf(contract, account)

      // listen for changes on an Ethereum address
      console.log(`listening for Transfer...`)

      const fromMe = contract.filters.Transfer(account, null)
      contract.on(fromMe, (from, to, amount, event) => {
        console.log('Transfer|sent', { from, to, amount, event })
        balanceOf(contract, account)
      })

      const toMe = contract.filters.Transfer(null, account)
      contract.on(toMe, (from, to, amount, event) => {
        console.log('Transfer|received', { from, to, amount, event })
        balanceOf(contract, account)
      })

      // remove listener when the component is unmounted
      return () => {
        contract.removeAllListeners(fromMe)
        contract.removeAllListeners(toMe)
      }
    })
  },[active,account])

  async function balanceOf(contract:Contract, account:any) {
    contract.balanceOf(account).then((result:string) => {
        setBalance(parseFloat(formatEther(result)).toFixed(2))
      }).catch('error', console.error)
  }

  async function onTransfer(event:React.FormEvent) {
    event.preventDefault()
    if(!(active && account && library)) return

    // new contract instance with **signer**
    const contract = new Contract(addressContract, abi, library.getSigner());
    contract.transfer(toAddress,parseEther(amount)).catch('error', console.error)
  }

　return (
    <>
      <Card hoverable bordered shadow={false} css={{my: "10px"}}>
        <Text><b>HelloToken合约地址</b>: {addressContract}</Text>
        <Text><b>Token总发行量</b>: {totalSupply} {symbol}</Text>
        <Text><b>当前钱包中的HelloToken数量</b>: {balance} {symbol}</Text>
      </Card>
      <Card hoverable bordered shadow={false} css={{my: "10px"}}>
        <form onSubmit={onTransfer}>
          <Input label="Amount" type="number" css={{mr: "10px"}}
            required onChange={(e) => setAmount(e.target.value)}/>
          <Input label="To Address" type="text" css={{ml: "10px"}}
            required onChange={(e) => setToAddress(e.target.value)} />
          <Button type="submit" disabled={!account} css={{mt: "20px"}}> Transfer </Button>
        </form>
      </Card>
    </>
  )
}