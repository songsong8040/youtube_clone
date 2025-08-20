import React from 'react';

export default function Loading() {
    return (
        <div
            className="fixed top-0 left-0 w-screen h-[100svh] oveflow-hidden z-40 bg-white/30 backdrop-blur-md flex items-center justify-center">
            <span className="loader"></span>
        </div>
    );
}