import base from '../base'
import type {ViewStyle} from 'react-native'
import type {IFontWeight} from '../base/typography'

export interface AccordionThemeProps {
  // Container styles
  container: {
    paddingBottom: number
    overflow: ViewStyle['overflow']
  }

  // Header styles
  header: {
    padding: number
  }

  // Title/Text styles
  title: {
    fontSize: number
    textAlign: 'center' | 'left' | 'right' | 'justify'
    color: string
    fontWeight: IFontWeight
  }

  // Content/Body styles
  body: {
    padding: number
    justifyContent: ViewStyle['justifyContent']
    alignItems: ViewStyle['alignItems']
  }

  // Animation settings
  animation: {
    openDuration: number
    closeDuration: number
  }

  // Interactive styles
  interactive: {
    activeOpacity: number
  }
}

export const AccordionTheme: AccordionThemeProps = {
  container: {
    paddingBottom: base.spacing.petite,
    overflow: 'hidden',
  },

  header: {
    padding: base.spacing.compact,
  },

  title: {
    fontSize: base.fontSizes.xl,
    textAlign: 'center',
    color: base.colors.amber,
    fontWeight: 'bold',
  },

  body: {
    padding: base.spacing.compact,
    justifyContent: 'center',
    alignItems: 'center',
  },

  animation: {
    openDuration: 300,
    closeDuration: 300,
  },

  interactive: {
    activeOpacity: 0.7,
  },
}
