import type { Suggestions } from "../models/Suggestions";

type SuggestionsListProps = {
  suggestions: Suggestions[];
  onSelect: (value: string) => void;
};

export const SuggestionsList = ({ suggestions: items, onSelect }: SuggestionsListProps) => {
  return (
    <ul className="suggestions-list">
      {items.map((s) => (
        <li
          key={s.value}
          tabIndex={0} // for keyboard navigation
          onClick={() => onSelect(s.value)} // click to select
          onKeyDown={(e) => e.key === "Enter" && onSelect(s.value)} // Enter key selects
          style={{ cursor: "pointer", padding: "4px 8px" }}
        >
          {s.value}
        </li>
      ))}
    </ul>
  );
};
