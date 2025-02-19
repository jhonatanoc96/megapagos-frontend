import { notFound, redirect } from "next/navigation";

export default function Dashboard() {

    const { TOKEN, USER } = process.env;

    if (!TOKEN || !USER) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    notFound();

    return (
        <main>
            <h1>DASHBOARD</h1>
        </main>
    )
}