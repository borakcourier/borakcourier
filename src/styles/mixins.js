import {Dimensions,PixelRatio} from 'react-native';

const { width, height } = Dimensions.get('window')

// export const BASE_WIDTH = width < 520 ? width : 520 
export const BASE_WIDTH = width 

const WINDOW_WIDTH = Dimensions.get('window').width;
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scaleHorizontal = (size, maxWidth) => ((maxWidth ? maxWidth : width)/guidelineBaseWidth) * size;

export const scaleFont = size => size * PixelRatio.getFontScale();

export const scaleVertical = (size, maxHeight) => ((maxHeight ? maxHeight : height)/guidelineBaseHeight) * size;






