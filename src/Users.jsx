import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
    const lodedUsers = useLoaderData()

    const [users, setUsers] = useState(lodedUsers)
    const handleDelete = _id => {
        console.log(_id);
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('Deleted user success')
                    const remaining = users.filter(user => user._id !== _id)
                    setUsers(remaining)
                }

            })

    }
    return (
        <div>
            <p>{users.length}</p>
            {
                users.map(user => <p key={user._id}>{user?.name}: {user?.email}
                    <Link to={`/update/${user._id}`}>
                        <button>Update</button>
                    </Link>
                    <button onClick={() => handleDelete(user._id)}>X</button></p>)
            }

        </div>
    );
};

export default Users;