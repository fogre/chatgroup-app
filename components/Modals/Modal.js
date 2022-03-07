import { DialogOverlay, DialogContent } from '@reach/dialog'
import styled from 'styled-components'

import { COLORS, QUERIES } from '@constants'

const ModalInMain = ({ openModal, setOpenModal, label, children }) => (
  <MainDialogWrapper
    isOpen={openModal}
    onDismiss={() => setOpenModal(false)}
  >
    <MainDialogContent aria-label={label}>
      {children}
    </MainDialogContent>
  </MainDialogWrapper>
)

const MainDialogWrapper = styled(DialogOverlay)`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background-color: hsla(285, 12%, 7%, 0.5);

  @media ${QUERIES.tablet} {
    padding: 10px;
  }
`

const MainDialogContent = styled(DialogContent)`
  width: 650px;
  max-width: 100%;
  padding: 34px 39px 29px;
  background-color: ${COLORS.black.dark};
  border-radius: var(--border-radius-large);
  margin-left: 320px;

  @media ${QUERIES.tablet} {
    margin-left: 0;
  }
`

export default ModalInMain