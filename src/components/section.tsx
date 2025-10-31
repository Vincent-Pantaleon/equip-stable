import React from "react";

interface SectionProps {
  children: React.ReactNode;
  header?: string;
}

// 📦 Section
export const Section = React.memo(function Section({ children, header }: SectionProps) {
  return (
    <div>
        <h1 className="text-lg font-semibold">{header}</h1>
        <div className="border-2 rounded-md lg:px-5 p-2 grid grid-cols-1 gap-[10px] md:grid-cols-2 text-sm">
            {children}
        </div>
    </div>
  );
});