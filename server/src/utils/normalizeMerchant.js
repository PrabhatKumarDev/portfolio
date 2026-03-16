const normalizeMerchant = (merchant) => {
  return merchant.trim().toLowerCase().replace(/\s+/g, " ");
};

export default normalizeMerchant;