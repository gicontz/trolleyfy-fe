import { CircularProgress as ProgressCircle } from '@material-ui/core';
import styled from 'styled-components';

const CircularProgress = styled(ProgressCircle)`
  color: ${({ theme }) => theme.progress.circular.normal.TEXT_COLOR};
  width: 20px !important;
  height: 20px !important;
`;

export default CircularProgress;
