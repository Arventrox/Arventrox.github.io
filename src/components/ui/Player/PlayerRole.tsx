import React, { FC } from 'react';
import useRoleDisplay from '../../../hooks/useRoleDisplay';
interface Props {
  roleName: string;
  roleImg: string;
}
const PlayerRole: FC<Props> = ({ roleImg, roleName }) => {
  const currentRole = useRoleDisplay();

  return (
    <>
      <img src={currentRole ? currentRole.roleImg : roleImg}></img>
      <p>Role: {currentRole ? currentRole.roleName : roleName}</p>
    </>
  );
};

export default PlayerRole;
