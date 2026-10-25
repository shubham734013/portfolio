import React, { useState, useEffect } from 'react';
import { Activity, AlertCircle, CheckCircle2, Hospital, MapPin, Navigation, Radio, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HospitalNode {
  id: string;
  name: string;
  area: string;
  distance: string;
  icuBeds: number;
  status: 'Ready' | 'Coordinating' | 'En Route';
  x: number;
  y: number;
}

const JAIPUR_HOSPITALS: HospitalNode[] = [
  {
    id: 'sms',
    name: 'SMS Medical College & Hospital',
    area: 'JLN Marg, Jaipur',
    distance: '2.1 km',
    icuBeds: 14,
    status: 'Ready',
    x: 48,
    y: 35,
  },
  {
    id: 'narayana',
    name: 'Narayana Multispeciality',
    area: 'Sector 28, Kumbha Marg',
    distance: '3.4 km',
    icuBeds: 9,
    status: 'Ready',
    x: 75,
    y: 65,
  },
  {
    id: 'fortis',
    name: 'Fortis Escorts Hospital',
    area: 'Jawahar Lal Nehru Marg',
    distance: '4.8 km',
    icuBeds: 6,
    status: 'Ready',
    x: 25,
    y: 55,
  },
];

export const ResQPreviewCanvas: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<'cardiac' | 'accident' | 'respiratory'>('cardiac');
  const [activeHospitalId, setActiveHospitalId] = useState<string>('sms');
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  useEffect(() => {
    let interval: any;
    if (isDispatched) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      setSecondsElapsed(0);
    }
    return () => clearInterval(interval);
  }, [isDispatched]);

  const handleSimulateDispatch = () => {
    setIsDispatched(true);
    setSecondsElapsed(1);
  };

  const formatElapsed = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `+00:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const activeHospital = JAIPUR_HOSPITALS.find((h) => h.id === activeHospitalId) || JAIPUR_HOSPITALS[0];

  return (
    <div className="bg-[#141413] text-[#F6F3EC] p-4 sm:p-5 font-mono text-xs select-none border border-[#141413] flex flex-col justify-between h-full min-h-[380px] relative overflow-hidden">
      {/* Top Telemetry Header */}
      <div className="border-b border-[#2C2B28] pb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#D84A27] inline-block animate-pulse"></span>
          <span className="text-[#F6F3EC] font-semibold tracking-wider">RESQ // TELEMETRY & TRIAGE GRID</span>
        </div>
        <div className="flex items-center gap-3 text-[#8A867E]">
          <span>COORD: 26.9124° N, 75.7873° E</span>
          <span className="hidden sm:inline">·</span>
          <span className="text-[#3F5E45] font-semibold bg-[#3F5E45]/20 px-1.5 py-0.5 border border-[#3F5E45]/40 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3F5E45] animate-ping"></span>
            NODE ACTIVE
          </span>
        </div>
      </div>

      {/* Main Grid Area: 2 Columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 items-stretch">
        {/* Left: Vector Coordinate Schematic */}
        <div className="md:col-span-7 bg-[#1C1B19] border border-[#2C2B28] p-3 flex flex-col justify-between relative min-h-[190px] overflow-hidden">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-20">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="border-r border-b border-[#8A867E]"></div>
            ))}
          </div>

          {/* Animated Radar Sweep Hairline */}
          <motion.div
            animate={{ left: ['-10%', '110%'] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 bottom-0 w-[1px] bg-[#D84A27]/40 pointer-events-none shadow-[0_0_8px_#D84A27]"
          />

          <div className="relative z-10 flex items-center justify-between text-[11px] text-[#8A867E]">
            <span className="flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-[#D84A27]" />
              JAIPUR SECTOR MAP (LIVE ROUTING)
            </span>
            <span className="text-[#D84A27] font-semibold">
              {isDispatched ? `EN ROUTE (${formatElapsed(secondsElapsed)})` : 'STANDBY MODE'}
            </span>
          </div>

          {/* Map Nodes */}
          <div className="relative h-32 my-2 z-10">
            {/* Center Incident Origin */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
              style={{ left: '50%', top: '50%' }}
            >
              <div className="w-3 h-3 bg-[#D84A27] animate-ping absolute opacity-50"></div>
              <div className="w-3.5 h-3.5 bg-[#D84A27] border border-[#F6F3EC] flex items-center justify-center">
                <ShieldAlert className="w-2.5 h-2.5 text-[#F6F3EC]" />
              </div>
              <span className="text-[9px] bg-[#141413] px-1 border border-[#D84A27] mt-1 text-[#D84A27] whitespace-nowrap">
                ORIGIN (SOS PIN)
              </span>
            </div>

            {/* Hospital Nodes with Spring Micro-Interactions */}
            {JAIPUR_HOSPITALS.map((hospital) => {
              const isSelected = hospital.id === activeHospitalId;
              return (
                <motion.button
                  key={hospital.id}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setActiveHospitalId(hospital.id)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-left transition-all ${
                    isSelected ? 'z-20' : 'opacity-80 hover:opacity-100 z-10'
                  }`}
                  style={{ left: `${hospital.x}%`, top: `${hospital.y}%` }}
                  title={`${hospital.name} (${hospital.distance})`}
                  type="button"
                >
                  <div
                    className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#3F5E45] border-[#F6F3EC] text-[#F6F3EC] shadow-sm'
                        : 'bg-[#2C2B28] border-[#8A867E] text-[#8A867E]'
                    }`}
                  >
                    <Hospital className="w-2.5 h-2.5" />
                  </div>
                  <span
                    className={`text-[8px] px-1 mt-0.5 border whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'bg-[#141413] text-[#F6F3EC] border-[#3F5E45] font-semibold'
                        : 'bg-[#1C1B19] text-[#8A867E] border-[#2C2B28]'
                    }`}
                  >
                    {hospital.name.split(' ')[0]} ({hospital.distance})
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="relative z-10 text-[10px] text-[#8A867E] flex justify-between border-t border-[#2C2B28] pt-1.5">
            <span>SELECTED: {activeHospital.name}</span>
            <span className="text-[#3F5E45] font-semibold">{activeHospital.icuBeds} BEDS VERIFIED</span>
          </div>
        </div>

        {/* Right: Incident Triage Selector & Controller */}
        <div className="md:col-span-5 bg-[#1C1B19] border border-[#2C2B28] p-3 flex flex-col justify-between gap-2.5">
          <div>
            <div className="text-[10px] text-[#8A867E] uppercase tracking-wider mb-2 flex justify-between">
              <span>Select Triage Workflow</span>
              <span className="text-[#D84A27] text-[9px]">INTERACTIVE</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'cardiac', label: 'Critical Cardiac / Trauma', priority: 'Level 1' },
                { id: 'accident', label: 'Accident Rapid Dispatch', priority: 'Level 1' },
                { id: 'respiratory', label: 'Acute Respiratory Support', priority: 'Level 2' },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedIncident(item.id as any);
                    setIsDispatched(false);
                  }}
                  className={`px-2 py-1.5 text-left border text-[11px] transition-colors flex justify-between items-center ${
                    selectedIncident === item.id
                      ? 'border-[#D84A27] bg-[#D84A27]/10 text-[#F6F3EC]'
                      : 'border-[#2C2B28] hover:border-[#8A867E] text-[#8A867E]'
                  }`}
                >
                  <span className="truncate pr-1">{item.label}</span>
                  <span className="text-[9px] text-[#D84A27] shrink-0 font-bold">{item.priority}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#2C2B28] pt-2">
            <div className="flex justify-between items-center text-[10px] text-[#8A867E] mb-1.5">
              <span>FACILITY LINK</span>
              <span className="text-[#F6F3EC]">{activeHospital.name.split(' ')[0]}</span>
            </div>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={handleSimulateDispatch}
              className={`w-full py-2 px-3 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border ${
                isDispatched
                  ? 'bg-[#3F5E45] text-[#F6F3EC] border-[#3F5E45]'
                  : 'bg-[#D84A27] hover:bg-[#B83B1C] text-[#F6F3EC] border-[#D84A27]'
              }`}
            >
              {isDispatched ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  DISPATCH CONFIRMED ({formatElapsed(secondsElapsed)})
                </>
              ) : (
                <>
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  TRIGGER EMERGENCY DISPATCH
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Telemetry Bar */}
      <div className="border-t border-[#2C2B28] pt-2.5 flex flex-wrap items-center justify-between text-[11px] text-[#8A867E] gap-2">
        <div className="flex items-center gap-3">
          <span>STACK: React · Node · MongoDB · REST</span>
          <span className="hidden sm:inline">·</span>
          <span>ROLE: ResQ System Lead</span>
        </div>
        <div className="text-[#F6F3EC]">
          {isDispatched ? (
            <span className="text-[#3F5E45] flex items-center gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 bg-[#3F5E45] rounded-full inline-block animate-ping"></span>
              DISPATCH ACTIVE · PACKET TRANSMITTED
            </span>
          ) : (
            <span>TAP ANY HOSPITAL PIN OR TRIAGE OPTION TO TEST</span>
          )}
        </div>
      </div>
    </div>
  );
};
