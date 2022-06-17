import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import CircularProgress from './CircularProgress';

interface Props {
  display?: boolean;
}

const Container = styled.div`
  display: flex;
  flex: wrap;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  right: 0px;
`;

const LoadingIcon = styled(CircularProgress)`
  width: 50px !important;
  height: 50px !important;
  margin: auto;
  color: ${({ theme }) => theme.progress.circular.normal.TEXT_COLOR};
`;

const LoadingOverlay: FunctionComponent<Props> = ({ display }) => {
  return (
    <>
      {display && (
        <Container>
          <LoadingIcon />
        </Container>
      )}
    </>
  );
};

export default LoadingOverlay;
