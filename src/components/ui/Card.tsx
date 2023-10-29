import { PropsWithChildren } from "react";

export const Card = ({
  className,
  children,
}: PropsWithChildren<{}> & {
  className?: string;
}) => {
  return (
    <div className={`bg-secondary rounded p-8 ${className}`}>
      {children}
    </div>
  );
};
