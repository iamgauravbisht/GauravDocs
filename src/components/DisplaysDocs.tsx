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
import { useEffect, useState } from "react";
import { getRecentDocs, getAllDocs } from "@/authController/docController";
import useMyContext from "@/store/useMyContext";
import { deleteDoc } from "@/authController/docController";

export default function DisplaysDocs(): JSX.Element {
  const { state, dispatch } = useMyContext();
  const [recentDocs, setRecentDocs] = useState([]);
  const [allDocs, setAllDocs] = useState([]);

  const editHandler = (documentId: string) => {
    // {state.appState === "editor" ? <TextEditor /> : null}
    dispatch({ type: "SET_APPSTATE", payload: "editor" });
    dispatch({ type: "SET_CREATE_DOCUMENT_ID", payload: documentId });
  };
  const deleteHandler = async (id: string) => {
    await deleteDoc(id);
    initializingTabelData();
  };

  type Document = {
    _id: string;
    title: string;
    date: string;
  };

  function formatTimeDifference(dateStr: string): string | null {
    const currentDate = new Date();
    const inputDate = new Date(dateStr);

    // Check if the input date is valid
    if (isNaN(inputDate.getTime())) {
      console.error("Invalid date format");
      return null;
    }

    const timeDifferenceInSeconds = Math.floor(
      (currentDate.getTime() - inputDate.getTime()) / 1000
    );

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} seconds`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (timeDifferenceInSeconds < 31536000) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} day${days > 1 ? "s" : ""}`;
    } else {
      const years = Math.floor(timeDifferenceInSeconds / 31536000);
      return `${years} year${years > 1 ? "s" : ""}`;
    }
  }
  const initializingTabelData = async () => {
    const recent_docs = await getRecentDocs(state.userId);
    const all_docs = await getAllDocs(state.userId);
    setRecentDocs(recent_docs);
    setAllDocs(all_docs);
  };

  useEffect(() => {
    initializingTabelData();
  }, []);

  return (
    <Tabs defaultValue="recent" className="max-w-[600px] w-full">
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
            {recentDocs.length > 0
              ? recentDocs.map((document: Document) => {
                  // Check if the document is not null or undefined
                  if (document) {
                    return (
                      <TableRow key={document._id}>
                        <TableCell className="font-medium">
                          {document.title}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell	">
                          {formatTimeDifference(document.date)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button onClick={() => editHandler(document._id)}>
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant={"destructive"}
                            onClick={() => deleteHandler(document._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  } else {
                    return null; // Handle the case where 'document' is null or undefined
                  }
                })
              : null}
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
            {allDocs.length > 0
              ? allDocs.map((document: Document) => {
                  // Check if the document is not null or undefined
                  if (document) {
                    return (
                      <TableRow key={document._id}>
                        <TableCell className="font-medium">
                          {document.title}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell	">
                          {formatTimeDifference(document.date)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button onClick={() => editHandler(document._id)}>
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant={"destructive"}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    );
                  } else {
                    return null; // Handle the case where 'document' is null or undefined
                  }
                })
              : null}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
}
