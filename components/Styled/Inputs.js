import styled, { css } from 'styled-components'

import { COLORS } from '@constants'

export const inputWrapperCSS = css`
  height: ${p => p.height};
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: ${p => p.radius ? p.radius : 'var(--border-radius-large)'};
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

export const DefaultTextAreaWrapper = styled.div`
  ${inputWrapperCSS}
  display: block;
  padding-top: 15px;
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
    font-size: ${p => p.placeholderNormal ? 'var(--font-normal)' : 'var(--font-small)'}
  }
`

export const DefaultInput = styled.input`
  ${inputCSS}
`

export const DefaultTextArea = styled.textarea`
  ${inputCSS}
  resize: none;
`

export const FileInput = ({ id, name, text, fileTypes, handleChange }) => (
  <>
    <InputFile
      type='file'
      name={name}
      accept={fileTypes ? fileTypes : '*'}
      id={id}
      onChange={handleChange}
    />
    <LabelFile htmlFor={id}>
      {text}
    </LabelFile>
  </>
)

const InputFile = styled.input`
  display: none;
`
const LabelFile = styled.label`
  cursor: pointer;
  font-size: var(--font-normal);

  &:focus, &:hover {
    color: ${COLORS.primary};
    text-decoration: underline;
  }
`