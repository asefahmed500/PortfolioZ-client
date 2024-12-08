import { toast } from 'react-hot-toast';

const useHotToast = () => {
    const showToast = (message, options = {}) => {
        const { type = "default", onConfirm, onCancel } = options;

        if (type === "confirmation") {
            toast(
                (t) => (
                    <div>
                        <p>{message}</p>
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "8px" }}>
                            <button
                                onClick={() => {
                                    toast.dismiss(t.id); // Dismiss the toast
                                    onConfirm && onConfirm(); // Execute confirm action if provided
                                }}
                                style={{
                                    backgroundColor: "#d33",
                                    color: "white",
                                    padding: "5px 10px",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => {
                                    toast.dismiss(t.id); // Dismiss the toast
                                    onCancel && onCancel(); // Execute cancel action if provided
                                }}
                                style={{
                                    backgroundColor: "#3085d6",
                                    color: "white",
                                    padding: "5px 10px",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                            >
                                No
                            </button>
                        </div>
                    </div>
                ),
                {
                    duration: Infinity, // Keep it open until user responds
                    position: "top-center",
                    style: { padding: "16px", color: "white", background: "#333" },
                }
            );
        } else if (type === "success") {
            toast.success(message, {
                position: "top-center",
                style: { padding: "16px", color: "#155724", background: "#d4edda" }
            });
        } else if (type === "error") {
            toast.error(message, {
                position: "top-center",
                style: { padding: "16px", color: "#721c24", background: "#f8d7da" }
            });
        } else {
            toast(message, {
                position: "top-center",
                style: { padding: "16px", color: "white", background: "#333" }
            });
        }
    };

    return { showToast };
};

export default useHotToast;
