import {useContext} from 'react'
import {BaseContext} from 'src/core/ThemeProvider'

export const useBase = () => {
  const base = useContext(BaseContext)

  if (!base) {
    throw Error('`base` is undefined. Seems you forgot to wrap your app in `<BaseProvider />`')
  }

  return base
}
