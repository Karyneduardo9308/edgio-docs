import { default as base } from '../base.config';

const DELIVERY = 'Delivery';
const CACHING_DELIVERY = 'Caching and Delivery';
const MEDIAVAULT = 'MediaVault';
const CONTROL = 'Control';
const EDGEPRISM = 'EdgePrism';
const STORAGE = 'Origin Storage';
const MMD_LIVE = 'MMD Live';
const MMD_OD = 'MMD OD';
const LVP = 'LVP';
const LIVE_PUSH = 'Live Push';

const config = {
  ...base,
  DELIVERY,
  CACHING_DELIVERY,
  MEDIAVAULT,
  CONTROL,
  EDGEPRISM,
  STORAGE,
  MMD_Live,
  MMD_OD,
  LVP,
  LIVE_PUSH,

};

export default config;
