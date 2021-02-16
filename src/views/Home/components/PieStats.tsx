import React from 'react'
import { Card, CardBody, Heading, Text } from '@pieswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getPieAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledPieStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const PieStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getPieAddress())
  const pieSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0

  return (
    <StyledPieStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'Pie Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total PIE Supply')}</Text>
          {pieSupply && <CardValue fontSize="14px" value={pieSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total PIE Burned')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New PIE/block')}</Text>
          <CardValue fontSize="14px" decimals={0} value={25} />
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default PieStats
