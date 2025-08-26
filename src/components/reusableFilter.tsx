import React, { useEffect, useMemo, useState } from "react";
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
  options?: { value: string; label: string }[];
  enabled?: boolean;
  placeholder?: string;
}

interface FilterBarProps {
  filters: FilterOption[];
  onFilterChange: (values: Record<string, string>) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
  initialValues?: Record<string, string>;
  debounceMs?: number; // default 400
  visibleKeys?: string[]; // optional override: only render these keys (if provided)
  showReset?: boolean; // default true
}

export function FilterBar({
  filters,
  onFilterChange,
  limit,
  onLimitChange,
  initialValues = {},
  debounceMs = 0,
  visibleKeys,
  showReset = true,
}: FilterBarProps) {
  const renderFilters = useMemo(() => {
    return filters.filter(
      (f) =>
        f.enabled !== false && (!visibleKeys || visibleKeys.includes(f.key))
    );
  }, [filters, visibleKeys]);

  const [values, setValues] = useState<Record<string, string>>(() => ({
    ...initialValues,
  }));

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange(values);
    }, debounceMs); 

    return () => clearTimeout(handler);
  }, [values, debounceMs]); 

  const handleChangeImmediate = (key: string, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      return next;
    });
  };

  const clearAll = () => {
    setValues({});
    onFilterChange({});
    onLimitChange(10);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
      <div className="flex flex-wrap gap-4">
        {renderFilters.map((filter) => {
          if (filter.type === "text") {
            return (
              <Input
                key={filter.key}
                placeholder={filter.placeholder ?? filter.label}
                value={values[filter.key] ?? ""}
                onChange={(e) =>
                  handleChangeImmediate(filter.key, e.target.value)
                }
                className="w-60 sm:w-72"
              />
            );
          }

          if (filter.type === "select" && filter.options) {
            return (
              <Select
                key={filter.key}
                onValueChange={(val) => handleChangeImmediate(filter.key, val)}
                value={values[filter.key] ?? ""}
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

      {/* Rows per page control + Reset */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Rows per page:</span>
        <Select
          onValueChange={(val) => onLimitChange(Number(val))}
          value={String(limit)}
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

        {showReset && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              clearAll();
            }}
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
