export default function Modal({ open, title, children, onClose, footer }) {
    if (!open) return null;

    return (
        <div
            style={{
                position: "fixed", inset: 0, background: "rgba(0,0,0,.6)",
                display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 50
            }}
            onMouseDown={onClose}
        >
            <div className="card" style={{ width: "min(720px, 96vw)" }} onMouseDown={(e) => e.stopPropagation()}>
                <div className="row" style={{ alignItems: "center" }}>
                    <div className="h1">{title}</div>
                    <div className="spacer" />
                    <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#e8eefc", cursor: "pointer" }}>
                        ✕
                    </button>
                </div>
                <hr />
                {children}
                {footer ? (
                    <>
                        <hr />
                        <div className="row" style={{ justifyContent: "flex-end" }}>{footer}</div>
                    </>
                ) : null}
            </div>
        </div>
    );
}