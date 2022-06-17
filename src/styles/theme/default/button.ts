import { ButtonColors } from '../../../types/Theme';

const colors: ButtonColors = {
  contained: {
    light: {
      normal: {
        BG_COLOR: '#FFFFFF',
        TEXT_COLOR: '#EB448C',
        BORDER_COLOR: '#FFFFFF',
      },
    },
    dark: {
      normal: {
        BG_COLOR: '#EB448C',
        TEXT_COLOR: '#FFFFFF',
        BORDER_COLOR: '#EB448C'
      },
    }
  },
  outline: {
    light: {
      normal: {
        BG_COLOR: 'transparent',
        TEXT_COLOR: '#EB448C',
        BORDER_COLOR: '#EB448C'
      },
    },
    dark: {
      normal: {
        BG_COLOR: '#EB448C',
        TEXT_COLOR: '#FFFFFF',
        BORDER_COLOR: '#EB448C'
      },
    }
  },
  action: {
    light: {
      normal: {
        BG_COLOR: 'transparent',
        TEXT_COLOR: '#EB448C',
        BORDER_COLOR: '#EB448C'
      },
      hover: {
        BG_COLOR: '#EB448C',
        TEXT_COLOR: '#FFFFFF',
        BORDER_COLOR: '#EB448C'
      },
    },
    dark: {
      normal: {
        BG_COLOR: '#EB448C',
        TEXT_COLOR: '#FFFFFF',
        BORDER_COLOR: '#EB448C'
      },
    }
  },
};

export default colors;
