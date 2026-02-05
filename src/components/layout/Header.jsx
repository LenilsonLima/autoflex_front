export default function Header() {
    return (
        <div style={{ padding: 16, borderBottom: "1px solid #1f2a44", background: "#0b0f19" }}>
            <div className="row" style={{ alignItems: "center" }}>
                <div className="h1" style={{ margin: 0 }}>Autoflex – Stock Control</div>
                <div className="spacer" />
                <span className="badge">API: onrender</span>
            </div>
            <div className="muted">Products • Raw Materials • Associations • Production Suggestion</div>
        </div>
    );
}