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
            <CardFooter className="flex justify-end">
              <Button> Create </Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div> 
  );
}
