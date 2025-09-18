import type { Suggestions } from '../models/Suggestions';
import { SuggestionsLi, SuggestionsUl } from './styled/StyledSuggestions';

type SuggestionsListProps = {
  suggestions: Suggestions[];
  activeIndex: number;
  setActiveIndex: (value: number) => void;
  onSelect: (value: string) => void;
};

export const SuggestionsList = ({
  suggestions,
  activeIndex,
  setActiveIndex,
  onSelect,
}: SuggestionsListProps) => {
  return (
    <SuggestionsUl
    >
      {suggestions.map((s, i) => (
        <SuggestionsLi
          $isActive={i === activeIndex}
          onMouseEnter={() => setActiveIndex(i)}
          key={s.value}
          onClick={() => onSelect(s.value)}
        >
          {s.value}
        </SuggestionsLi>
      ))}
    </SuggestionsUl>
  );
};
