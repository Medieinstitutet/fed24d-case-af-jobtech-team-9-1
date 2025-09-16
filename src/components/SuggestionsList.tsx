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
      style={{ listStyle: 'none', padding: 0, margin: '4px 0' }}
    >
      {suggestions.map((s, i) => (
        <li
          key={s.value}
          onClick={() => onSelect(s.value)}
          style={{
            cursor: 'pointer',
            padding: '6px 10px',
            background: i === activeIndex ? '#e6f0ff' : 'transparent', // highlight test
          }}
        >
          {s.value}
        </li>
      ))}
    </ul>
  );
};
