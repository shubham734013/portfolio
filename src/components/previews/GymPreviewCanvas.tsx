import React, { useState } from 'react';
import { Check, QrCode, Search, UserCheck, Users, Calendar, AlertTriangle, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MemberRecord {
  id: string;
  name: string;
  code: string;
  phone: string;
  plan: string;
  status: 'Active' | 'Due Renewal' | 'Expired';
  checkInCount: number;
  lastVisit: string;
}

const INITIAL_MEMBERS: MemberRecord[] = [
  {
    id: 'm1',
    name: 'Vikram Sharma',
    code: 'JPR-8821',
    phone: '+91 98290 •••••',
    plan: 'Annual Pro',
    status: 'Active',
    checkInCount: 142,
    lastVisit: 'Today, 06:45 AM',
  },
  {
    id: 'm2',
    name: 'Ananya Sen',
    code: 'JPR-8822',
    phone: '+91 94140 •••••',
    plan: '6-Month Strength',
    status: 'Due Renewal',
    checkInCount: 68,
    lastVisit: 'Yesterday, 07:15 PM',
  },
  {
    id: 'm3',
    name: 'Rohan Verma',
    code: 'JPR-8823',
    phone: '+91 98870 •••••',
    plan: 'Quarterly Cardio',
    status: 'Active',
    checkInCount: 29,
    lastVisit: '2 days ago',
  },
];

export const GymPreviewCanvas: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lookup' | 'qr' | 'subscriptions'>('lookup');
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<MemberRecord[]>(INITIAL_MEMBERS);
  const [selectedMember, setSelectedMember] = useState<MemberRecord>(INITIAL_MEMBERS[0]);
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleManualCheckIn = (memberId: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? {
              ...m,
              checkInCount: m.checkInCount + 1,
              lastVisit: 'Just now (Front Desk)',
            }
          : m
      )
    );
    setScanMessage(`Check-in recorded for ${selectedMember.name}`);
    setTimeout(() => setScanMessage(null), 3000);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      handleManualCheckIn(selectedMember.id);
    }, 600);
  };

  return (
    <div className="bg-[#EFECE4] text-[#141413] p-4 sm:p-5 font-mono text-xs select-none border border-[#DCD7CD] flex flex-col justify-between h-full min-h-[380px]">
      {/* Top Header & Tab Navigation */}
      <div>
        <div className="border-b border-[#DCD7CD] pb-2.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#C87D20] inline-block"></span>
            <span className="text-[#141413] font-semibold tracking-wider">
              GYM SAAS // FRONT-DESK LEDGER
            </span>
          </div>
          <span className="text-[11px] text-[#575550]">STATUS: IN ACTIVE DEVELOPMENT</span>
        </div>

        {/* Tab Controls (Clean Segmented Control with layoutId spring) */}
        <div className="flex items-center gap-1 my-3 bg-[#E4DFC8] p-1 border border-[#DCD7CD]">
          {[
            { id: 'lookup', label: 'Front-Desk Lookup' },
            { id: 'qr', label: 'QR Pass Terminal' },
            { id: 'subscriptions', label: 'Subscription Ledger' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex-1 py-1.5 px-2 text-center text-[11px] font-medium transition-colors z-10 ${
                  isActive ? 'text-[#F6F3EC] font-bold' : 'text-[#575550] hover:text-[#141413]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeGymTab"
                    className="absolute inset-0 bg-[#141413] -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area based on Tab */}
      <div className="flex-1 my-1">
        <AnimatePresence mode="wait">
          {activeTab === 'lookup' && (
            <motion.div
              key="lookup"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-3"
            >
              {/* Search Input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8A867E]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search member name or ID (e.g. Vikram, 8821)..."
                  className="w-full bg-[#F6F3EC] border border-[#DCD7CD] pl-8 pr-3 py-1.5 text-xs text-[#141413] focus:outline-none focus:border-[#141413] transition-colors"
                />
              </div>

              {/* Member Directory List */}
              <div className="space-y-1.5 max-h-[175px] overflow-y-auto no-scrollbar">
                {filteredMembers.map((member) => {
                  const isSelected = member.id === selectedMember.id;
                  return (
                    <motion.div
                      key={member.id}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedMember(member)}
                      className={`p-2 border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#141413] bg-[#F6F3EC]'
                          : 'border-[#DCD7CD] bg-[#F6F3EC]/60 hover:bg-[#F6F3EC]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#141413]">{member.name}</span>
                          <span className="text-[10px] text-[#8A867E]">[{member.code}]</span>
                        </div>
                        <div className="text-[10px] text-[#575550]">
                          {member.plan} · Visits: {member.checkInCount} · {member.lastVisit}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] px-1.5 py-0.5 border ${
                            member.status === 'Active'
                              ? 'border-[#3F5E45] text-[#3F5E45] bg-[#3F5E45]/10'
                              : 'border-[#C87D20] text-[#C87D20] bg-[#C87D20]/10'
                          }`}
                        >
                          {member.status}
                        </span>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMember(member);
                            handleManualCheckIn(member.id);
                          }}
                          className="p-1 bg-[#141413] text-[#F6F3EC] hover:bg-[#D84A27] transition-colors"
                          title="Check-In Now"
                        >
                          <UserCheck className="w-3 h-3" />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'qr' && (
            <motion.div
              key="qr"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center py-1"
            >
              {/* Left QR Schematic with Laser Scanning Animation */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 bg-[#F6F3EC] border border-[#DCD7CD] relative overflow-hidden">
                <div className="w-24 h-24 border-2 border-[#141413] p-1 flex items-center justify-center bg-white relative">
                  <QrCode className="w-20 h-20 text-[#141413]" />

                  {/* Scanning Laser Beam */}
                  <div
                    className={`absolute left-0 right-0 h-[2px] bg-[#D84A27] pointer-events-none ${
                      isScanning ? 'animate-laser' : 'opacity-0'
                    }`}
                  />
                </div>
                <span className="text-[9px] text-[#8A867E] mt-1.5 tracking-widest">
                  ID: {selectedMember.code}
                </span>
              </div>

              {/* Right Pass Details & Action */}
              <div className="sm:col-span-7 space-y-2">
                <div className="border border-[#DCD7CD] p-2 bg-[#F6F3EC]">
                  <div className="text-[10px] text-[#8A867E]">REGISTERED HOLDER</div>
                  <div className="font-semibold text-sm text-[#141413]">{selectedMember.name}</div>
                  <div className="text-[10px] text-[#575550]">
                    {selectedMember.plan} · Valid Member
                  </div>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSimulateScan}
                  className="w-full py-2 px-3 bg-[#141413] hover:bg-[#D84A27] text-[#F6F3EC] font-semibold text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className={`w-3.5 h-3.5 ${isScanning ? 'animate-bounce text-[#D84A27]' : ''}`} />
                  {isScanning ? 'Scanning Hardware Pass...' : 'Simulate Turnstile Scan'}
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'subscriptions' && (
            <motion.div
              key="subscriptions"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-2 py-1"
            >
              <div className="border border-[#DCD7CD] p-2.5 bg-[#F6F3EC]">
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="font-semibold text-[#141413]">Annual Pro Membership</span>
                  <span className="text-[#3F5E45] font-semibold">Active · 214 Days Left</span>
                </div>
                <div className="w-full bg-[#DCD7CD] h-1.5 mb-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '62%' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="bg-[#3F5E45] h-1.5"
                  />
                </div>
                <div className="text-[10px] text-[#575550]">
                  Access to all weights, lockers & morning cardio sessions
                </div>
              </div>

              <div className="border border-[#DCD7CD] p-2.5 bg-[#F6F3EC]">
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="font-semibold text-[#141413]">6-Month Strength Plan</span>
                  <span className="text-[#C87D20] font-semibold">Renewal Due in 4 Days</span>
                </div>
                <div className="w-full bg-[#DCD7CD] h-1.5 mb-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="bg-[#C87D20] h-1.5"
                  />
                </div>
                <div className="text-[10px] text-[#575550]">
                  Automated SMS & WhatsApp reminder triggered
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Status / Toast */}
      <div className="border-t border-[#DCD7CD] pt-2.5 flex items-center justify-between text-[11px]">
        <span className="text-[#575550]">
          {scanMessage || `Selected: ${selectedMember.name} (${selectedMember.code})`}
        </span>
        <span className="text-[#141413] font-semibold">
          TOTAL LOGGED: {selectedMember.checkInCount}
        </span>
      </div>
    </div>
  );
};
