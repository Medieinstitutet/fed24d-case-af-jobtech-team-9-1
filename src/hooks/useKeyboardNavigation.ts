import type { DigiFormInputSearch } from "@digi/arbetsformedlingen/components/digi-form-input-search";
import { useState } from "react";

export function useKeyboardNavigation<T>(
  items: T[],
  onSelect: (item: T) => void
) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent<DigiFormInputSearch>) => {
    if (items.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      onSelect(items[activeIndex]);
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setActiveIndex(-1);
    }
  };

  return { activeIndex, setActiveIndex, handleKeyDown };
}
