import type { Suggestions } from '../models/Suggestions';

type SuggestionsListProps = {
  suggestions: Suggestions[];
  activeIndex: number;
  onSelect: (value: string) => void;
};

export const SuggestionsList = ({
  suggestions,
  activeIndex,
  onSelect,
}: SuggestionsListProps) => {
  return (
    <ul
      className="suggestions-list"
      style={{ listStyle: 'none', padding: 0, margin: '4px 0', marginBottom: "1rem"}}
    >
      {suggestions.map((s, i) => (
        <li
          key={s.value}
          onClick={() => onSelect(s.value)}
          style={{
            cursor: 'pointer',
            padding: '6px 10px',
            background: i === activeIndex ? '#4c31902d' : 'transparent', // highlight test
          }}
        >
          {s.value}
        </li>
      ))}
    </ul>
  );
};
