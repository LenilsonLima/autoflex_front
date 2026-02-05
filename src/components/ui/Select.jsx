export default function Select({ label, children, ...props }) {
    return (
        <div className="col" style={{ gap: 6 }}>
            {label ? <label>{label}</label> : null}
            <select {...props}>{children}</select>
        </div>
    );
}