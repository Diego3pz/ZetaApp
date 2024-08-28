import { NextPage } from "next";
import Image from "next/image";
import Upps from "@/public/Bsodwindows10.png"

const E404: NextPage<any> = () => {
    return (

        <div className="flex flex-col justify-center col-span-full mt-10">
            <p className="text-white text-center font-bold text-base sm:text-xl">
                <span>Oops!</span>
                {" "}
                It seems that my free Redis or Shazam Api membership has expired.
            </p>
            <p className="text-gray-400 text-center text-base sm:text-xl">For more information, please contact
                <a href="https://github.com/Diego3pz" className="text-[#4ade80]">{" "}GitHub</a>
                . Thank you.</p>
        </div>

    )
}

export default E404;