import styled from 'styled-components'

import { COLORS } from '@constants'

const TEXT_COLOR = {
  dark: COLORS.white['51'],
  medium: COLORS.white['74'],
  light: COLORS.white['88'],
  danger: COLORS.danger
}

export const Heading = styled.h2`
  color: ${p => p.color ? TEXT_COLOR[p.color] : TEXT_COLOR.light};
  text-transform: ${p => p.transform};
`

const PARAGRAPH_SIZE = {
  tiny: 'var(--font-tiny)',
  small: 'var(--font-small)',
  normal: 'var(--font-normal)'
}

export const Text = styled.p`
  color: ${p => p.color ? TEXT_COLOR[p.color] : TEXT_COLOR.light};
  font-size: ${p => p.size ? PARAGRAPH_SIZE[p.size] : PARAGRAPH_SIZE.normal};
`
