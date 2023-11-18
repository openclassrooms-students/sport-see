import { PropsWithChildren } from "react";

export const Card = ({
  className,
  children,
}: PropsWithChildren & {
  className?: string | undefined;
}) => {
  return (
    <div
      className={`bg-secondary w-[258px] h-[263px] flex-grow lg:flex-grow-0 rounded ${className}`}
    >
      {children}
    </div>
  );
};
