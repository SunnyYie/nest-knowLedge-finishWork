import { Proposal } from '../entities/proposal.entity'

export type CreateProposalDto = Proposal
export type UpdateProposalDto = Partial<Proposal>
export type SearchProposalDto = Partial<Proposal>
export type HttpProposalDto = Proposal

// 一级分类
export type OneSubjectType = {
  name: string
  key: string
}[]
