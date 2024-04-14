import mysql.connector

# Database connection configuration
config = {
    'user': 's104177995',
    'password': '180804',
    'host': 'feenix-mariadb.swin.edu.au',
    'database': 's104177995_db'
}

# Create a connection to the database
cnx = mysql.connector.connect(**config)

# Create a cursor object
cursor = cnx.cursor()

# SQL queries to create the tables
tables = {}

tables['user_info'] = (
    "CREATE TABLE IF NOT EXISTS user_info ("
    "  username VARCHAR(255) PRIMARY KEY,"
    "  password VARCHAR(255) NOT NULL,"
    "  email VARCHAR(255) UNIQUE NOT NULL,"
    "  balance DECIMAL(10, 4),"
    "  user_blockchain_id VARCHAR(255) UNIQUE"
    ") ENGINE=InnoDB")

tables['product'] = (
    "CREATE TABLE IF NOT EXISTS product ("
    "  image VARCHAR(255) NOT NULL,"
    "  title VARCHAR(255) NOT NULL,"
    "  price DECIMAL(10, 2) NOT NULL,"
    "  description TEXT,"
    "  nft_token_id VARCHAR(255) PRIMARY KEY,"
    "  owner_blockchain_id VARCHAR(255),"
    "  FOREIGN KEY (owner_blockchain_id) REFERENCES user_info(user_blockchain_id)"
    ") ENGINE=InnoDB")

# Create each table
for table_name in tables:
    table_description = tables[table_name]
    try:
        print("Creating table {}: ".format(table_name), end='')
        cursor.execute(table_description)
    except mysql.connector.Error as err:
        if err.errno == mysql.connector.errorcode.ER_TABLE_EXISTS_ERROR:
            print("already exists.")
        else:
            print(err.msg)
    else:
        print("OK")

# Data to be inserted
data_user = [
    ("abuncombe0", "mL2~}I<z6x6W", "mward0@4shared.com", 100, "08-198-0807"),
    ("fpyne1", "rE0<BuW19cNutQJh", "cbreward1@cafepress.com", 100, "48-728-3727"),
    ("ecoghlan2", "xT4&HS.>uv$kP@", "rcanto2@php.net", 100, "89-467-8114"),
    ("areiglar3", "pU8\"cJUcykDkbUc", "mswanton3@reddit.com", 100, "42-756-0746"),
    ("pslafford4", "bA1!br4ZaA7", "gsaylor4@usgs.gov", 100, "28-930-8623"),
    ("gfleckness5", "gE7{{+drb*CCwb7U", "jtampling5@jiathis.com", 100, "72-783-1511"),
    ("lcoleson6", "eI6+o5UZ", "dtedman6@umn.edu", 100, "41-801-8415"),
    ("lmarl7", "lX2>H>p5L\"eF9", "sflear7@istockphoto.com", 100, "40-393-4278"),
    ("bstarkings8", "wG3!`E.Vp", "htoy8@unicef.org", 100, "20-109-3675"),
    ("erudge9", "dJ4+A4MA'6p", "rtukely9@shop-pro.jp", 100, "49-836-0912")
]

data_product =[
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihYzXjRrdk-lWAK4B0gihZ69J9GP2SvPgD4bSV9UpWkRei8lTXtQiYcPuzOOwpmWjO24cKF2V8dnnw979NMO3XL04CHozQ=s2560", "2006-07 Liverpool Home Shirt Alonso #14", "0.2", "2006-07 Liverpool Home Shirt Alonso #14 #premierleague", "1", "08-198-0807"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpiha-APyEzu9oAtOseXvFyGAnGpc8tVIQGI7ep4dl21qiFRoJoaMSrCnOFhIJgqJXO76DFtPCo32hWW-k1TGwzhxmNsF6=s2560", "2004 Italy Home Shirt Baggio #10", "0.18", "2004 Italy Home Shirt Baggio #10 #nationalteams", "2", "48-728-3727"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpiha7oKTwBq5AbkrDjQ_QF9lsmbivTZX1qz70RXF-Dhz55rSGhDJ7Hkv8XxybTrRlPp0AjhHK7KSZxB1ZS0eP9eaWv9Gw=s2560", "1988 Netherlands Home Shirt Van Basten #12", "0.25", "1988 Netherlands Home Shirt Van Basten #12 #nationalteams", "3", "89-467-8114"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihaWe4s9w-LU_6O7IYKYjBEk0CvcTS8Arosnd3ycXj1TsUyacdUz9ZVx0OLewlTYg-ds9c1BIaZeXyxaTOzUUENL30cy=s2560", "2002 England Home Shirt Beckham #7", "0.3", "2002 England Home Shirt Beckham #7 #nationalteams", "4", "42-756-0746"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihaYGBqivtni9jPzYglqzXiq-svNO2aGRcBj4Y3qEkErXoFlq7b09nQ7_ClbGVWRZCS-Td-dy-1LWt7wC_0iLW7EbgmgSA=s2560", "2003-04 Arsenal Home Shirt Bergkamp #10", "0.22", "2003-04 Arsenal Home Shirt Bergkamp #10 #premierleague", "5", "28-930-8623"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihbd7JRRKEPI1ny_H1MyYB1J5ej2AexXGTGnlGHe8EOPnDqbeRkGqYLaIbLE7ujU8usPCYki99os3S3g61lBbbwWzKFwYQ=s2560", "1970 Brazil Home Shirt Cafu #2", "0.19", "1970 Brazil Home Shirt Cafu #2 #nationalteams", "6", "72-783-1511"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihbLbxh-IlOldtTRK8TvH9K5iAnR5-ZWTmJfZKz98Kgvhd36R5ggz8tvj8Yi8sno1N4OFbz_8a3jO2mBOnOS4fCV-95Ctg=s2560", "2011-12 Chelsea Home Shirt Drogba #11", "0.11", "2011-12 Chelsea Home Shirt Drogba #11 #premierleague", "7", "41-801-8415"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihZgMw0HS1MvnGxtZ41mvQ3IasK6P6DBZNF_7k-OeK-rVXvLLD4mzNK6xUC6AV3K1wt0bHG0pxpx99b7DpruFTOfjE-xoA=s2560", "2013-14 Barcelona Home Shirt Iniesta #8", "0.15", "2013-14 Barcelona Home Shirt Iniesta #8 #laliga", "8", "40-393-4278"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihZuM9zyKzMNLgx_mNP6oHHUcZfTjf3cDwRmJUX6_JtkTjGYHITDYmOH7-KRoPQHckvHvIIwAUZ-9q9fyBoDUENd4WO-_Q=s2560", "1990 Germany Home Shirt Matthaus #10", "0.16", "1990 Germany Home Shirt Matthaus #10 #nationalteams", "9", "20-109-3675"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihaCPpeZNLdXEMYX04IEoDLrbK7Uy5nfURsKo3vnOTDO4e9nT_wbeT_nb_nbHhg0jh__qBrfc5faXNKEmf5oXCUubYf_tw=s2560", "2022-23 PSG Home Shirt Mbappe #7", "0.27", "2022-23 PSG Home Shirt Mbappe #7 #ligue1", "10", "49-836-0912"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihZLBBRjve4aw5WvKyieNT6ePMOxOZYqsyasW11vGh_lYsslQqm1qYka1Zsqf08_kx1T6zykPUh1Oy25JVWf40DBnh7npA=s2560", "2022 Argentina Home Shirt Messi #10", "0.32", "2022 Argentina Home Shirt Messi #10 #nationalteams", "11", "08-198-0807"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihaJZqtXqrRzANfmTXBn19leh0bfm-WfoNsFl7lFnMufVJO3YxvYHkDEoicZUssgNc3vTH8_JfSGMc8MnU7A-8pN1m4pOQ=s1600", "2012-13 Manchester United Home Shirt Van Persie #20", "0.4", "2012-13 Manchester United Home Shirt Van Persie #20 #premierleague", "12", "48-728-3727"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpiha6YoFCyltYXErUE301ajxHoI29tMvnb-AKP5UdbK2STVYmYv3oN6oYipLOF7s6Lx8SqCY3-oFmt3Ofo5HyvP5Pe-xXNQ=s2560", "1995-96 Juventus Home Shirt Piero #10", "0.19", "1995-96 Juventus Home Shirt Piero #10 #seriea", "13", "89-467-8114"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihaoEYPXdkGt3EJYEv7AKi_E301PgP1EwchZgfA40rZfpBDAAqSwqAczklIw-mk6s8KGCUb8liEaM66-NWR_VkWYJ3Xh=s2560", "2006-07 AC Milan Home Shirt Pirlo #21", "0.31", "2006-07 AC Milan Home Shirt Pirlo #21 #seriea", "14", "42-756-0746"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihZiwsSPrg5vbUQSOPu6sDovtnydxiH8M3QWS1pFrU74p8BOPcj-LuCpalLmC9bPaAKPYGsK0M2pjaFxekSXZIti8TT23A=s1600", "2002 Brazil Home Shirt Ronaldinho #10", "0.33", "2002 Brazil Home Shirt Ronaldinho #10 #nationalteams", "15", "28-930-8623"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihbhIJkf6EGoFcfHTcxdTYz9NOv0ruQIWJ9UeRorIagmQw-c5JlkbngC9v0r0CIVfmo-ARbA6CpbTZN3FPziTCCEkb1bEw=s1600", "2016-17 Real Madrid Home Shirt Cristiano Ronaldo #7", "0.7", "2016-17 Real Madrid Home Shirt Cristiano Ronaldo #7 #laliga", "16", "72-783-1511"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihaUrG4qz9A7Ii3BuIJbKbuc-Sij_vSiZTtOesgKeDaAIyLVfY1axuyp9BefXZJrzQ5j_SH1dUcfuTKsry124SSygGI9UQ=s2560", "1998-99 Inter Milan Home Shirt Ronaldo #9", "0.45", "1998-99 Inter Milan Home Shirt Ronaldo #9 #seriea", "17", "41-801-8415"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihYVxnSeSz1-fNNnSg5Hlz6IC6EV7Z9bQ-LCkC5Gzt2qO8ehX7DSZ8PyNuUE0ihUJSLIoaRh-yIwNoLhpnQFg6njZTi1fA=s2560", "1999-2000 Manchester United Home Shirt Schmeichel #1", "0.12", "1999-2000 Manchester United Home Shirt Schmeichel #1 #premierleague", "18", "40-393-4278"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihZSH5tZ_C5oyRis1lKm2C70XVKsW-jtHmfKBr2MhaA2XhIbeI9pSFf_H7T-HWX3yDh_U4os1vPCSStjpcUTABlVjrXP=s2560", "2000 Netherlands Home Shirt Seedorf #10", "0.41", "2000 Netherlands Home Shirt Seedorf #10 #nationalteams", "19", "20-109-3675"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihaR8QmuKTQmD-LlUgFnaTjCgqCjObAJa3U1a7qguJlImubXU-F_5li8dHjMKvHkGuz4ftXbiMnya-WEqvNKAK-R3Psp=s2560", "2001-02 AS Roma Home Shirt Totti #10", "0.38", "2001-02 AS Roma Home Shirt Totti #10 #seriea", "20", "20-109-3675"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihZnBDxJvuinWKEzS_Q_DQNXrGXT1br-9DmGJb9jv8xspH444witz9iYUATo9YKuhSt31D5OzPg8rGZSNc_IzPoxx3_Kwg=s2560", "1998 France Home Shirt Vieira #4", "0.64", "1998 France Home Shirt Vieira #4 #nationalteams", "21", "49-836-0912"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihb0LgDuHuxVoouHryybMRdG2fOObrkFTSM8yrcc3PjafGwwJ1NuIrk_peXb8eNKcNd4-72-VrbeIsK1_ArtN35If7HSaw=s1600", "2008-09 Barcelona Home Shirt Xavi #6", "0.6", "2008-09 Barcelona Home Shirt Xavi #6 #laliga", "22", "48-728-3727"),
    ("https://lh3.googleusercontent.com/drive-viewer/AKGpihacQe-xNrwVWqVVj42x8wT0-AIpoydAGORFm73Wziz3Q_RT7dGSwxBjOkqbBAquRrudOtxmIFNuEdhzzVqDxY2mhbv5DQ=s2560", "1998 France Home Shirt Zidane #10", "0.65", "1998 France Home Shirt Zidane #10 #nationalteams", "23", "28-930-8623")
]


# SQL query to insert the data
query_user_info = ("INSERT INTO user_info "
         "(username, password, email, balance, user_blockchain_id) "
         "VALUES (%s, %s, %s, %s, %s)")

# SQL query to insert the data
query_product = ("INSERT INTO product "
         "(image, title, price, description, nft_token_id, owner_blockchain_id) "
         "VALUES (%s, %s, %s, %s, %s, %s)")

# Insert each row
for row in data_user:
    cursor.execute(query_user_info, row)

# Insert each row
for row in data_product:
    cursor.execute(query_product, row)

# Commit the changes
cnx.commit()

# Close the cursor and connection
cursor.close()
cnx.close()
