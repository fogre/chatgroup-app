import Link from 'next/link'
import styled from 'styled-components'

import { Text, TextLink } from '@components/Styled'

export const SignInOrUp = ({ text }) => (
  <Wrapper>
    <Text color='medium'>
      <Link href='/signup' passHref>
        <TextLink >
          Sign in / up
        </TextLink>
      </Link>
      {text}
    </Text>
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100%;
  align-items: center;
  text-align: center;
`