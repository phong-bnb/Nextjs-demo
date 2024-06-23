"use server"
import { NFT } from '@prisma/client'
import { prisma } from '../../../lib/prisma'
export const SaveNft = (data: Omit<NFT, 'id'>) => {
  "use server"
  return prisma.nFT.create({
    data: {
      ...data
    }
  })
}