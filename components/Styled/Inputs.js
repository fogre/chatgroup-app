import styled, { css } from 'styled-components'

import { COLORS } from '@constants'

export const inputWrapperCSS = css`
  height: ${p => p.height};
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: var(--border-radius-large);
  background-color: ${COLORS.black.light};
  padding-left: 17px;
  padding-right: 6px;

  &:focus-within, &:hover {
    box-shadow: var(--shadow-primary);
  }
`

export const DefaultInputWrapper = styled.div`
  ${inputWrapperCSS}
`

export const inputCSS = css`
  height: 100%;
  width: 100%;
  color: ${COLORS.white['88']};
  background-color: ${COLORS.black.light};
  outline: none;
  border: none;

  &::placeholder {
    color: ${COLORS.white['51']};
    font-size: var(--font-small);
  }
`

export const DefaultInput = styled.input`
  ${inputCSS}
`