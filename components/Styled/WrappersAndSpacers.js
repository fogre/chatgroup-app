import styled from 'styled-components'

import { COLORS } from '@constants'

export const LineSpacer = styled.span`
  border-width: ${p => p.borderWidth ? p.borderWidth+'px' : '1px'};
  border-color: ${p => p.color ? p.color : COLORS.white['51']};
  border-style: ${p => p.style ? p.style : 'solid'};
  width: ${p => p.width ? p.width+'px' : '100%'};
`