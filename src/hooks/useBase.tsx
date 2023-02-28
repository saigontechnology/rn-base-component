import {useContext} from 'react'
import {BaseContext, IBaseContext} from '../core/BaseProvider'

export const useBase = () => {
  const base = useContext(BaseContext)

  if (!base) {
    throw Error('`base` is undefined. Seems you forgot to wrap your app in `<BaseProvider />`')
  }

  return base as IBaseContext
}
