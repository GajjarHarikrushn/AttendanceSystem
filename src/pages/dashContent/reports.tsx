import { useState, useEffect } from "react";
import { getData } from "../../firebase"

export default function Reports({ user }: any) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [data, setData] = useState({});
    const [select, setSelect] = useState("Select All")

    const toggleSelect = (uid: string) => {
        setSelectedIds(prev => 
        prev.includes(uid) 
            ? prev.filter(id => id !== uid)
            : [...prev, uid]
        );
    };

    useEffect(() => {
        getData({ user }).then((result) => 
            setData(result)
        )
    }, [user])

    function submitReport() {}
    
    function selectAll() {
        if(select === "Select All") {
            const ids = Object.entries(data)
                .filter(([uid]) => uid !== user.uid)
                .map(([uid]) => uid);

            setSelectedIds(ids);
            setSelect("Deselect All")
        } else {
            setSelectedIds([]);
            setSelect("Select All")
        }
    };

  return (
        <div className="dataReport-container">
            <h2>Reports</h2>
            {user.role === "admin" && data && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(data).map(([uid, userData]: any) => (
                                (uid !== user.uid) && (
                                <tr key={uid}>
                                <td>
                                    <input
                                    type="checkbox"
                                    checked={selectedIds.includes(uid)}
                                    onChange={() => toggleSelect(uid)}
                                    />
                                </td>
                                <td>{userData.email}</td>
                                <td>{userData.firstName || "-"}</td>
                                <td>{userData.lastName || "-"}</td>
                                </tr>
                            )))}
                        </tbody>
                        <thead>
                            <tr>
                                <th>
                                    <button onClick={selectAll}>{select}</button>
                                </th>
                                <th></th>
                                <th></th>
                                <th>
                                    <button onClick={submitReport}>Complete</button>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            )}
        </div>
  );
}