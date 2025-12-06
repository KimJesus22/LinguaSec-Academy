import React, { useMemo } from 'react';
import { roadmapData } from '../data/roadmapData';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { CheckCircle, Lock, Cpu, Radio, Terminal, Shield, Play } from 'lucide-react';

// Helper for levels
const getLevelValue = (levelString) => {
    if (!levelString) return 0;
    if (levelString.includes('A1') || levelString.includes('N5') || levelString.includes('L1')) return 1;
    if (levelString.includes('A2') || levelString.includes('N4') || levelString.includes('L2')) return 2;
    if (levelString.includes('B1') || levelString.includes('N3') || levelString.includes('L3')) return 3;
    if (levelString.includes('B2') || levelString.includes('N2') || levelString.includes('L4')) return 4;
    if (levelString.includes('C1') || levelString.includes('N1') || levelString.includes('L5')) return 5;
    if (levelString.includes('C2') || levelString.includes('L6')) return 6;
    return 0;
};

const MissionIcon = ({ type, status }) => {
    let icon;
    switch (type) {
        case 'Terminal': icon = <Terminal size={24} />; break;
        case 'Audio': icon = <Radio size={24} />; break;
        case 'Scenario': icon = <Cpu size={24} />; break;
        default: icon = <Shield size={24} />;
    }

    if (status === 'LOCKED') return <div className="text-gray-600"><Lock size={20} /></div>;
    if (status === 'COMPLETED') return <div className="text-black"><CheckCircle size={20} /></div>;
    return <div className="text-black animate-pulse"><Play size={20} /></div>; // Active
};

const MissionDashboard = ({ userLevel, onSelectMission, onExit }) => {
    const { playClick, playHover, playError } = useSoundEffects();
    const userLevelValue = useMemo(() => getLevelValue(userLevel), [userLevel]);

    const handleMissionClick = (mission, status) => {
        if (status === 'LOCKED') {
            playError();
            return;
        }
        playClick();
        onSelectMission(mission);
    };

    return (
        <div className="w-full max-w-5xl animate-fade-in-up p-8 flex flex-col items-center h-[90vh] overflow-y-auto custom-scrollbar">
            <header className="w-full flex justify-between items-center mb-12 border-b border-gray-700 pb-6 bg-cyber-black sticky top-0 z-50 py-4 opacity-95">
                <div>
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                        SKILL TREE // EVOLUTION
                    </h2>
                    <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mt-2">
                        Authorization Level: <span className="text-neon-cyan font-bold">{userLevel || 'UNKNOWN'}</span>
                    </p>
                </div>
                <button
                    onClick={() => { playClick(); onExit(); }}
                    className="px-6 py-2 border border-gray-600 rounded-full text-gray-400 hover:text-white hover:border-red-500 hover:text-red-500 transition-all uppercase text-xs tracking-widest"
                >
                    [ ESC ] Abort
                </button>
            </header>

            <div className="relative w-full max-w-3xl pl-8 md:pl-0">
                {/* Vertical Timeline Line */}
                <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-800 -ml-0.5 md:transform md:-translate-x-1/2"></div>

                {roadmapData.map((mission, index) => {
                    const missionLevelValue = getLevelValue(mission.level);
                    let status = 'LOCKED';
                    if (userLevelValue >= missionLevelValue) {
                        if (userLevelValue > missionLevelValue || (userLevelValue === missionLevelValue && index < 2)) {
                            // Logic tweak: If strictly higher level -> Completed.
                            // If exact same level -> Active. (Simplified logic for demo)
                            status = userLevelValue > missionLevelValue ? 'COMPLETED' : 'ACTIVE';
                        } else {
                            status = 'ACTIVE';
                        }
                    }

                    // Force first unlocked to be Active if userlevel matches, creating a 'frontier'
                    // For demo simplicity: User B1 means A1, A2 Completed. B1 Active.

                    const isLeft = index % 2 === 0;

                    return (
                        <div key={mission.id} className={`group relative mb-12 flex flex-col md:flex-row items-center w-full ${isLeft ? 'md:flex-row-reverse' : ''}`}>

                            {/* Content Card */}
                            <div className={`w-full md:w-[45%] mb-4 md:mb-0 ${isLeft ? 'md:pl-8' : 'md:pr-8'}`}>
                                <div
                                    onClick={() => handleMissionClick(mission, status)}
                                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer overflow-hidden
                                        ${status === 'COMPLETED'
                                            ? 'bg-green-900/10 border-green-800 hover:bg-green-900/20'
                                            : status === 'ACTIVE'
                                                ? 'bg-gradient-to-r from-yellow-900/20 to-black border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.2)] hover:scale-105'
                                                : 'bg-gray-900/80 border-gray-800 opacity-60 grayscale'
                                        }
                                    `}
                                    onMouseEnter={playHover}
                                >
                                    {/* Decoration Lines */}
                                    <div className="absolute top-0 right-0 p-2 opacity-20">
                                        {mission.type === 'Terminal' ? <Terminal size={60} /> : mission.type === 'Audio' ? <Radio size={60} /> : <Cpu size={60} />}
                                    </div>

                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded
                                            ${status === 'COMPLETED' ? 'text-green-500 bg-green-950' :
                                                status === 'ACTIVE' ? 'text-yellow-500 bg-yellow-950 animate-pulse' : 'text-gray-500 bg-gray-900'}
                                        `}>
                                            {status}
                                        </span>
                                        <span className="text-xs font-mono text-gray-500">{mission.level}</span>
                                    </div>

                                    <h3 className={`text-lg font-bold mb-1 ${status === 'LOCKED' ? 'text-gray-600' : 'text-white'}`}>
                                        {mission.title}
                                    </h3>

                                    <p className="text-xs text-gray-400 font-mono">
                                        {status === 'LOCKED' ? 'Encrypted Data. Level up access required.' : mission.description}
                                    </p>
                                </div>
                            </div>

                            {/* Center Node */}
                            <div className="absolute left-[27px] md:left-1/2 w-14 h-14 -ml-7 md:transform md:-translate-x-1/2 flex items-center justify-center z-10 bg-cyber-black rounded-full border-4 border-gray-800 transition-all duration-500 group-hover:border-white">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                                    ${status === 'COMPLETED' ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]' :
                                        status === 'ACTIVE' ? 'bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.8)] animate-pulse' : 'bg-gray-800'}
                                `}>
                                    <MissionIcon type={mission.type} status={status} />
                                </div>
                                {/* Connecting line to card */}
                                <div className={`hidden md:block absolute top-1/2 ${isLeft ? 'right-full mr-2' : 'left-full ml-2'} w-8 h-1 
                                    ${status === 'LOCKED' ? 'bg-gray-800' : status === 'COMPLETED' ? 'bg-green-600' : 'bg-yellow-500'}
                                `}></div>
                            </div>

                            {/* Spacer */}
                            <div className="w-full md:w-[45%]"></div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 text-center pb-8 opacity-50 text-xs font-mono text-gray-500">
                // END OF LINE // MORE MODULES UPLOADING...
            </div>
        </div>
    );
};

export default MissionDashboard;
