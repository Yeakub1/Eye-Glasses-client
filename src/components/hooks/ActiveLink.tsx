import React, { ReactNode } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

interface ActiveLinkProps extends NavLinkProps {
  children: ReactNode;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ to, children, ...rest }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "text-[#EFA303]" : "")}
      {...rest}
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
