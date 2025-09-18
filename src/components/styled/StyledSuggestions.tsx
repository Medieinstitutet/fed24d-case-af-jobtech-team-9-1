import styled from "styled-components";

type SuggestionItemProps = {
  $isActive: boolean; 
};

export const SuggestionsUl = styled.ul`
max-width: 500px;
  list-style: none;
  padding: 0;
  margin: 4px 0;
  margin-bottom: 1rem;
  border: 1px solid var(--digi--color--border--neutral-3);
  border-radius: 0.375rem;
  background-color: #fff;
`;

export const SuggestionsLi =  styled.li<SuggestionItemProps>`
  cursor: pointer;
  padding: 6px 10px;
  background: ${({ $isActive }) => ($isActive ? '#4c31902d' : 'transparent')};
`;