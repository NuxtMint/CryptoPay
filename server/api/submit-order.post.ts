import { defineEventHandler, createError } from 'h3';
import { CryptoType } from '~/config/crypto';
import Airtable from 'airtable';
import { airtableConfig } from '~/config/airtable';

type PackageType = 'basic' | 'premium';

// Initialize Airtable with proper error handling
const initAirtable = () => {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    throw createError({
      statusCode: 500,
      message: 'Airtable configuration missing',
    });
  }

  return new Airtable({ apiKey }).base(baseId);
};

// Define the expected request body type
interface OrderRequest {
  orderId: string;
  plan: PackageType;
  paymentMethod: 'crypto' | 'bank';
  cryptoType?: CryptoType;
  cryptoAmount?: number;
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<OrderRequest>(event);

    // Enhanced validation
    if (!body.orderId?.trim()) {
      throw createError({
        statusCode: 400,
        message: 'Order ID is required',
      });
    }

    if (!body.plan || !['basic', 'premium'].includes(body.plan)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid plan selected',
      });
    }

    if (
      !body.paymentMethod ||
      !['crypto', 'bank'].includes(body.paymentMethod)
    ) {
      throw createError({
        statusCode: 400,
        message: 'Invalid payment method',
      });
    }

    // Validate crypto-specific fields if crypto payment is selected
    if (body.paymentMethod === 'crypto') {
      if (
        !body.cryptoType ||
        !['btc', 'eth', 'sol', 'matic'].includes(body.cryptoType)
      ) {
        throw createError({
          statusCode: 400,
          message: 'Invalid crypto type',
        });
      }
      if (!body.cryptoAmount || body.cryptoAmount <= 0) {
        throw createError({
          statusCode: 400,
          message: 'Invalid crypto amount',
        });
      }
    }

    // Initialize Airtable inside the try block
    const base = initAirtable();

    // Store order in Airtable with better error handling
    try {
      await base(airtableConfig.table).create([
        {
          fields: {
            'Order ID': body.orderId,
            Plan: body.plan,
            'Payment Method': body.paymentMethod,
            'Crypto Type': body.cryptoType || '',
            'Crypto Amount': body.cryptoAmount?.toString() || '',
            'Created At': new Date().toISOString(),
          },
        },
      ]);
    } catch (airtableError: any) {
      console.error('Detailed Airtable error:', {
        message: airtableError.message,
        error: airtableError.error,
        statusCode: airtableError.statusCode,
        details: airtableError.response?.data, // Additional error details if available
        stack: airtableError.stack,
      });

      throw createError({
        statusCode: airtableError.statusCode || 500,
        message: `Failed to store order data: ${airtableError.message}`,
      });
    }

    return {
      success: true,
      message: 'Order submitted successfully',
      orderId: body.orderId,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error('Order submission error:', {
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack,
      statusCode: error.statusCode,
    });

    const statusCode = error.statusCode || 500;
    event.node.res.statusCode = statusCode;

    return {
      success: false,
      message: error.message || 'Internal server error',
      code: statusCode,
    };
  }
});
