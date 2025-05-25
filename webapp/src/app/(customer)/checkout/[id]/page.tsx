'use server'

export default async function CheckOut({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    return (
        <div className="h-screen w-full flex flex-col place-content-center items-center">
            <h1>Il tuo id ordine: <span className="font-bold font-mono">{id}</span></h1>
        </div>
    )
}