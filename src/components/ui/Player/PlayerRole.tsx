import React, { FC, useContext, useEffect, useState } from 'react';
import { BtnContext } from '../../../store/context';
import { roles } from '../../../hooks/useGetChampion';

interface Role {
  roleName: string;
  roleImg: string;
}

interface Props {
  roleName: string;
  roleImg: string;
}

const PlayerRole: FC<Props> = ({ roleImg, roleName }) => {
  const { setIsCurrentlyPicking } = useContext(BtnContext);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);

  useEffect(() => {
    let index = 0;
    let displayedRoles = 0;
    setIsCurrentlyPicking(true);

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
          setIsCurrentlyPicking(false);
        }
      }
    }, interval);

    return () => {
      clearInterval(interval);
    };
  }, [roles]);

  return (
    <>
      <img src={currentRole ? currentRole.roleImg : roleImg}></img>
      <p>Role: {currentRole ? currentRole.roleName : roleName}</p>
    </>
  );
};

export default PlayerRole;
