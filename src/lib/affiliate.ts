/**
 * Affiliate Utility - Amplios
 * 
 * Generates tracked referral URLs for the eBay Partner Network (EPN).
 */

const EBAY_UK_BASE = "https://www.ebay.co.uk/sch/i.html";
const EPN_ID = process.env.NEXT_PUBLIC_EBAY_CAMPID || "5339063717"; // Placeholder EPN Campaign ID

interface AffiliateParams {
  vehicleName: string;
  category?: string;
}

export function generateEbaySearchUrl({ vehicleName, category = "Van" }: AffiliateParams): string {
  const searchQuery = encodeURIComponent(`${vehicleName} ${category}`);
  const customId = encodeURIComponent(`diym_${vehicleName.toLowerCase().replace(/\s+/g, '_')}`);
  
  // Standard EPN format for UK eBay Motors search
  return `${EBAY_UK_BASE}?_nkw=${searchQuery}&mkcid=1&mkrid=710-53481-19255-0&siteid=3&campid=${EPN_ID}&customid=${customId}&toolid=10001&mkevt=1`;
}
