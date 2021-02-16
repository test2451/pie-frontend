import { getPieProfileAddress, getPaieRabbitsAddress, getRabbitMintingFarmAddress } from 'utils/addressHelpers'
import { getContract } from 'utils/web3'
import profileABI from 'config/abi/pieProfile.json'
import pieRabbitsAbi from 'config/abi/pieRabbits.json'
import rabbitMintingFarmAbi from 'config/abi/rabbitmintingfarm.json'

export const getProfileContract = () => {
  return getContract(profileABI, getPieProfileAddress())
}

export const getPieRabbitContract = () => {
  return getContract(pieRabbitsAbi, getPieRabbitsAddress())
}

export const getRabbitMintingContract = () => {
  return getContract(rabbitMintingFarmAbi, getRabbitMintingFarmAddress())
}

export default null
