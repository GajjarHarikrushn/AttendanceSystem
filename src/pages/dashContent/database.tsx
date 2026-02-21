import "./database.css";
import { getData, deleteUserData, editUserData } from "../../firebase";
import { useCallback, useEffect, useState } from "react";

export default function Database({ user }: any) {
    const [data, setData] = useState<any>(null);
    const [editingUser, setEditingUser] = useState<string>("");

    useEffect(() => {
        getData({ user }).then((result) => {
            setData(result);
        });
    }, [user]);

    const handleDelete = useCallback(
        async (uid: string) => {
            if (!window.confirm(`Delete user ${uid} permanently?`)) return;

            try {
                await deleteUserData(user, uid);

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

    const editUser = useCallback((e: any, uid: string) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updates: any = {};
        formData.forEach((value, key) => {
            if (value) updates[key] = value;
        });
        editUserData(user, uid, updates).then(() => {
            setData((prev: any) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    [uid]: {
                        ...prev[uid],
                        ...updates,
                    },
                };
            });
        }).catch((err) => {
            console.error("Edit failed:", err);
            alert("Failed to edit user");
        });
    }, []);

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
                                (user.uid !== uid) && (
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
                                            <button className="edit-btn" onClick={() => setEditingUser(uid)}>Edit</button>
                                            <button className="delete-btn" onClick={() => handleDelete(uid)}>Delete</button>
                                        </td>
                                    </tr>)
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {editingUser && (
                <div className="overlay" onClick={() => setEditingUser("")}>
                    <form className="edit-form" onSubmit={(e) => editUser(e, editingUser)} onClick={(e) => e.stopPropagation()}>
                        <div className="form-header">
                            <h3>Edit User</h3>
                            <button type="button" onClick={() => setEditingUser("")}>X</button>
                        </div>
                        <div className="form-group">
                            <input name="email" placeholder="Email" />
                            <input name="firstName" placeholder="First Name" />
                            <input name="lastName" placeholder="Last Name" />
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
