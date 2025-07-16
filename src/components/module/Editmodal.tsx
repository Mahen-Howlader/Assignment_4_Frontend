// components/EditModal.tsx
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import type { Book } from "@/Typescript/typescript";
import { Textarea } from "../ui/textarea";
import { genreEnumValues } from "@/pages/Addbook";
import { useUpdateBookMutation } from "@/redux/features/api/bookApi";
import { useState } from "react";
import { toast } from "sonner";

type EditModalProps = {
    book: Book;
};

function EditModal({ book }: EditModalProps) {
    const [open, setOpen] = useState(false);
    const [updateBook, { isLoading }] = useUpdateBookMutation();
    const { register, handleSubmit } = useForm<Book>({
        defaultValues: book,
    });
    const onSubmit = async (data: Book) => {
        try {
            const available = data.copies > 0;
            const { _id, ...rest } = data;
            const updatedDataAll = { ...rest, available };
            const dataUpdate = await updateBook({ id: _id, body: updatedDataAll }).unwrap();
            toast.success(dataUpdate.message || "Book updated successfully!");
            setOpen(false);
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update book");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm"><Pencil className="w-4 h-4" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Book</DialogTitle>
                    <DialogDescription>Make changes and save when you're done.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <Input {...register("title")} placeholder="Title" />
                    <Input {...register("author")} placeholder="Author" />
                    <select
                        {...register("genre")}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                    >
                        <option value="">Select Genre</option>
                        {genreEnumValues.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre.replace("_", " ")}
                            </option>
                        ))}
                    </select>

                    <Input {...register("isbn")} placeholder="ISBN" />
                    <Input type="number" {...register("copies")} placeholder="Copies" />
                    <Textarea {...register("description")} placeholder="Description"></Textarea>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Changing..." : "Save Changes"}
                        </Button>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditModal;
