import "./database.css";
import { getData, deleteUser } from "../../firebase";
import { useCallback, useEffect, useState } from "react";

export default function Database({ user }: any) {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        getData({ user }).then((result) => {
            setData(result);
        });
    }, [user]);

    const handleDelete = useCallback(
        async (uid: string) => {
        if (!window.confirm(`Delete user ${uid} permanently?`)) return;

        try {
            await deleteUser(user, uid);

            setData((prev: any) => {
                if (!prev) return prev;
                const copy = { ...prev };
                delete copy[uid];
                return copy;
            });
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete user");
        }
        },
        [user]
    );

    return (
        <div className="database">
            <h2>Database</h2>

            {user.role === "admin" && data && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(data).map(([uid, userData]: any) => (
                                <tr key={uid}>
                                    <td>{userData.email}</td>
                                    <td>{userData.firstName || "-"}</td>
                                    <td>{userData.lastName || "-"}</td>
                                    <td>
                                        <span className={`role role-${userData.role}`}>
                                            {userData.role}
                                        </span>
                                    </td>
                                    <td className="actionButtons">
                                        <button className="edit-btn">Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(uid)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
