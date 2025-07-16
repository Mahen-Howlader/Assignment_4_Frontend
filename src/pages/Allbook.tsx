import { useGetBookQuery } from "@/redux/features/api/bookApi";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { Book } from "@/Typescript/typescript";
import Bookcard from "@/components/module/Bookcard";

function Allbook() {
    const { data, isLoading, isError } = useGetBookQuery(undefined);
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching books.</p>;

    return (
        <div className="px-10 mt-5">
            <Table>
                <TableCaption>A list of all books in the system.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[180px]">Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>ISBN</TableHead>
                        <TableHead>Copies</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data?.map((book: Book) => (
                        < Bookcard key={book._id} book={book} />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6}>Total Books {data?.data?.length}</TableCell>
                        <TableCell className="text-right">1</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>


        </div>
    );
}

export default Allbook;