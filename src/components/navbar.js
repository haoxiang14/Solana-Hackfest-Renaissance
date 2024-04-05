'use client'

import { useEffect, useState } from 'react'
import WalletMultiButton from './wallet-button'
import { WalletNotConnectedError } from "@solana/wallet-adapter-base"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js"
import { Button } from './ui/button'


export default function Navbar() {

    const wallet = useWallet();
    const [balance, setBalance] = useState(null);
    const { connected, publicKey} = useWallet();
    const { connection }  = useConnection();
    const publicKeyString = publicKey?.toBase58();
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
    

    return (
        <div className="flex justify-between py-4 px-4 bg-blue-200 items-center rounded-xl">
            <h1 className="text-3xl font-semibold">🐸 Meme.rush 🐶 </h1>
            <div className='flex items-center'>
                {connected? (
                    <Button className="px-4 py-6 font-bold bg-blue-800 hover:bg-black mr-2"> 
                        {balance} SOL 
                    </Button>
                ) : (
                    <Button className="px-4 py-6 font-bold bg-blue-800 hover:bg-black mr-2"> 
                        Balance
                    </Button>
                )}
                <WalletMultiButton />
            </div>
        </div>
        
    )
}