import React from "react";
import { LinkProps, Link as NextUiLink } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

interface Props extends LinkProps {
  to: string;
}

export const Link: React.FC<Props> = ({ children, to, ...props }) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(to);
  return <NextUiLink onClick={handleNavigate} {...props}>{children}</NextUiLink>;
};
