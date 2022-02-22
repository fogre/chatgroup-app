import Link from 'next/link'

import {
  LogOut as LogOutIcon,
  User as UserIcon
} from 'react-feather'

import { COLORS } from '@constants'

import {
  MenuButton,
  Text,
  LineSpacer,
  LineSpacerWrapper
} from '@components/Styled'

export const UserMenuComponent = ({ handleSignOut }) => (
  <>
    <Link href='/profile' passHref>
      <MenuButton>
        <UserIcon
          size={18}
          color={COLORS.white['88']}
        />
        <Text size='tiny' color='light'>My Profile</Text>
      </MenuButton>
    </Link>
    <LineSpacerWrapper>
      <LineSpacer />
    </LineSpacerWrapper>
    <MenuButton onClick={() => handleSignOut()}>
      <LogOutIcon
        size={18}
        color={COLORS.danger}
      />
      <Text size='tiny' color='danger'>Log out</Text>
    </MenuButton>
  </>
)