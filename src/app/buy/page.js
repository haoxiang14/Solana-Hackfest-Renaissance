import Navbar from "@/components/navbar";
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
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function Buy () {
  return (
    <div>
      <Navbar />
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
          <TableRow>
            <TableCell className="font-medium flex items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="ml-2"> Pepe Token </span>
            </TableCell>
            <TableCell> 1 SOL = 100000 Pepe </TableCell>
            <TableCell> 5 SOL </TableCell>
            <TableCell> 10 SOL </TableCell>
            <TableCell>
              <p className="pb-4"> Progress = 10% </p>
              <Progress value={10} />
            </TableCell>
            <TableCell> 7:10:59 </TableCell>
            <TableCell className="text-right">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button> Join </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogDescription>
                      <Card className="w-full">
                        <CardHeader>
                          <CardTitle>Create project</CardTitle>
                          <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                        <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline">Cancel</Button>
                          <Button>Deploy</Button>
                        </CardFooter>
                      </Card>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}