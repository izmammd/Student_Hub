import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Subject() {

    const [sub, setSub] = useState("");
    const [allSub, setAllsub] = useState([]);

    const [edit, setEdit] = useState(null);

    const navigate = useNavigate();

    const fetchAllSub = async () => {
        try {
            let res = await axios.get("http://localhost:3000/api/std/subject/allsubject", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setAllsub(res.data.allSubjects || []);
            // console.log(allSub);

        }
        catch (err) {
            toast.error(err.response.data.message);
            // setAllsub([]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post("http://localhost:3000/api/std/subject/addsubject", { subject: sub }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            toast.success(res.data.message);
            setSub("");
            fetchAllSub();

        }
        catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleRemove = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/std/subject/remove/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-type": "application/json"
                }
            })

            toast.success(res.data.message);
            fetchAllSub();
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    const handleEdit = (i) => {
        setEdit(allSub[i]._id);
        setSub(allSub[i].subject);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch('http://localhost:3000/api/std/subject/updatesubject', { subject: sub, editId: edit }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            });
            toast.success(res.data.message);
            setEdit(null);
            setSub("");
            fetchAllSub();
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }
        fetchAllSub()
    }, [])

    console.log(allSub);



    return (<>

        <h1>Subject</h1>

        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <form onSubmit={edit ? handleUpdate : handleSubmit}>
                        <input type="text" value={sub} onChange={(e) => setSub(e.target.value)} placeholder="Enter Subject name" />
                        <input type="submit" value={edit ? "Update" : "Add"} />
                    </form>
                </div>
            </div>
        </div>

        <div>
            {
                allSub.map((s, i) =>
                    <li key={s._id}>{s.subject} <button onClick={() => handleEdit(i)}> Edit</button>  <button onClick={() => handleRemove(s._id)}> remove</button></li>
                )}
        </div>

    </>)
}