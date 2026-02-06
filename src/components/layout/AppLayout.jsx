import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import styles from "./AppLayout.module.scss";

export default function AppLayout() {
    return (
        <div className={styles.grid}>
            <Sidebar />
            <main className={styles.container}>
                <Outlet />
            </main>
        </div>
    );
}