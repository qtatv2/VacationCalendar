import { useEffect, useState } from "react";

interface User {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    roles: string[]
}

export default function Home() {
    const [user, setUser] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/users/show")
            .then((response) => {
                if (!response.ok) throw new Error("Błąd: " + response.status);
                return response.json();
            })
            .then((user) => {
                setUser(user);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    return (
        <>
            {user.map((element) => (
                <div key={element.id}>
                    <div>
                        <p>Id {element.id}</p>
                        <p>Email {element.email}</p>
                        <p>Roles {element.roles}</p>
                    </div>
                    <br></br>
                </div>
            ))}
        </>
    );
}
