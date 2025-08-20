import React from 'react';
import { BiSolidMessageSquareError } from "react-icons/bi";

export default function Error({error}) {
    const isQuota = error?.isQuota;
    const message =
        typeof error === 'string'
            ? error
            : error?.message || '알 수 없는 에러가 발생했습니다.';

    return (
        <div
            className="fixed top-0 left-0 w-screen h-[100svh] oveflow-hidden z-40 bg-white/30 backdrop-blur-md flex items-center justify-center">
            {isQuota ? (
                <div className="flex flex-col gap-2 items-center justify-center text-center">
                    <BiSolidMessageSquareError className="text-4xl text-red-500"/>
                    <p className="font-semibold text-2xl">API 일일 한도 초과</p>
                    <p className="text-sm opacity-70">
                        오늘 할당량이 모두 소진되었습니다.<br/>
                        한국 시간 <strong>매일 17:00</strong> 이후 다시 이용 가능합니다.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-2 items-center justify-center text-center">
                    <BiSolidMessageSquareError className="text-4xl text-red-500"/>
                    <p className="font-semibold text-2xl">에러 발생</p>
                    <p className="text-sm opacity-70">{message}</p>
                </div>
            )}
        </div>
    );
}