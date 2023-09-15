import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import NewDoc from "./NewDoc";

export default function DisplaysDocs(): JSX.Element {
  return (
    <Tabs defaultValue="recent" className="max-w-[600px]">
      <NewDoc />
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="recent">Recent</TabsTrigger>
        <TabsTrigger value="all">All</TabsTrigger>
      </TabsList>
      <TabsContent value="recent">
        <Table>
          <TableCaption>A list of your recent documents</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Document Name</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-right">Edit</TableHead>
              <TableHead className="text-right ">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Recent</TableCell>
              <TableCell className="hidden sm:table-cell	">29/01/01</TableCell>
              <TableCell className="text-right">
                <Button>Edit</Button>
              </TableCell>
              <TableCell className="text-right">
                <Button variant={"destructive"}>Delete</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TabsContent>

      <TabsContent value="all">
        <Table>
          <TableCaption>A list of your all documents</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Document Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Edit</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">All</TableCell>
              <TableCell>29/01/01</TableCell>
              <TableCell className="text-right">
                <Button>Edit</Button>
              </TableCell>
              <TableCell className="text-right">
                <Button variant={"destructive"}>Delete</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
}
