export default async function CheckOut({ 
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    return(
        <div className="h-screen w-full flex flex-col place-content-center items-center">
            <h1 className="font-bold">Il tuo id ordine: {id}</h1>
        </div>
    )
}