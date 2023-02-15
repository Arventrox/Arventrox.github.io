import { useState, useEffect } from 'react';
import { roles } from './useGetChampion';

interface Role {
  roleName: string;
  roleImg: string;
}

const useRoleDisplay = () => {
  const [currentRole, setCurrentRole] = useState<Role | null>(null);

  useEffect(() => {
    let index = 0;
    let displayedRoles = 0;

    const interval = 700;
    const previousTime = performance.now();

    const intervalId = setInterval(() => {
      const currentTime = performance.now();
      const elapsedTime = currentTime - previousTime;
      if (elapsedTime >= interval) {
        setCurrentRole(roles[index].role);
        roles.filter((role) => role.role !== currentRole);
        displayedRoles += 1;
        index = (index + 1) % roles.length;
        // previousTime = currentTime;

        if (displayedRoles === 5) {
          clearInterval(intervalId);
          setCurrentRole(null);
        }
      }
    }, interval);

    return () => {
      clearInterval(interval);
    };
  }, [roles]);

  return currentRole;
};

export default useRoleDisplay;
