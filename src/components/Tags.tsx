import React from 'react'
import { Tag, VerifiedIcon, CommunityIcon, OkexIcon } from '@pieswap-libs/uikit'

const CoreTag = () => (
  <Tag variant="secondary" outline startIcon={<VerifiedIcon />}>
    Core
  </Tag>
)

const CommunityTag = () => (
  <Tag variant="textSubtle" outline startIcon={<CommunityIcon />}>
    Community
  </Tag>
)

const OkexTag = () => (
  <Tag variant="okex" outline startIcon={<OkexIcon />}>
    Okex
  </Tag>
)

export { CoreTag, CommunityTag, OkexTag }
