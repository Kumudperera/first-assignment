import type React from "react";
import "./page-item.css";
import { Checkbox } from "./ui/checkbox";

interface PageItemProps {
  pageNumber: number;
  selected: boolean;
  onToggle: (pageNumber: number) => void;
}

export const PageItem: React.FC<PageItemProps> = ({
  pageNumber,
  selected,
  onToggle,
}) => {
  return (
    <Checkbox
      label={`Page ${pageNumber}`}
      checked={selected}
      onChange={() => onToggle(pageNumber)}
    />
  );
};
