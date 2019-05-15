import { HTMLAttributes } from "react";
import CardHeader from "./CardHeader";
import classNames from "classnames";

interface Props extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export default function ShadowBox({
  label,
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={classNames(
        "bg-white dark:bg-gray-900 dark:text-gray-100 m-1 p-5 border-b-2 dark:border-gray-700 drop-shadow-lg rounded-2xl",
        className
      )}
      {...props}
    >
      {label && <CardHeader>{label}</CardHeader>}
      {children}
    </div>
  );
}
