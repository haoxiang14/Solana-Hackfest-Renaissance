import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"

export default async function Buy() {
  const prices = ["0.1", "0.2", "0.5", "1"]
  const cookieStore = cookies()
  const supabase = createServerSupabaseClient({ cookies: () => cookieStore })
  const { data } = await supabase.from("presales").select()
  console.log(data)

  return (
    <div>
      <h1 className="text-3xl font-bold mt-8"> 🚀 Presale List </h1>
      <Table className="mt-4">
        <TableCaption> Presale List </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]"> Tokens </TableHead>
            <TableHead className="w-[200px]"> Amount </TableHead>
            <TableHead> Soft Cap </TableHead>
            <TableHead> Hard Cap </TableHead>
            <TableHead> Progress </TableHead>
            <TableHead> Presale Ends In </TableHead>
            <TableHead className="text-right"> Join </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((presale) => (
            <TableRow key={presale.id}>
              <TableCell className="font-medium flex items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="ml-2">{presale.token_address}</span>
              </TableCell>
              <TableCell> 1 SOL = {presale.price} tokens</TableCell>
              <TableCell> {presale.soft_cap} SOL </TableCell>
              <TableCell> {presale.hard_cap} SOL </TableCell>
              <TableCell>
                <p className="pb-4"> Progress = 10% </p>
                <Progress value={10} />
              </TableCell>
              <TableCell> {(new Date(presale.end_date)).toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button> Join </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Buy Coin</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="space-y-2">
                      <p>solsheet coin</p>
                      <ToggleGroup type="single" className="flex gap-4">
                        {prices.map((p) => (
                          <ToggleGroupItem value={p} className="w-full h-24 bg-neutral-200 data-[state=on]:bg-neutral-800 data-[state=on]:text-white text-numeric text-2xl font-bold">{p}</ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                      <div>
                        <label htmlFor="custom">Enter custom amount</label>
                        <Input id="custom" />
                      </div>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Ape</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
