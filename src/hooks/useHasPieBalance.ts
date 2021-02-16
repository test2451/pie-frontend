import { getPieAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's PIE balance is at least the amount passed in
 */
const useHasPieBalance = (minimumBalance) => {
  const pieBalance = useTokenBalance(getPieAddress())
  return pieBalance.gte(minimumBalance)
}

export default useHasPieBalance
