import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getProfileContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useToast } from 'state/hooks'

const useGetProfileCosts = () => {
  const [costs, setCosts] = useState({
    numberPieToReactivate: new BigNumber(0),
    numberPieToRegister: new BigNumber(0),
    numberPieToUpdate: new BigNumber(0),
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const profileContract = getProfileContract()
        const [numberPieToReactivate, numberPieToRegister, numberPieToUpdate] = await makeBatchRequest([
          profileContract.methods.numberPieToReactivate().call,
          profileContract.methods.numberPieToRegister().call,
          profileContract.methods.numberPieToUpdate().call,
        ])

        setCosts({
          numberPieToReactivate: new BigNumber(numberPieToReactivate as string),
          numberPieToRegister: new BigNumber(numberPieToRegister as string),
          numberPieToUpdate: new BigNumber(numberPieToUpdate as string),
        })
      } catch (error) {
        toastError('Error', 'Could not retrieve Pie costs for profile')
      }
    }

    fetchCosts()
  }, [setCosts, toastError])

  return costs
}

export default useGetProfileCosts
