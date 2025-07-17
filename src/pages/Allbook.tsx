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
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useSearchParams } from "react-router";

function Allbook() {
    const [searchParams] = useSearchParams();
    const limit = Number(searchParams.get("limit")) || 10; // fallback 10
    const page = Number(searchParams.get("page")) || 1;
    const { data, isLoading, isError } = useGetBookQuery({ limit, page });
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching books.</p>;
    console.log(limit)
    return (
        <div className=" m-5 border">
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
                <TableFooter className="mt-5">
                    <TableRow>
                        <TableCell colSpan={6}>Total Books {data?.total}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="mt-4 flex justify-center my-5">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>


        </div>
    );
}

export default Allbook;