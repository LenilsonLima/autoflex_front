export default function Table({ columns, rows, keyField = "id" }) {
    return (
        <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        {columns.map((c) => (
                            <th key={c.key} style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #1f2a44", fontSize: 12, opacity: .9 }}>
                                {c.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r) => (
                        <tr key={r[keyField]} style={{ borderBottom: "1px solid #1f2a44" }}>
                            {columns.map((c) => (
                                <td key={c.key} style={{ padding: 10, verticalAlign: "top" }}>
                                    {c.render ? c.render(r) : r[c.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} style={{ padding: 12, opacity: .8 }}>
                                No data
                            </td>
                        </tr>
                    ) : null}
                </tbody>
            </table>
        </div>
    );
}