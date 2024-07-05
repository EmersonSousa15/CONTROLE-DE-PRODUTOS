export const Login = () => {
    return (
        <main className="flex justify-center items-center h-screen bg-green-500">
            <section className="bg-white h-1/2 w-1/3 rounded flex flex-col justify-center items-center">
                <h1 className="text-2xl mt-10">Entrar</h1>
                <form className="flex h-full justify-center flex-col gap-5">
                    <div>
                        <label className="block">E-mail:</label>
                        <input className="w-72 p-1 bg-transparent border-b border-black " type="email" placeholder="example@gmail.com" />
                    </div>
                    <div>
                        <label className="block">Senha:</label>
                        <input className="w-72 p-1 bg-transparent border-b border-black" type="password" placeholder="123456" />
                    </div>
                    <button className="mt-5 bg-green-500 text-white font-bold w-44 mx-auto h-10 transition duration-1000 hover:shadow-xl hover:shadow-black-400" type="submit">Entrar</button>
                </form>
            </section>
        </main>
    )
}