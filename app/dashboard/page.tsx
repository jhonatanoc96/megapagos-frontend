import { notFound, redirect } from "next/navigation";

export default function Dashboard() {

    const { NEXT_PUBLIC_TOKEN, NEXT_PUBLIC_USER } = process.env;

    if (!NEXT_PUBLIC_TOKEN || !NEXT_PUBLIC_USER) {
        process.env.NEXT_PUBLIC_TOKEN = '';
        process.env.NEXT_PUBLIC_USER = '';
        return redirect('/login');
    }

    notFound();

    return (
        <main>
            <h1>DASHBOARD</h1>
        </main>
    )
}