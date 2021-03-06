'use client'

import Head from 'next/head'
import Image from 'next/image'
import HeartParticles from 'core/particles/HeartParticles'
import styles from './Home.module.scss'

const Home = () => {
  return (
    <>
      <Head>
        <title>Heart</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <HeartParticles />
      </main>
    </>
  )
}

export default Home
