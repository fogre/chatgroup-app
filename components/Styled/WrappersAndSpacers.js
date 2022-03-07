import styled from 'styled-components'

import { COLORS } from '@constants'

export const LineSpacer = styled.span`
  border-width: 0 0 ${p => p.borderWidth ? p.borderWidth+'px' : '1px'} 0;
  border-color: ${p => p.color ? p.color : COLORS.white['51']};
  border-style: ${p => p.style ? p.style : 'solid'};
  width: ${p => p.width ? p.width+'px' : '100%'};
`

export const LineSpacerWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 6px 0;
`

export const ScrollWrapper = styled.div`
  height: 100%;
  min-height: var(--content-height);
  max-height: var(--content-height);
  overflow-y: auto;
  padding-bottom: var(--header-height);
`