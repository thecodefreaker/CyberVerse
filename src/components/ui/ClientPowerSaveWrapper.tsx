'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import PowerSaveToggle with no SSR to avoid hydration issues
const PowerSaveToggle = dynamic(
  () => import("@/components/ui/PowerSaveToggle"),
  { ssr: false }
);

const ClientPowerSaveWrapper: React.FC = () => {
  return <PowerSaveToggle />;
};

export default ClientPowerSaveWrapper;
