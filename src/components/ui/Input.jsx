export default function Input({ label, ...props }) {
    return (
        <div className="col" style={{ gap: 6 }}>
            {label ? <label>{label}</label> : null}
            <input {...props} />
        </div>
    );
}