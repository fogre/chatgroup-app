import { useContext } from 'react'

import { MemberContext } from '@context'

const MembersList = () => {
  const { activeMembers, inactiveMembers } = useContext(MemberContext)

  return (
    <>
      <div>
        <h3>Active members</h3>
        {Object.values(activeMembers).map(aMember =>
          <p key={aMember.id}>{aMember.username}</p>
        )}
        <h3>Inactive members</h3>
        {Object.values(inactiveMembers).map(iMember =>
          <p key={iMember.id}>{iMember.username}</p>
        )}
      </div>
    </>
  )
}

export default MembersList