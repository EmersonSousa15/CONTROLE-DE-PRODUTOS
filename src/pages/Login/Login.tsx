import { useState } from "react";
import httpClient from "../../services/httpClient";
import axios from "axios";

interface User {
    email?: string;
    password?: string;
}

export const Login =  () => {
    const [user, setUser] = useState<User | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await httpClient.post('http://localhost:5000/login', user)

            console.log(await response);
            
        } catch (error) {
            if(axios.isAxiosError(error)){

                if(error.response?.status === 404) {
                    alert(error.response.data.message)

                }else if(error.response?.status === 401) {
                    alert(error.response.data.message)

                }else{
                    alert(error.response?.data.message)

                }
            }
            
        }
        
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const {value} = e.target
        setUser(prev => {
            return {...prev, [type]: value}
        })

        console.log(user);
        
    }


    return (
        <main className="flex justify-center items-center h-screen w-screen bg-green-500">
            <section className="bg-white h-1/2 w-96 rounded flex flex-col justify-center items-center min-w-56">
                <h1 className="text-2xl mt-10">Entrar</h1>
                <form onSubmit={(e) => handleSubmit(e)} className="flex h-full w-4/5 justify-center items-center flex-col gap-5">
                    <div className="w-full flex flex-col">
                        <label className="block">E-mail:</label>
                        <input className="w-full m-auto p-1 bg-transparent border-b border-black" type="email" placeholder="example@gmail.com" value={user?.email} onChange={(e) => handleChange(e, "email")} />
                    </div>
                    <div className="w-full flex flex-col">
                        <label className="block">Senha:</label>
                        <input className="w-full p-1 bg-transparent border-b border-black" type="password" placeholder="123456" value={user?.password} onChange={(e) => handleChange(e, "password")}/>
                    </div>
                    <button className="mt-5 bg-green-500 text-white font-bold w-44 mx-auto h-10 transition duration-1000 hover:shadow-xl hover:shadow-black-400" type="submit">Entrar</button>
                </form>
            </section>
        </main>
    )
}