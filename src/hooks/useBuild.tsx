"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BuildPlan, BuildBasket, BasketItem, InstallStage } from '@/lib/data/productRegistry';

interface BuildContextType {
  activeBuild: BuildPlan | null;
  basket: BuildBasket | null;
  saveBuild: (plan: BuildPlan, basketItems: BasketItem[]) => void;
  updateItemStatus: (itemId: string, status: any) => void;
  markAsOwned: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  replaceItem: (itemId: string, newProductId: string) => void;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export function BuildProvider({ children }: { children: React.ReactNode }) {
  const [activeBuild, setActiveBuild] = useState<BuildPlan | null>(null);
  const [basket, setBasket] = useState<BuildBasket | null>(null);

  useEffect(() => {
    // Load from local storage on mount
    const savedBuild = localStorage.getItem('amplios_active_build');
    const savedBasket = localStorage.getItem('amplios_active_basket');
    
    if (savedBuild) setActiveBuild(JSON.parse(savedBuild));
    if (savedBasket) setBasket(JSON.parse(savedBasket));
  }, []);

  const saveBuild = (plan: BuildPlan, basketItems: BasketItem[]) => {
    setActiveBuild(plan);
    const newBasket: BuildBasket = {
      id: crypto.randomUUID(),
      buildPlanId: plan.id,
      lockedAt: new Date().toISOString(),
      totalValue: basketItems.reduce((sum, item) => sum + item.totalPrice, 0),
      items: basketItems
    };
    setBasket(newBasket);
    
    localStorage.setItem('amplios_active_build', JSON.stringify(plan));
    localStorage.setItem('amplios_active_basket', JSON.stringify(newBasket));
  };

  const updateItemStatus = (itemId: string, status: any) => {
    if (!basket) return;
    const newItems = basket.items.map(item => 
      item.id === itemId ? { ...item, purchaseStatus: status } : item
    );
    const newBasket = { ...basket, items: newItems };
    setBasket(newBasket);
    localStorage.setItem('amplios_active_basket', JSON.stringify(newBasket));
  };

  const markAsOwned = (itemId: string) => updateItemStatus(itemId, 'already_owned');
  const removeItem = (itemId: string) => updateItemStatus(itemId, 'removed');

  const replaceItem = (itemId: string, newProductId: string) => {
    // Mock replacement logic
    if (!basket) return;
    const newItems = basket.items.map(item => 
      item.id === itemId ? { ...item, productId: newProductId, purchaseStatus: 'not_purchased' } : item
    );
    const newBasket = { ...basket, items: newItems };
    setBasket(newBasket);
    localStorage.setItem('amplios_active_basket', JSON.stringify(newBasket));
  };

  return (
    <BuildContext.Provider value={{ 
      activeBuild, 
      basket, 
      saveBuild, 
      updateItemStatus, 
      markAsOwned, 
      removeItem, 
      replaceItem 
    }}>
      {children}
    </BuildContext.Provider>
  );
}

export function useBuild() {
  const context = useContext(BuildContext);
  if (context === undefined) {
    throw new Error('useBuild must be used within a BuildProvider');
  }
  return context;
}
