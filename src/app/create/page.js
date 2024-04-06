"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerDemo } from "@/components/dateRangePicker"
import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function Create() {
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from("presales").insert({
      token_address: e.target.token.value,
      price: e.target.price.value,
      soft_cap: Number(e.target.soft.value),
      hard_cap: Number(e.target.hard.value),
      start_date: start,
      end_date: end
    })
    if (error) {
      alert('Bonk! u did something wrong')
      return
    }
    alert('Presale created!')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mt-8"> 💪 Create Presale </h1>
      <div className="bg-blue-800 rounded-xl mt-4 py-16">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
            <div className="flex items-center justify-center">
              <img src="/pepe.png" alt="frog" className="w-1/2" />
            </div>
            <Card className="mx-12">
              <CardContent className="py-8">
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="token">Input Token Contract Address </Label>
                    <Input id="token" name="token" placeholder="Token Address" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="price"> Set Presale Price </Label>
                    <Input id="price" name="price" placeholder="SOL" />
                  </div>
                  <div className="flex justify-between gap-8">
                    <div className="flex flex-col space-y-1.5 w-full">
                      <Label htmlFor="soft"> Soft Cap </Label>
                      <Input id="soft" name="soft" placeholder="SOL" />
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full">
                      <Label htmlFor="hard"> Hard Cap </Label>
                      <Input id="hard" name="hard" placeholder="SOL" />
                    </div>
                  </div>
                  <div className="flex justify-between gap-8">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name"> Presale Start Date </Label>
                      <DatePickerDemo date={start} setDate={setStart} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name"> Presale End Date </Label>
                      <DatePickerDemo date={end} setDate={setEnd} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button> Create </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
