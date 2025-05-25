'use server'

export default async function CheckOut({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    return (
        <div className="h-screen w-full flex flex-col gap-16 place-content-center items-center px-12">
            <div className="flex flex-col gap-3 items-center">
                <h1 className="font-bold text-xl text-center">Questo è il codice del tuo ordine, <span className="text-red-500">non dimenticarlo:</span></h1>
                <span className="font-bold font-mono text-9xl text-yellow-800">{id}</span>
            </div>

            <div className="flex flex-col gap-2.5 px-5 text-lg font-normal">
                <h1 className="font-semibold text-2xl text-center">Cosa devo fare ora?</h1>
                <div className="flex flex-row gap-1">
                    👉
                    <p>Comunicalo in cassa</p>
                </div>
                <div className="flex flex-row gap-1">
                    🤑
                    <p> Effettua il pagamento</p>
                </div>
                <div className="flex flex-row gap-1">
                    🍕
                    <p>Il tuo ordine sarà servito direttamente al tavolo</p>
                </div>
            </div>

            <p className="absolute bottom-0 py-5 text-gray-600">*Prepara i soldi per velocizzare il processo😉</p>
        </div>
    )
}