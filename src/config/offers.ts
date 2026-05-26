/** Public offer shape — sourced from database only. */
export type OfferItem = {
  id: string;
  offerCode: string;
  title: string;
  description: string;
  priceLabel: string;
  oldPriceLabel?: string;
  image: string;
  badge?: string;
};
