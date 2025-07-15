function Bookcard() {
    return (
        <div>
            <div className="bg-white shadow-md border rounded-2xl p-5 w-full max-w-sm hover:shadow-lg transition duration-300 space-y-4">
                <div>
                    <h2 className="text-xl font-semibold text-primary">Atomic Habits</h2>
                    <p className="text-sm text-muted-foreground">by James Clear</p>
                </div>

                <div className="text-sm space-y-1">
                    <p><span className="font-medium">Genre:</span> Self-help</p>
                    <p><span className="font-medium">ISBN:</span> 978-1-234567-89-7</p>
                    <p><span className="font-medium">Copies:</span> 5</p>
                    <p>
                        <span className="font-medium">Availability:</span>
                        <span className="text-green-600 ml-1">Available</span>
                    </p>
                </div>

                <div className="flex justify-between pt-3">
                    <button className="p-2 rounded-lg border hover:bg-gray-100">
                        ✏️
                    </button>
                    <button className="p-2 rounded-lg border hover:bg-red-100 text-red-600">
                        🗑️
                    </button>
                    <button className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                        📚 Borrow
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Bookcard;