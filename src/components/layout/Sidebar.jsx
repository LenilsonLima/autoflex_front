import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "10px 12px",
    borderRadius: 10,
    background: isActive ? "#17233b" : "transparent",
    border: isActive ? "1px solid #2a3a61" : "1px solid transparent",
});

export default function Sidebar() {
    return (
        <aside style={{ padding: 16, borderRight: "1px solid #1f2a44", background: "#0b0f19" }}>
            <div className="h1">Menu</div>
            <div className="col">
                <NavLink to="/products" style={linkStyle}>Products</NavLink>
                <NavLink to="/raw-materials" style={linkStyle}>Raw Materials</NavLink>
                <NavLink to="/product-materials" style={linkStyle}>Product × Raw Material</NavLink>
                <NavLink to="/production" style={linkStyle}>Production Suggestion</NavLink>
            </div>
        </aside>
    );
}