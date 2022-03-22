import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  width: 100%;
  height: 56px;

  border: 2px solid #e8ebf2;
  color: #666360;

  display: flex;
  align-items: center;

  /* & + div {
    margin-top: 8px;
  } */

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid #007dfe;
      color: #007dfe;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #007dfe;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #000000;

    &::placeholder {
      color: #b7b7cc;
    }
  }

  > svg {
    margin-right: 16px;
  }

  button.showPassword {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 0px;

  svg {
    margin-right: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;