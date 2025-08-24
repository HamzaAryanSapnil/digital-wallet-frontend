import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export interface FilterOption {
  key: string;
  label: string;
  type: "text" | "select";
  options?: { value: string; label: string }[]; // for select
}

interface FilterBarProps {
  filters: FilterOption[];
  onFilterChange: (values: Record<string, string>) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
}

export function FilterBar({
  filters,
  onFilterChange,
  limit,
  onLimitChange,
}: FilterBarProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    const newValues = { ...values, [key]: value };
    setValues(newValues);
    onFilterChange(newValues);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
      <div className="flex flex-wrap gap-4">
        {filters.map((filter) => {
          if (filter.type === "text") {
            return (
              <Input
                key={filter.key}
                placeholder={filter.label}
                value={values[filter.key] || ""}
                onChange={(e) => handleChange(filter.key, e.target.value)}
                className="w-60 sm:w-72"
              />
            );
          }
          if (filter.type === "select" && filter.options) {
            return (
              <Select
                key={filter.key}
                onValueChange={(val) => handleChange(filter.key, val)}
                value={values[filter.key] || ""}
              >
                <SelectTrigger className="w-40 sm:w-48">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  {filter.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }
          return null;
        })}
      </div>

      {/* Rows per page control */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Rows per page:</span>
        <Select
          onValueChange={(val) => onLimitChange(Number(val))}
          value={limit.toString()}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="40">40</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setValues({});
            onFilterChange({});
            onLimitChange(10);
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
