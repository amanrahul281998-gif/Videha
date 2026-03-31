# VIDEH API Documentation

## Base URL
```
https://videha.onrender.com/v1
```

## Authentication
All requests (except auth endpoints) require Bearer token:
```
Authorization: Bearer {token}
```

---

## Authentication Endpoints

### 1. Send OTP
**Endpoint:** `POST /auth/send-otp`

**Request:**
```json
{
  "phoneNumber": "9876543210"
}
```

**Response (Success):**
```json
{
  "success": true,
  "sessionId": "sess_abc123",
  "message": "OTP sent successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid phone number"
}
```

---

### 2. Verify OTP
**Endpoint:** `POST /auth/verify-otp`

**Request:**
```json
{
  "sessionId": "sess_abc123",
  "otp": "123456"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "phoneNumber": "9876543210",
    "createdAt": "2026-03-30T10:00:00Z"
  }
}
```

---

## Product Endpoints

### 1. Get All Products
**Endpoint:** `GET /products`

**Query Parameters:**
```
?category=tshirt&page=1&limit=20&sort=price
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "prod_123",
      "name": "Premium Cotton T-Shirt",
      "price": 599,
      "originalPrice": 799,
      "category": "tshirt",
      "rating": 4.5,
      "reviews": 328,
      "image": "https://...",
      "colors": ["#000", "#fff"],
      "sizes": ["XS", "S", "M", "L", "XL"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

---

### 2. Get Product Detail
**Endpoint:** `GET /products/{id}`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "prod_123",
    "name": "Premium Cotton T-Shirt",
    "description": "...",
    "price": 599,
    "originalPrice": 799,
    "discount": 25,
    "rating": 4.5,
    "reviews": [
      {
        "userId": "user_456",
        "rating": 5,
        "comment": "Great quality!",
        "date": "2026-03-28"
      }
    ],
    "images": ["https://..."],
    "colors": ["#000", "#fff"],
    "sizes": ["XS", "S", "M", "L"],
    "inStock": true,
    "specifications": {
      "material": "100% Cotton",
      "care": "Machine wash"
    }
  }
}
```

---

### 3. Search Products
**Endpoint:** `GET /products/search`

**Query Parameters:**
```
?q=cotton&category=apparel
```

**Response:** Same as Get All Products

---

### 4. Get Categories
**Endpoint:** `GET /categories`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cat_1",
      "name": "T-Shirts",
      "slug": "tshirts",
      "image": "https://..."
    },
    {
      "id": "cat_2",
      "name": "Jeans",
      "slug": "jeans",
      "image": "https://..."
    }
  ]
}
```

---

## Cart Endpoints

### 1. Get Cart
**Endpoint:** `GET /cart`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cart_123",
    "items": [
      {
        "productId": "prod_123",
        "name": "Premium Cotton T-Shirt",
        "price": 599,
        "quantity": 2,
        "size": "M",
        "color": "#000",
        "total": 1198
      }
    ],
    "subtotal": 1198,
    "discount": 120,
    "total": 1078
  }
}
```

---

### 2. Add to Cart
**Endpoint:** `POST /cart/add`

**Request:**
```json
{
  "productId": "prod_123",
  "quantity": 2,
  "size": "M",
  "color": "#000"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product added to cart",
  "cartCount": 3
}
```

---

### 3. Remove from Cart
**Endpoint:** `DELETE /cart/{productId}`

**Query Parameters:**
```
?size=M&color=%23000
```

**Response:**
```json
{
  "success": true,
  "message": "Product removed from cart"
}
```

---

### 4. Update Cart Item
**Endpoint:** `PUT /cart/{productId}`

**Request:**
```json
{
  "quantity": 5,
  "size": "L"
}
```

---

## Order Endpoints

### 1. Create Order
**Endpoint:** `POST /orders`

**Request:**
```json
{
  "items": [
    {
      "productId": "prod_123",
      "quantity": 2,
      "size": "M",
      "color": "#000"
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "phone": "9876543210",
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "paymentMethod": "card"
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "order_123",
    "orderNumber": "VID-2026-001",
    "status": "pending",
    "total": 1078,
    "createdAt": "2026-03-30T10:00:00Z"
  }
}
```

---

### 2. Get Orders
**Endpoint:** `GET /orders`

**Query Parameters:**
```
?status=completed&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "order_123",
      "orderNumber": "VID-2026-001",
      "status": "delivered",
      "total": 1078,
      "createdAt": "2026-03-30",
      "items": 2
    }
  ]
}
```

---

### 3. Get Order Detail
**Endpoint:** `GET /orders/{orderId}`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "order_123",
    "orderNumber": "VID-2026-001",
    "status": "shipped",
    "items": [...],
    "shippingAddress": {...},
    "tracking": {
      "carrier": "FedEx",
      "trackingNumber": "123456789",
      "estimatedDelivery": "2026-04-02"
    },
    "timeline": [
      {
        "status": "ordered",
        "date": "2026-03-30"
      },
      {
        "status": "processing",
        "date": "2026-03-31"
      }
    ]
  }
}
```

---

## User Endpoints

### 1. Get Profile
**Endpoint:** `GET /user/profile`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "phoneNumber": "9876543210",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "profileImage": "https://...",
    "createdAt": "2026-03-30"
  }
}
```

---

### 2. Update Profile
**Endpoint:** `PUT /user/profile`

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
}
```

---

### 3. Get Addresses
**Endpoint:** `GET /user/addresses`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "addr_123",
      "name": "Home",
      "address": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "isDefault": true
    }
  ]
}
```

---

### 4. Add Address
**Endpoint:** `POST /user/addresses`

**Request:**
```json
{
  "name": "Office",
  "address": "456 Business Ave",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400002",
  "isDefault": false
}
```

---

## Payment Endpoints

### 1. Initiate Payment
**Endpoint:** `POST /payments/initiate`

**Request:**
```json
{
  "orderId": "order_123",
  "amount": 1078,
  "paymentMethod": "card",
  "currency": "INR"
}
```

**Response:**
```json
{
  "success": true,
  "paymentId": "pay_123",
  "order_id": "order_123",
  "amount": 1078,
  "currency": "INR",
  "status": "created"
}
```

---

### 2. Verify Payment
**Endpoint:** `POST /payments/verify`

**Request:**
```json
{
  "paymentId": "pay_123",
  "signature": "signature_from_gateway"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified",
  "orderId": "order_123"
}
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Invalid input",
  "errors": {
    "phoneNumber": "Must be 10 digits"
  }
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Rate Limiting

- **Auth endpoints:** 5 requests per minute
- **Other endpoints:** 100 requests per minute
- **Header:** `X-RateLimit-Remaining`

---

## Pagination

All list endpoints support:
- `page` (default: 1)
- `limit` (default: 20, max: 100)

---

## Sorting

- `sort=price` - Ascending
- `sort=-price` - Descending
- `sort=rating` - By rating
- `sort=newest` - Newest first

---

## Filters

Supported filters:
- `category` - Product category
- `priceMin` - Minimum price
- `priceMax` - Maximum price
- `rating` - Minimum rating
- `inStock` - true/false

---

**Last Updated:** March 30, 2026  
**Version:** 1.0.0
