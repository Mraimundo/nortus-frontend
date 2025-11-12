'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { mapMarkers } from '../../config/dashboardData';
import { MapMarker } from '../../types/dashboard';
import { CustomerMapCard } from '../CustomerMapCard';
import { MapPin, Users } from 'lucide-react';

interface CustomerMapProps {
  markers?: MapMarker[];
}

export function CustomerMap({ markers = mapMarkers }: CustomerMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredMarkers = useMemo(() => {
    return markers.filter((marker) => {
      const regionMatch =
        selectedRegion === 'all' || marker.region === selectedRegion;
      const typeMatch =
        selectedType === 'all' || marker.customerType === selectedType;
      return regionMatch && typeMatch;
    });
  }, [markers, selectedRegion, selectedType]);

  const regions = useMemo(
    () => Array.from(new Set(markers.map((m) => m.region))),
    [markers],
  );

  const customerTypes = useMemo(
    () => Array.from(new Set(markers.map((m) => m.customerType))),
    [markers],
  );

  const totalClients = filteredMarkers.reduce(
    (sum, marker) => sum + marker.count,
    0,
  );

  return (
    <motion.div
      className="lg:col-span-2 xl:col-span-2 bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-5 shadow-lg flex flex-col gap-5 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <h2 className="text-lg lg:text-xl font-semibold text-slate-100 leading-tight">
          Mapa de clientes por região
        </h2>
        <div className="flex flex-wrap gap-2">
          <select
            className="bg-slate-800/70 border border-slate-700 text-slate-200 rounded-3xl px-3 py-1.5 text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="all">Todas as regiões</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <select
            className="bg-slate-800/70 border border-slate-700 text-slate-200 rounded-3xl px-3 py-1.5 text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">Todos os tipos</option>
            {customerTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <motion.div
        className="relative h-72 xl:h-80 rounded-xl overflow-hidden border border-slate-700/40 shadow-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <CustomerMapCard markers={filteredMarkers} />
      </motion.div>

      <motion.div
        className="flex items-center justify-between gap-4 mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.div
          className="flex items-center gap-2 bg-slate-800/70 border border-slate-700/60 rounded-lg px-3 py-2 shadow-md hover:bg-slate-800/90 transition-all duration-300"
          whileHover={{ scale: 1.03 }}
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute inset-0 bg-cyan-500/20 rounded-full blur-sm"
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <MapPin size={16} className="text-cyan-400 relative z-10" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] uppercase text-slate-400 font-medium tracking-wide">
              Regiões
            </span>
            <span className="text-sm font-semibold text-slate-100">
              <CountUp end={filteredMarkers.length} duration={1.4} />
            </span>
          </div>
        </motion.div>

        {/* Clientes */}
        <motion.div
          className="flex items-center gap-2 bg-slate-800/70 border border-slate-700/60 rounded-lg px-3 py-2 shadow-md hover:bg-slate-800/90 transition-all duration-300"
          whileHover={{ scale: 1.03 }}
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute inset-0 bg-emerald-500/20 rounded-full blur-sm"
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            />
            <Users size={16} className="text-emerald-400 relative z-10" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] uppercase text-slate-400 font-medium tracking-wide">
              Clientes
            </span>
            <span className="text-sm font-semibold text-slate-100">
              <CountUp end={totalClients} duration={1.8} />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
