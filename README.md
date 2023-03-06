# Merch Store

## About

Merch store is a full stack Ecommerce website to buy and sell University clothes.

## Implemented Features

- Home page with Product Carousel to display highly rated products and Latest products with built-in pagination
- Added search bar to search for a particular product
- Product page with an ability to add an item to the cart if there is a sufficient quantity
- Checkout process involves 4 steps, Login or Sign up, adding shipping information, payment and placing the order
- To successfully place an order, new users need to register or existinf users need to login
- Payment integration is done with Paypal and Debit or credit card options
- Order page displays order number, shipping information, delivery and payment status and order summary including different prices
- Admin accounts have access to all the users, products and orders. They can edit, delete or add new users, products and orders

## Setup

1. The first step is to clone the repository:
   ``` 
   git clone https://github.com/mitalibhandari/merchstore.git 
   ```
2. Install requirements 
3. Navigate to the merchstore folder and then to backend
    ```
    cd merchstore/backend
    ```
4. Start the server
    ```
    python manage.py runserver 
    ```

