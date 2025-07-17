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
} from "@/components/ui/table";
import type { Book } from "@/Typescript/typescript";
import Bookcard from "@/components/module/Bookcard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate, useSearchParams } from "react-router";

function Allbook() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isError } = useGetBookQuery({ limit, page });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching books.</p>;

  const totalPages = Math.ceil(data.total / limit);
  console.log(totalPages)

  const goToPage = (newPage: number) => {
    setSearchParams({ limit: String(limit), page: String(newPage) });
  };

  return (
    <div className="m-5 border">
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
            <Bookcard key={book._id} book={book} />
          ))}
        </TableBody>
        <TableFooter className="mt-5">
          <TableRow>
            <TableCell colSpan={7}>Total Books: {data?.total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center my-5">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) goToPage(page - 1);
                }}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, idx) => {
              const p = idx + 1;
              return (
                <PaginationItem key={p}>
                  <PaginationLink
                    href=""
                    isActive={p === page}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(p);
                    }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) goToPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default Allbook;
