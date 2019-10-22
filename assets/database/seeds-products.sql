-- Using Database
USE bamazon_db;

-- SEEDING DATABASE WITH INFO
INSERT INTO products (name, department, price, quantity)
VALUES 
    -- Item 01
    ( "Apple Barrel Acrylics - Assorted Colors (18 pack)", "Arts and Crafts", 17.99, 53 ), 
    -- Item 02
    ( "BamazonBasics Blue and Yellow Microfiber Cleaning Cloth, 24-Pack", "Automotive", 12.81, 2 ), 
    -- Item 03
    ( "Q-tips Cotton Swabs, 750 ct", "Beauty and Personal Care", 4.64, 87 ),
    -- Item 04
    ( "Me: Elton John Official Autobiography", "Clothing", 17.60, 68 ), 
    -- Item 05
    ( "Hanes Men's Pullover EcoSmart Fleece Hooded Sweatshirt" ,"Education", 11.20, 38 ), 
    -- Item 06
    ( "Roku Express | Easy High Definition (HD) Streaming Media Player", "Electronics", 26.99, 41), 
    -- Item 07
    ( "Mellanni Sheet Set - 3 Piece (Twin, Baby Blue)", "Home and Kitchen", 27.00, 45 ), 
    -- Item 08
    ( "Hydro Flask Wide Mouth Water Bottle, Straw Lid - Multiple Sizes & Colors", "Sports and Outdoors", 44.95, 4 ), 
    -- Item 09
    ( "Affresh Washer Machine Cleaner, 6-Tablets, 8.4 oz", "Tools & Home Improvement", 11.99, 75 ), 
    -- Item 10
    ( "$10 PlayStation Store Gift Card [Digital Code]", "Toys and Games", 10.00, 22 );

-- Just for viewing purposes
SELECT * FROM products; 