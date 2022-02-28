import styled from 'styled-components'

import { COLORS } from '@constants'

export const UnstyledButton = styled.button`
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  color: inherit;

  &:focus {
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`

export const IconButton = styled(UnstyledButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  background-color: ${p => p.backgroundColor};
  width: ${p => p.size+'px'};
  height: ${p => p.size+'px'};
  border-radius: ${p => p.radius+'px'};
`

export const MenuButton = styled(UnstyledButton)`
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  padding: 10px;
  font-size: var(--font-tiny);
  border-radius: var(--border-radius-main);

  &:hover {
    background-color: ${COLORS.black.light};
  }
`

export const PaddedTextButton = styled(UnstyledButton)`
  padding: 7px 30px;
  border-radius: var(--border-radius-main);
  background-color: ${p => p.backgroundColor ? p.backgroundColor : 'transparent'};
  outline: 1px solid transparent;

  &:hover {
    outline: 1px solid ${COLORS.white['88']}
  }
`