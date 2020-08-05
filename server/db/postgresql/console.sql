DROP TABLE Products CASCADE;
DROP TABLE Manufacturers, Groups;

CREATE TABLE Manufacturers
(
    id          serial PRIMARY KEY,
    manuf_name  varchar(128) UNIQUE NOT NULL,
    manuf_email varchar(128) UNIQUE NOT NULL CHECK ( manuf_email ~ '^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$')
);
CREATE TABLE Groups
(
    id          serial PRIMARY KEY,
    group_title varchar(128) UNIQUE NOT NULL
);
CREATE TABLE Products
(
    id        serial PRIMARY KEY,
    prod_name varchar(128) NOT NULL,
    price     money CHECK ( price > 0::money ),
    manuf_id  integer      REFERENCES Manufacturers (id) ON UPDATE CASCADE ON DELETE SET NULL,
    group_id  integer      REFERENCES Groups (id) ON UPDATE CASCADE ON DELETE SET NULL
);

insert into Groups (group_title)
values ('Bread'),
       ('Cheese'),
       ('Vegetables'),
       ('Nuts'),
       ('Meat');

insert into Manufacturers (manuf_name, manuf_email)
values ('Robel and Sons', 'fpinkstone0@macromedia.com'),
       ('Ankunding, Raynor and Gleason', 'cduffie1@boston.com'),
       ('Ankunding Inc', 'astickler2@symantec.com'),
       ('Walker Inc', 'hkemmons3@europa.eu'),
       ('Emard, Pacocha and Jerde', 'agarlicke4@gizmodo.com'),
       ('Adams-Reilly', 'wpetrusch5@amazonaws.com'),
       ('Eichmann and Sons', 'geasterby6@economist.com'),
       ('Deckow, Bailey and Klein', 'pbarfield7@opensource.org'),
       ('Zulauf Group', 'rcowope8@blinklist.com'),
       ('Batz-Zemlak', 'jarman9@technorati.com');

insert into Products (prod_name, price, manuf_id, group_id)
values ('Tomatoes - Orange', 1465, 2, 2),
       ('Scallop - St. Jaques', 772, 8, 3),
       ('V8 - Vegetable Cocktail', 277, 4, 2),
       ('Turkey - Breast, Boneless Sk On', 1187, 1, 5),
       ('Wine - Red, Metus Rose', 266, 10, 4),
       ('Spoon - Soup, Plastic', 783, 5, 2),
       ('Tea - Lemon Green Tea', 1398, 3, 5),
       ('Artichokes - Knobless, White', 1561, 1, 4),
       ('Jolt Cola', 855, 9, 4),
       ('Wine - Magnotta - Red, Baco', 713, 1, 2),
       ('Bonito Flakes - Toku Katsuo', 1286, 1, 5),
       ('Bar Energy Chocchip', 383, 8, 5),
       ('Pastry - Apple Muffins - Mini', 1672, 5, 3),
       ('Beef - Outside, Round', 1828, 5, 1),
       ('Chocolate - Mi - Amere Semi', 1380, 6, 1),
       ('Nantucket Apple Juice', 913, 2, 2),
       ('Fenngreek Seed', 618, 8, 5),
       ('Shrimp - Black Tiger 16/20', 1233, 5, 3),
       ('Chicken - Base', 732, 10, 1),
       ('Cheese - Swiss', 1056, 4, 3),
       ('Wine - Red, Pinot Noir, Chateau', 1848, 8, 2),
       ('Appetizer - Lobster Phyllo Roll', 1657, 8, 5),
       ('Wine - Remy Pannier Rose', 1887, 8, 3),
       ('Tobasco Sauce', 313, 4, 1),
       ('Scallop - St. Jaques', 279, 6, 5),
       ('Bananas', 792, 6, 4),
       ('Oil - Shortening - All - Purpose', 1715, 5, 1),
       ('Breakfast Quesadillas', 774, 9, 2),
       ('Fireball Whisky', 1171, 8, 3),
       ('Mix - Cocktail Ice Cream', 961, 5, 1),
       ('Taro Leaves', 703, 8, 2),
       ('Breadfruit', 1284, 10, 5),
       ('Wine - Red Oakridge Merlot', 210, 2, 5),
       ('Quail - Jumbo', 1443, 7, 3),
       ('Trout Rainbow Whole', 1824, 9, 1),
       ('French Kiss Vanilla', 744, 4, 2),
       ('Cinnamon - Stick', 1931, 8, 4),
       ('Water - Tonic', 1152, 6, 2),
       ('Bread - Multigrain', 501, 3, 2),
       ('Towels - Paper / Kraft', 1651, 4, 5);

--удалить товар
DELETE
FROM Products
WHERE id = 1;
--обновить инфу
UPDATE Products
SET prod_name = 'New Product'
WHERE id = 2;
--вывести товары по конкретному производителю
SELECT prod_name, price
FROM products
         JOIN Manufacturers M on Products.manuf_id = M.id
WHERE manuf_name = 'Walker Inc'
ORDER BY prod_name ASC;
--товары дороже 1000 грн
SELECT prod_name, price
FROM products
WHERE price > 1000::money
ORDER BY price DESC;
--товары дешевле 500 грн
SELECT prod_name, price
FROM products
WHERE price < 500::money
ORDER BY price DESC;
--товары определенной категории
SELECT prod_name, price
FROM products
         JOIN Groups G on Products.group_id = G.id
WHERE group_title = 'Nuts';
--view
CREATE VIEW All_data
AS SELECT group_title, manuf_name, prod_name,price
FROM products
JOIN Groups G on Products.group_id = G.id
JOIN Manufacturers M on Products.manuf_id = M.id
GROUP BY group_title, manuf_name, prod_name, price;

SELECT * FROM All_data;



