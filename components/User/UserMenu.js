import Link from 'next/link'

import {
  LogOut as LogOutIcon,
  User as UserIcon
} from 'react-feather'

import { COLORS } from '@constants'

import {
  MenuButton,
  Text,
  LineSpacer
} from '@components/Styled'

export const UserMenuComponent = ({ handleSignOut }) => (
  <>
    <Link href='/signup' passHref>
      <MenuButton>
        <UserIcon
          size={18}
          color={COLORS.white['88']}
        />
        <Text size='tiny' color='light'>My Profile</Text>
      </MenuButton>
    </Link>
    <div style={{  display: 'flex', width: '100%', padding: '6px 0' }}>
      <LineSpacer />
    </div>
    <MenuButton onClick={() => handleSignOut()}>
      <LogOutIcon
        size={18}
        color={COLORS.danger}
      />
      <Text size='tiny' color='danger'>Log out</Text>
    </MenuButton>
  </>
)