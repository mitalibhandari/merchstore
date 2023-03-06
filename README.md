# Merch Store

## About

Merch store is a full stack Ecommerce website to buy and sell University clothes.

## Implemented Features

- Home page with Product Carousel to display highly rated products and Latest products with built-in pagination
- Added search bar to search for a particular product
![Screenshot 2023-03-06 at 2 07 16 PM](https://user-images.githubusercontent.com/84052591/223219145-9afb4a07-643d-4bd8-a3f9-64e206408a10.png)

- Product page with an ability to add an item to the cart if there is a sufficient quantity
![Screenshot 2023-03-06 at 2 09 08 PM](https://user-images.githubusercontent.com/84052591/223219451-bea5ae0a-ce52-4d77-a59e-2f6bb4a92071.png)

- Users can provide rating and reviews to any products
![Screenshot 2023-03-06 at 2 10 18 PM](https://user-images.githubusercontent.com/84052591/223219651-eae437f2-654b-4021-968c-2f4c9c18a667.png)

- Checkout process involves 4 steps, Login or Sign up, adding shipping information, payment and placing the order
- To successfully place an order, new users need to register or existing users need to login
![Screenshot 2023-03-06 at 2 11 23 PM](https://user-images.githubusercontent.com/84052591/223220041-4a6117cb-82c6-40d4-bd0d-c307ae8e3672.png)
![Screenshot 2023-03-06 at 2 11 45 PM](https://user-images.githubusercontent.com/84052591/223220060-0140a11e-4d83-462d-b273-a32f41a1ea73.png)
![Screenshot 2023-03-06 at 2 11 58 PM](https://user-images.githubusercontent.com/84052591/223220088-59b84377-2b3d-47ed-b3a3-b3c387b7e1de.png)
![Screenshot 2023-03-06 at 2 12 10 PM](https://user-images.githubusercontent.com/84052591/223220111-223b0abe-6a7c-4e05-a1c0-51afd7bfeb5d.png)

- Payment integration is done with Paypal and Debit or credit card options
- Order page displays order number, shipping information, delivery and payment status and order summary including different prices
![Screenshot 2023-03-06 at 2 12 25 PM](https://user-images.githubusercontent.com/84052591/223220171-f6a8cdbf-d53c-497a-b4fc-68b4e3b702fb.png)

- Admin accounts have access to all the users, products and orders. They can edit, delete or add new users, products and orders
![Screenshot 2023-03-06 at 2 13 31 PM](https://user-images.githubusercontent.com/84052591/223220364-d5471120-a540-4b76-a853-2bee54b517b9.png)


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

