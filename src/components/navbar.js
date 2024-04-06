'use client'

import { WalletNotConnectedError } from "@solana/wallet-adapter-base"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { useEffect, useState } from "react"

import { Button } from '@/components/ui/button'
import WalletMultiButton from '@/components/wallet-button'
import Link from 'next/link'

export function Navbar() {
  const wallet = useWallet();
  const [balance, setBalance] = useState(null);
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (!publicKey) {
      return;
    }
    connection.getBalance(new PublicKey(publicKeyString)).then(balance => {
      setBalance((balance / LAMPORTS_PER_SOL).toFixed(2));
    }).catch(err => {
      if (err instanceof WalletNotConnectedError) {
        console.log("Wallet not connected");
      } else {
        console.error(err);
      }
    });
  }, [publicKey, connection]);

  const publicKeyString = publicKey?.toBase58();

  return (
    <div className="flex justify-between py-4 px-4 bg-blue-200 items-center rounded-xl">
      <Link href="/">
        <h1 className="text-3xl font-semibold">🐸 Meme.rush 🐶 </h1>
      </Link>
      <div className='flex items-center'>
        {connected ? (
          <Button className="px-4 py-6 text-base font-bold bg-blue-800 hover:bg-black mr-2">
            {balance} SOL
          </Button>
        ) : (
          <Button className="px-4 py-6 text-base font-bold bg-blue-800 hover:bg-black mr-2">
            Balance
          </Button>
        )}
        <WalletMultiButton />
      </div>
    </div>
  )
}
