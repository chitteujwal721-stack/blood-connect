import { useState, useCallback } from 'react';
import type { NavigationRoute } from '@blood-connect/shared';

export function useNavigation(initialRoute: NavigationRoute = 'dashboard') {
  const [currentRoute, setCurrentRoute] = useState<NavigationRoute>(initialRoute);
  const [history, setHistory] = useState<NavigationRoute[]>([initialRoute]);

  const navigateTo = useCallback((route: NavigationRoute) => {
    setCurrentRoute(route);
    setHistory((prev) => [...prev, route]);
  }, []);

  return {
    currentRoute,
    navigateTo,
    history,
  };
}

