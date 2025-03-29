
import React from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList } from "lucide-react";

interface ViewToggleProps {
  view: "list" | "grid";
  onChange: (view: "list" | "grid") => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onChange }) => {
  return (
    <div className="flex items-center gap-2 bg-secondary p-1 rounded-lg">
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("list")}
        className="h-8 w-8 p-0"
        aria-label="List view"
      >
        <LayoutList className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("grid")}
        className="h-8 w-8 p-0"
        aria-label="Grid view"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ViewToggle;
