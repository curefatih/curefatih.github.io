import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function CardHeader({ children }: Props) {
  return <h1 className="text-red-400">{children}</h1>;
}
