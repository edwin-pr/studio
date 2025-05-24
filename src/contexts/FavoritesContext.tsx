
"use client";

import type React from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Property } from '@/lib/data';

interface FavoritesContextType {
  favorites: Property[];
  addFavorite: (property: Property) => void;
  removeFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  toggleFavorite: (property: Property) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Property[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedFavorites = localStorage.getItem('tenantHavenFavorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
      } catch (error) {
        console.error("Error reading favorites from localStorage", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tenantHavenFavorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const addFavorite = useCallback((property: Property) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.find(p => p.id === property.id)) {
        return [...prevFavorites, property];
      }
      return prevFavorites;
    });
  }, []);

  const removeFavorite = useCallback((propertyId: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((p) => p.id !== propertyId));
  }, []);

  const isFavorite = useCallback((propertyId: string) => {
    return favorites.some((p) => p.id === propertyId);
  }, [favorites]);

  const toggleFavorite = useCallback((property: Property) => {
    if (isFavorite(property.id)) {
      removeFavorite(property.id);
    } else {
      addFavorite(property);
    }
  }, [addFavorite, isFavorite, removeFavorite]);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
