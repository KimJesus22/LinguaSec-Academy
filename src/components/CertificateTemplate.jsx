import React, { forwardRef } from 'react';

const CertificateTemplate = forwardRef(({ candidateName, language, level, date, signature }, ref) => {
    return (
        <div ref={ref} className="bg-white text-black p-10 w-[800px] h-[600px] relative overflow-hidden font-opensans flex flex-col items-center justify-between border-8 border-gray-900 shadow-2xl">

            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            ></div>

            {/* Header Section */}
            <div className="w-full flex flex-col items-center mt-8 z-10">
                <h1 className="text-4xl font-bold tracking-[0.2em] mb-2 uppercase border-b-4 border-black pb-2">
                    LinguaSec Academy
                </h1>
                <p className="text-sm tracking-widest uppercase text-gray-600">Secure Language Certification Authority</p>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center w-full z-10 flex-1 justify-center gap-6">
                <p className="text-lg italic text-gray-500">Este documento certifica que el agente:</p>

                <h2 className="text-5xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 px-8 min-w-[50%] text-center font-mono">
                    {candidateName}
                </h2>

                <p className="text-lg italic text-gray-500 mt-4">Ha completado satisfactoriamente la evaluación de competencia en:</p>

                <div className="flex items-center gap-4">
                    <h3 className="text-4xl font-bold text-gray-800 uppercase tracking-wider">{language}</h3>
                </div>

                <div className="bg-black text-white px-8 py-3 rounded mt-4">
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Nivel MCER Obtenido</p>
                    <div className="text-4xl font-mono font-bold text-neon-green">{level}</div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="w-full flex justify-between items-end mb-8 px-12 z-10">
                <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Fecha de Emisión</p>
                    <p className="text-lg font-bold border-t border-gray-400 pt-1 w-40">{date}</p>
                </div>

                <div className="flex flex-col items-center">
                    {/* QR Code Placeholder */}
                    <div className="w-16 h-16 bg-white border-2 border-black p-1 mb-2 flex items-center justify-center">
                        <div className="w-full h-full bg-gray-900 opacity-50"></div>
                    </div>
                    <p className="text-[0.6rem] text-gray-400 uppercase tracking-widest">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>

                <div className="text-center relative">
                    {/* Digital Signature */}
                    <div className="font-cursive text-3xl text-blue-900 absolute -top-10 left-0 right-0 transform -rotate-6 opacity-80" style={{ fontFamily: 'cursive' }}>
                        {signature}
                    </div>
                    <p className="text-sm text-gray-500 mb-1 mt-6">Director de Operaciones</p>
                    <p className="text-lg font-bold border-t border-gray-400 pt-1 w-48">Firma Autorizada</p>
                </div>
            </div>

            {/* Corner Decor */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-black"></div>
            <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-black"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-black"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-black"></div>
        </div>
    );
});

export default CertificateTemplate;
