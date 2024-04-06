import { Button } from "@/components/ui/button"
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
import { DatePickerDemo } from "@/components/dateRangePicker"


export default function Create() {
  return (
    <div>
      <h1 className="text-3xl font-bold mt-8"> 💪 Create Presale </h1>
      <div className="bg-blue-800 rounded-xl mt-4 py-16">
        <div className="grid grid-cols-2">
          <div className="flex items-center justify-center">
            <img src="/pepe.png" alt="frog" className="w-1/2" />
          </div>
          <Card className="mx-12">
            <CardContent className="py-8">
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Input Token Contract Address </Label>
                    <Input id="name" placeholder="Token Address" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name"> Set Presale Price </Label>
                    <Input id="name" placeholder="SOL" />
                  </div>
                  <div className="flex justify-between gap-8">
                    <div className="flex flex-col space-y-1.5 w-full">
                      <Label htmlFor="name"> Soft Cap </Label>
                      <Input id="name" placeholder="SOL" />
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full">
                      <Label htmlFor="name"> Hard Cap </Label>
                      <Input id="name" placeholder="SOL" />
                    </div>
                  </div>
                  <div className="flex justify-between gap-8">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name"> Presale Start Date </Label>
                      <DatePickerDemo />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name"> Presale End Date </Label>
                      <DatePickerDemo />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button> Create </Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div> 
  );
}
