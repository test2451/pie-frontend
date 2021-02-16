import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import pieABI from 'config/abi/pie.json'
import woktABI from 'config/abi/weth.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getAddress, getWbnbAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'bonusEndBlock',
    }
  })

  const starts = await multicall(sousChefABI, callsStartBlock)
  const ends = await multicall(sousChefABI, callsEndBlock)

  return poolsWithEnd.map((pieePoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: piePoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStatking = async () => {
  const nonOktPools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.OKT)
  const oktPool = poolsConfig.filter((p) => p.stakingTokenName === QuoteToken.OKT)

  const callsNonOktPools = nonOktPools.map((poolConfig) => {
    return {
      address: poolConfig.stakingTokenAddress,
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const callsOktPools = bnbPool.map((poolConfig) => {
    return {
      address: getWoktAddress(),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const nonOktPoolsTotalStaked = await multicall(pieABI, callsNonOktPools)
  const oktPoolsTotalStaked = await multicall(woktABI, callsOktPools)

  return [
    ...nonOktPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonOktPoolsTotalStaked[index]).toJSON(),
    })),
    ...oktPool.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(oktPoolsTotalStaked[index]).toJSON(),
    })),
  ]
}
