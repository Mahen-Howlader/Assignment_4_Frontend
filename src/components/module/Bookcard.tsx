import type { AddbookProps } from "@/Typescript/typescript";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { useDeleteBookMutation } from "@/redux/features/api/bookApi";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import Editmodal from "./Editmodal";

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

                <Button
                    disabled={deleteLoading}
                    onClick={() => deleteBookFun(_id)}
                    variant="destructive"
                    size="sm"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                    Borrow Book
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default Bookcard;
