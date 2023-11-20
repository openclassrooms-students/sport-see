import { Suspense } from "react";
import { Resource } from "../../hooks/useResource";

type SuspenseWrapperProps = {
  resource?: Resource<any> | null;
  fallback: NonNullable<React.ReactNode> | null;
  children: React.ReactNode;
};

export const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({
  resource,
  fallback,
  children,
}) => {
  // if (!resource) {
  //   return null;
  // }

  return <Suspense fallback={fallback}>{children}</Suspense>;
};
