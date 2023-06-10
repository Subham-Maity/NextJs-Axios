import Image from 'next/image'
import {Inter} from 'next/font/google'
import {AxiosGet} from "@/app/components/AxiosGet";
import {AxiosPost} from "@/app/components/AxiosPost";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (

        <div>
            <div className="text-center text-cyan-500 font-bold text-7xl mb-5"> Axios Get</div>
            <AxiosGet/>

            <div className="text-center text-cyan-500 font-bold text-7xl mb-5"> Axios Post</div>
            <AxiosPost/>

        </div>
    )
}
