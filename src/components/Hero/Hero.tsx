import { CiSearch } from "react-icons/ci";

export const Hero = () => {
    return (
        <header className="bg-green-500 w-screen h-96 flex flex-col justify-center items-center">
            <h1 className="text-3xl mb-10 ">Comercial Filomeno</h1>
            <div className="flex items-center">
                <label htmlFor="search">
                    <CiSearch size={30} id="search" className="bg-white p-1 rounded-l-lg h-8" />
                </label>
                <input className="w-96 p-1 rounded-r-lg" type="text" placeholder="Digite o nome do produto" />
            </div>
        </header>
    )
}