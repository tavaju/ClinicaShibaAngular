# Backend API Documentation for Products Service

## Overview
This document outlines the API requirements needed to support the Angular Shop Component in the Clinica Shiba application. The frontend implementation displays pet products in a grid/list view with sorting, filtering, and search capabilities.

## API Endpoints

### GET /api/products
Retrieves all products for the shop.

**Response Format:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "category": "string",
    "image": "string (URL)",
    "rating": "number",
    "inventoryStatus": "string (INSTOCK, LOWSTOCK, OUTOFSTOCK)"
  }
]
```

**Example Response:**
```json
[
  {
    "id": "1",
    "name": "Comida Premium para Perros",
    "description": "Alimento balanceado para perros de todas las edades con ingredientes naturales.",
    "price": 39.99,
    "category": "Alimentos",
    "image": "https://example.com/images/dog-food.jpg",
    "rating": 4.5,
    "inventoryStatus": "INSTOCK"
  }
]
```

## Data Model

### Product
| Field          | Type   | Description                                      | Required |
|----------------|--------|--------------------------------------------------|----------|
| id             | string | Unique identifier for the product                | Yes      |
| name           | string | Name of the product                              | Yes      |
| description    | string | Detailed description of the product              | Yes      |
| price          | number | Price in dollars (should support 2 decimal places)| Yes     |
| category       | string | Product category (e.g., Alimentos, Juguetes)     | Yes      |
| image          | string | URL to the product image (must be a valid URL)   | Yes      |
| rating         | number | Product rating from 0-5 (can include half ratings)| Yes     |
| inventoryStatus| string | Stock status: "INSTOCK", "LOWSTOCK", or "OUTOFSTOCK" | Yes  |

## Business Rules

1. **Inventory Status:**
   - "INSTOCK": Product is available with sufficient quantity
   - "LOWSTOCK": Product is available but quantity is limited
   - "OUTOFSTOCK": Product is currently unavailable

2. **Image URLs:**
   - All product images must be hosted on a secure server
   - Images should be optimized for web (recommended size: 500x500px)
   - Image URLs must be accessible from the frontend application

3. **Sorting Support:**
   The API should support the following sorting options:
   - Price (ascending and descending)
   - Name (alphabetical, ascending and descending)

## Technical Requirements

1. **Performance:**
   - Response time should be under 500ms for retrieving the full product list
   - Pagination may be implemented for large datasets (optional, frontend handles display pagination)

2. **Security:**
   - Implement CORS to allow requests only from the frontend application
   - Rate limiting to prevent abuse
   
3. **Error Handling:**
   - Return appropriate HTTP status codes (200, 400, 404, 500)
   - Include descriptive error messages for troubleshooting

## Implementation Considerations

1. **Cache Strategy:**
   - Consider implementing caching for product data to improve performance
   - Set appropriate cache headers in the response

2. **Future Enhancements:**
   - Plan for additional filtering options by category, price range, etc.
   - Prepare for integration with inventory management system
   - Consider implementing a shopping cart API for order processing

## Sample Product Data
To match the frontend implementation, consider using the following product categories and inventory statuses:

**Categories:**
- Alimentos
- Juguetes
- Accesorios
- Higiene
- Medicamentos
- Camas
- Transportadores

**Example Products:**
```json
[
  {
    "id": "1",
    "name": "Comida Premium para Perros",
    "description": "Alimento balanceado para perros de todas las edades con ingredientes naturales.",
    "price": 39.99,
    "category": "Alimentos",
    "image": "https://example.com/images/dog-food.jpg",
    "rating": 4.5,
    "inventoryStatus": "INSTOCK"
  },
  {
    "id": "2",
    "name": "Correa Retráctil",
    "description": "Correa retráctil de 5 metros con mango ergonómico y sistema de bloqueo.",
    "price": 24.99,
    "category": "Accesorios",
    "image": "https://example.com/images/retractable-leash.jpg",
    "rating": 4,
    "inventoryStatus": "LOWSTOCK"
  },
  {
    "id": "3",
    "name": "Juguete Dental para Perros",
    "description": "Juguete masticable que ayuda a mantener la higiene dental de tu mascota.",
    "price": 12.50,
    "category": "Juguetes",
    "image": "https://example.com/images/dental-toy.jpg",
    "rating": 3.5,
    "inventoryStatus": "OUTOFSTOCK"
  }
]
``` 