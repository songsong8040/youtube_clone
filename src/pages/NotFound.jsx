import React from 'react';
import {Link} from "react-router-dom";
import {useDarkMode} from "../context/useDarkMode.js";
import { TbError404 } from "react-icons/tb";

export default function NotFound() {
    const { isDark } = useDarkMode();

    return (
        <div className={`w-screen h-[100svh] flex items-center justify-center flex-col gap-3 text-center ${isDark ? 'bg-black text-white' : 'text-gray-800'}`}>
            <div className="flex flex-col items-center justify-center">
                <TbError404 className="text-6xl text-red-500"/>
                <h1 className="text-2xl font-bold">존재하지 않는 페이지입니다.</h1>
            </div>
            <p className="pb-4 text-lg opacity-70">입력하신 페이지 주소가 정확한지 다시 한번 확인해 보시기 바랍니다.</p>
            <Link to="/" className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-100">홈으로</Link>
        </div>
    );
}