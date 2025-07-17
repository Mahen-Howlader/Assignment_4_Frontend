import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetBorrowQuery } from "@/redux/features/api/bookApi";
import type { BorrowSummary } from "@/Typescript/typescript";

function Borrow_Summary() {
    const { data, isLoading } = useGetBorrowQuery(undefined);
    if (isLoading) return <h1>Loading...</h1>;
    console.log(data?.data)
    return (
        <div className="m-5 border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Book Title</TableHead>
                        <TableHead>ISBN</TableHead>
                        <TableHead>Total Quantity Borrowed</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.data?.map((book : BorrowSummary) => {
                            return <TableRow key={book?.book?.isbn}>
                                <TableCell className="font-medium">{book?.book?.title}</TableCell>
                                <TableCell>{book?.book?.isbn}</TableCell>
                                <TableCell>{book?.totalQuantity}</TableCell>
                            </TableRow>
                        })
                    }

                </TableBody>
            </Table>

        </div>
    );
}

export default Borrow_Summary;