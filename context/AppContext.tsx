
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type SubscriptionTier = 'LITE' | 'PRO' | 'ENTERPRISE';

interface User {
  name: string;
  role: string;
  avatar: string;
}

interface AppContextType {
  tier: SubscriptionTier;
  setTier: (tier: SubscriptionTier) => void;
  user: User;
  isFeatureEnabled: (feature: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tier, setTier] = useState<SubscriptionTier>('PRO');
  const [user] = useState<User>({
    name: 'Kasun Perera',
    role: 'Senior Pharmacist',
    avatar: 'https://picsum.photos/seed/pharmacist/40/40'
  });

  const isFeatureEnabled = (feature: string) => {
    switch (feature) {
      case 'AI_ASSIST': return tier !== 'LITE';
      case 'ADVANCED_ANALYTICS': return tier === 'ENTERPRISE';
      case 'EXTENDED_RETURNS': return tier !== 'LITE';
      default: return true;
    }
  };

  return (
    <AppContext.Provider value={{ tier, setTier, user, isFeatureEnabled }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
