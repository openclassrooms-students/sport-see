import { PropsWithChildren } from "react";

export const Card = ({
  className,
  children,
}: PropsWithChildren<{}> & {
  className?: string;
}) => {
  return (
    <div
      className={`bg-secondary w-[258px] h-[263px] rounded ${className}`}
    >
      {children}
    </div>
  );
};
