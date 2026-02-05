export default function Button({ children, variant = "primary", ...props }) {
    const base = {
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #2a3a61",
        cursor: "pointer",
        background: variant === "primary" ? "#2b6cff" : variant === "danger" ? "#ff3b3b" : "transparent",
        color: "#e8eefc",
    };

    return (
        <button style={base} {...props}>
            {children}
        </button>
    );
}