import { google } from 'googleapis';
import { supabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

/**
 * Google Content API for Shopping Integration
 * Handles real-time product synchronization
 */

export async function syncProductToGMC(productId: string) {
  try {
    let merchantId: string | undefined;
    let serviceAccountJson: string | undefined;

    // 1. Check for local credentials override (useful for dev or if DB is not set)
    const localCredsPath = path.resolve(process.cwd(), 'src/config/gmc-credentials.json');
    if (fs.existsSync(localCredsPath)) {
      const localCreds = JSON.parse(fs.readFileSync(localCredsPath, 'utf8'));
      merchantId = localCreds.merchant_id;
      serviceAccountJson = JSON.stringify(localCreds.service_account_json);
    }

    // 2. If not found locally, fetch from Supabase
    if (!merchantId || !serviceAccountJson) {
      const { data: settings } = await supabase
        .from('integrations')
        .select('config')
        .eq('id', 'gmc')
        .single();
      
      merchantId = settings?.config?.merchant_id;
      serviceAccountJson = settings?.config?.service_account_json;
    }

    if (!merchantId || !serviceAccountJson) {
      console.warn("GMC Integration not fully configured. Skipping real-time sync.");
      return null;
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(serviceAccountJson),
      scopes: ['https://www.googleapis.com/auth/content'],
    });

    const content = google.content({
      version: 'v2.1',
      auth,
    });

    // 2. Fetch Product Data
    const { data: product } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (!product || product.status !== 'active') {
      // If inactive or deleted, remove from GMC
      await content.products.delete({
        merchantId: config.merchant_id,
        productId: `online:en:GB:${productId}`,
      });
      return { success: true, action: 'deleted' };
    }

    // 3. Map to Google Product Schema
    const price = (product.price_gbp / 100).toFixed(2);
    const images = Array.isArray(product.images) ? product.images : [];
    const imageUrl = images[0] ? (images[0].startsWith('http') ? images[0] : `https://amplios.co.uk${images[0]}`) : '';
    
    const googleProduct = {
      offerId: product.id,
      title: product.name,
      description: product.meta_description || product.short_description || product.name,
      link: `https://amplios.co.uk/store/product/${product.slug}`,
      imageLink: imageUrl,
      contentLanguage: 'en',
      targetCountry: 'GB',
      channel: 'online',
      availability: product.stock_quantity > 0 ? 'in stock' : 'out of stock',
      condition: 'new',
      price: {
        value: price,
        currency: 'GBP',
      },
      brand: product.brand || 'Amplios',
      gtin: product.gtin || '',
      mpn: product.mpn || product.sku || product.internal_sku || '',
      googleProductCategory: 'Vehicles & Parts > Vehicle Parts & Accessories > Motor Vehicle Parts',
      shipping: [
        {
          country: 'GB',
          price: { value: '0.00', currency: 'GBP' },
        },
      ],
    };

    // 4. Push to Content API
    const response = await content.products.insert({
      merchantId: config.merchant_id,
      requestBody: googleProduct,
    });

    return { success: true, action: 'synced', data: response.data };
  } catch (error: any) {
    console.error("GMC Sync Error:", error.message);
    return { success: false, error: error.message };
  }
}
