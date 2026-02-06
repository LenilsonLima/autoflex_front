export default function Button({ text, variant = "primary", ...props }) {
    const base = {
        width: "100%",
        maxWidth: "250px",
        height: "40px",
        fontSize: "15px",
        padding: "10px",
        borderRadius: 5,
        border: "none",
        cursor: "pointer",
        background: variant === "primary" ? "rgb(43, 168, 91)" : variant === "danger" ? "#ff3b3b" : "transparent",
        color: "#e8eefc",
    };

    return (
        <button style={base} {...props}>
            {text}
        </button>
    );
}