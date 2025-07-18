import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import type { IBorrow } from "@/Typescript/typescript";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBorrowMutation } from "@/redux/features/api/bookApi";
import { toast } from "sonner";
import { useState } from "react";

const borrowSchema = z.object({
    quantity: z.coerce.number().min(1, "Borrow min 1 quantity required"),
    dueDate: z.string().min(1, "Due date is required"),
});
type FormData = z.infer<typeof borrowSchema>;
type bookType = {
    bookId: string,
    copies: number
}
function Borrow({ bookId, copies }: bookType) {
    const [open, setOpen] = useState(false);
    const [createBorrow, { isLoading }] = useCreateBorrowMutation();
    const form = useForm<FormData>({
        resolver: zodResolver(borrowSchema) as any,
        defaultValues: {
            quantity: 0, // Initial quantity
            dueDate: "", // Initial due date (can be empty)
        },
    });
    const today = new Date();
    const localDate = today.toLocaleDateString('en-CA');

    async function onSubmit(data: IBorrow) {
        try {
            const book = bookId;
            const fullData = { book, ...data };
            const response = await createBorrow(fullData).unwrap();
            console.log(response)
            toast.success(response.message || "Borrow Book Successfuly");
            setOpen(false);
        } catch (error: any) {
            console.log(error)
            toast.error(`Failed to add borrow: ${error?.data?.message || "Unknown error"}`);
        }
    }

    return (
        <div>
             <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" disabled={copies <= 0}>Borrow Book</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Borrow Book</DialogTitle>
                    </DialogHeader>

                    {/* ✅ FIXED: Wrap in <Form> */}
                    <Form {...form} >
                        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Book Quantity"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Due Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} min={localDate} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="mt-4">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">{isLoading ? "Changing..." : "Save Changes"} </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                    {/* ✅ END */}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Borrow;
