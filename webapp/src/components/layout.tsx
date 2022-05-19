import Head from 'next/head'
import React, { ReactNode } from 'react'
import styles from 'styles/layout.module.css'

type Props = {
  children: ReactNode
}

export default function Layout(props: Props) {
  return (
    <>
      <Head>
        <title>Hello Web3 World.</title>
      </Head>
      <main className={styles.main}>{props.children}</main>
    </>
  )
}