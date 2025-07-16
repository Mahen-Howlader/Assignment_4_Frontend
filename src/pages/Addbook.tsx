import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBookMutation } from "@/redux/features/api/bookApi";
import { Genre } from "@/Typescript/typescript";
import { toast } from 'sonner';
import { useNavigate } from "react-router";

export const genreEnumValues = Object.values(Genre) as [string, ...string[]];
// ✅ Zod Validation Schema
const bookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.enum(genreEnumValues, "Genre is required"),
    isbn: z.string().min(1, "ISBN is required"),
    description: z.string().optional(),
    copies: z.coerce.number().min(1, "Copies must be at least 1"),
});



type FormData = z.infer<typeof bookSchema>;

function AddBook() {
    const navigator = useNavigate();
    const form = useForm<FormData>({
        resolver: zodResolver(bookSchema) as any,
        defaultValues: {
            title: "",
            author: "",
            genre: "",
            isbn: "",
            description: "",
            copies: 1,
        },
    });
    const [createData, { isLoading }] = useCreateBookMutation();

    const onSubmit = async (data: FormData) => {
        try {
            const allData = { ...data, available: true };
            const response = await createData(allData).unwrap();
            toast.success(response?.message || "✅ Book added successfully!");
            form.reset();
            navigator("/all-books")
        } catch (error: any) {
            toast.error(`Failed to add book: ${error?.data?.message || "Unknown error"}`);
        }
    };

    return (
        <div className="w-[90%] lg:w-6/12 mx-auto">
            <h1 className="font-bold text-4xl text-center my-4">Add Book</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Book Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input placeholder="Author Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Genre</FormLabel>
                                <FormControl className="border border-gray-300 rounded-lg p-2">
                                    <select {...field}>
                                        <option value="">Select Genre</option>
                                        {genreEnumValues.map((genre) => (
                                            <option key={genre} value={genre}>
                                                {genre.replace("_", " ")}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isbn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ISBN</FormLabel>
                                <FormControl>
                                    <Input placeholder="ISBN Number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Short description..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="copies"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Copies</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Number of copies" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Adding..." : "Add Book"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default AddBook;
