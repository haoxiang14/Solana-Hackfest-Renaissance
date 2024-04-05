import Navbar from "@/components/navbar";
import Link from "next/link";


export default function Home() {
  return (
      <main>
        <Navbar />
        <div>
          <h1 className="text-3xl font-bold text-center mt-8">🐸 Welcome to Meme.rush 🐶 </h1>
          <p className="text-center text-xl mt-4">The best place to create memecoins and presales </p>
          <div className="grid grid-cols-2 my-8 gap-4">
            <Link href="/create">
              <div className="bg-blue-200 rounded-xl h-96 hover:bg-opacity-50 flex justify-center items-center">
                <h1 className="pr-8 text-2xl font-semibold"> I want to create a presale </h1>
                <img src="/buge_doge.png" alt="doge" className="h-5/6" />
              </div>
            </Link>
            <Link href="/buy">
              <div className="bg-blue-800 rounded-xl h-96 hover:bg-black flex justify-center items-center">
                <img src="/pepe.png" alt="frog" className="w-1/2 h-5/6" />
                <h1 className="pl-8 text-2xl font-semibold text-white"> I want to buy a presale </h1>
              </div>
            </Link>
          </div>
        </div>
      </main>
  );
}
