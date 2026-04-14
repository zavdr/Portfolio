import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-content px-6 py-16 sm:px-8 sm:py-20 ${className}`}>
      {children}
    </div>
  );
}
