import type { AddbookProps } from "@/Typescript/typescript";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { useDeleteBookMutation } from "@/redux/features/api/bookApi";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import Editmodal from "./Editmodal";
import Borrow from "./Borrow";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

function Bookcard({ book }: AddbookProps) {
    const [deleteBook, { isLoading: deleteLoading }] = useDeleteBookMutation();

    const { _id, title, author, genre, isbn, copies } = book;

    async function deleteBookFun(id: string) {
        try {
            const { data } = await deleteBook(id);
            toast.success(data?.message || "✅ Book deleted successfully!");
        } catch (error: any) {
            toast.error(`Failed to delete book: ${error?.data?.message || "Unknown error"}`);
        }
    }

    return (
        <TableRow>
            <TableCell className="font-medium">{title}</TableCell>
            <TableCell>{author}</TableCell>
            <TableCell>{genre}</TableCell>
            <TableCell>{isbn}</TableCell>
            <TableCell>{copies}</TableCell>
            <TableCell>
                {copies <= 0 ? (
                    <span className="text-red-600 font-medium">Unavailable</span>
                ) : (
                    <span className="text-green-600 font-medium">Available</span>
                )}
            </TableCell>
            <TableCell className="flex justify-end gap-x-2">
                <Editmodal book={book} />
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className="bg-red-600 text-white" size="sm">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the book and remove it from the database.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                            
                                disabled={deleteLoading}
                                onClick={() => deleteBookFun(_id)}
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Borrow bookId={_id} copies={copies}></Borrow>
            </TableCell>
        </TableRow>
    );
}

export default Bookcard;
