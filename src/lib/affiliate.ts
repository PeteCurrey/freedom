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

export function generateEbayProductUrl(productName: string): string {
  const searchQuery = encodeURIComponent(productName);
  const customId = encodeURIComponent(`bom_${productName.toLowerCase().replace(/\s+/g, '_')}`);
  
  return `${EBAY_UK_BASE}?_nkw=${searchQuery}&mkcid=1&mkrid=710-53481-19255-0&siteid=3&campid=${EPN_ID}&customid=${customId}&toolid=10001&mkevt=1`;
}

export function generateProductLink(productName: string, supplierWebsite: string, supplierId: string): string {
  // If the supplier is eBay, use the eBay product search
  if (supplierId === 'ebay-motors-uk') {
    return generateEbayProductUrl(productName);
  }

  // Otherwise, return the supplier's website
  // Future iteration: Add specific referral parameters for partners like Energy Solutions or Fogstar
  return supplierWebsite;
}

const AUTOTRADER_BASE = "https://www.autotrader.co.uk/van-search";

export function generateAutotraderSearchUrl({ vehicleName }: AffiliateParams): string {
  // Extract make and model if possible for better results
  const parts = vehicleName.split(' ');
  const make = parts[0];
  const model = parts.slice(1).join('%20');
  
  // Note: AutoTrader doesn't have a simple "customid" param in the raw search URL, 
  // but we usually route this through their affiliate window (Awin) or similar.
  // For now, we'll generate the direct filtered URL.
  return `${AUTOTRADER_BASE}?make=${make}&model=${model}&postcode=SW1A1AA&radius=1500`;
}
