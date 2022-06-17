import { LinearProgress as ProgressLinear } from '@material-ui/core';
import styled from 'styled-components';

const LinearProgress = styled(ProgressLinear)`
  &.MuiLinearProgress-colorPrimary {
    background-color: ${({ theme }) => theme.progress.linear.normal.BG_COLOR};
  }
  width: 100%;
  position: relative;
  > div {
    background-color: ${({ theme }) => theme.progress.linear.normal.SECONDARY_BG_COLOR};
  }
`;

export default LinearProgress;
