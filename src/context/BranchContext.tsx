import React, { createContext, useContext, useState } from 'react';
import { Branch } from '../types';
import { branches } from '../data/branches';
import { getItem, setItem, removeItem } from '../utils/storage';

interface BranchContextType {
  branches: Branch[];
  selectedBranch: Branch | null;
  selectBranch: (branchId: string) => void;
  changeBranch: () => void;
  branchInfoModalBranch: Branch | null;
  openBranchInfoModal: (branch: Branch) => void;
  closeBranchInfoModal: () => void;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

const BRANCH_STORAGE_KEY = 'selectedBranchId';

export const BranchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(() => {
    const savedId = getItem<string | null>(BRANCH_STORAGE_KEY, null);
    if (savedId) {
      return branches.find((b) => b.id === savedId) || null;
    }
    return null;
  });

  const [branchInfoModalBranch, setBranchInfoModalBranch] = useState<Branch | null>(null);

  const selectBranch = (branchId: string) => {
    const found = branches.find((b) => b.id === branchId);
    if (found) {
      setSelectedBranch(found);
      setItem(BRANCH_STORAGE_KEY, branchId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const changeBranch = () => {
    setSelectedBranch(null);
    removeItem(BRANCH_STORAGE_KEY);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBranchInfoModal = (branch: Branch) => {
    setBranchInfoModalBranch(branch);
  };

  const closeBranchInfoModal = () => {
    setBranchInfoModalBranch(null);
  };

  return (
    <BranchContext.Provider
      value={{
        branches,
        selectedBranch,
        selectBranch,
        changeBranch,
        branchInfoModalBranch,
        openBranchInfoModal,
        closeBranchInfoModal,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};

export const useBranch = (): BranchContextType => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
};
