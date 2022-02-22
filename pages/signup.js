import { Authenticator } from '@aws-amplify/ui-react'
import styled from 'styled-components'

import { COLORS } from '@constants'

import { CenteredMainLayout } from '@components/Layout'
import { Heading, inputCSS, inputWrapperCSS } from '@components/Styled'
import { UserMenuComponent } from '@components/User'

const SignUpPage = () => {
  return (
    <CenteredMainLayout pageName='Sign in / up'>
      <StyledAuthenticator>
        {({ signOut, user }) => (
          <Wrapper>
            <Heading>Hi, {user.username}!</Heading>
            <br />
            <UserMenuComponent handleSignOut={() => signOut()} />
          </Wrapper>
        )}
      </StyledAuthenticator>
    </CenteredMainLayout>
  )
}

const Wrapper = styled.div`
  text-align: center;
  border: 2px solid ${COLORS.black.light};
  border-radius: var(--border-radius-large);
  width: 300px;
  padding: 32px;
`

const StyledAuthenticator = styled(Authenticator)`
  width: 100%;
  max-width: 500px;
  margin: var(--padding-main);

  * {
    border: none;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .amplify-tabs {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .amplify-tabs-item {
    cursor: pointer;
    text-align: center;
    padding: 16px;
    font-weight: 700;
    border: 2px solid ${COLORS.black.light};
    border-top-right-radius: var(--border-radius-main);
    border-top-left-radius: var(--border-radius-main);
    border-bottom: none;

    &:last-of-type {
      border: none;
      border-bottom: 2px solid ${COLORS.black.light};
      text-decoration: underline;
    }
  }

  .amplify-field {
    padding: 10px 0;
  }

  .amplify-label {
    font-size: var(--font-small);
  }

  .amplify-input {
    ${inputCSS}
    padding: 10px 16px;
    border-radius: var(--border-radius-large);

    &:focus-within, &:hover {
      box-shadow: var(--shadow-primary);

    }

    &::placeholder {
      font-size: var(--font-normal);
    }
  }

  .amplify-field-group__outer-end {
    width: 40px;
    margin-right: 15px;
    padding-top: 10px;
  }

  .amplify-passwordfield {
    .amplify-field-group {
      ${inputWrapperCSS}
      padding-left: 0;
    }
    .amplify-field__show-password {
      background: transparent;
      cursor: pointer;
    }
  }

  .amplify-icon {
    color: ${COLORS.white['88']};
  }

  .button {
    cursor: pointer;
  }

  .amplify-button[data-variation='primary'] {
    background-color: ${COLORS.primary};
    border-radius: var(--border-radius-main);
    padding: 8px 0;
    margin: 16px 0;
    font-weight: 700;
    color: inherit;
    box-shadow: var(--shadow-secondary);
    cursor: pointer;
  }

  .amplify-button[data-variation='link'] {
    background-color: transparent;

    align-self: center;
    margin: 35px 0;
    font-weight: 700;
    color: ${COLORS.primary};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .amplify-alert {
    display: flex;
    width: 100%;
    height: 35px;
    align-items: start;
    justify-content: space-between;
    text-align: center;
    color: ${COLORS.danger};

    button {
      width: 20px;
    }

    .amplify-icon {
      align-self: start;
      color: inherit;
    }
  }
`

export default SignUpPage