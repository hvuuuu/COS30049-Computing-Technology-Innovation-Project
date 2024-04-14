from flask import Flask, jsonify, request, session
from flask_cors import CORS
import mysql.connector
from datetime import timedelta

app = Flask(__name__)
app.secret_key = 'nft_jersey_platform'
CORS(app, supports_credentials=True)

@app.route('/products', methods=['GET'])
def get_products():
    # Get the category, search term, and sort order from the query parameters
    category = request.args.get('category')
    search_term = request.args.get('search')
    sort_order = request.args.get('sort')

    # Establish the connection
    db = mysql.connector.connect(
        host="feenix-mariadb.swin.edu.au",
        user="s104177995",
        password="180804",
        database="s104177995_db"
    )

    # Create a new cursor
    cursor = db.cursor()

    # SQL query to fetch the required data
    if category and search_term:
        query = "SELECT image, title, price, nft_token_id FROM product WHERE description LIKE %s AND title LIKE %s"
        values = ('%' + category + '%', '%' + search_term + '%')
    elif category:
        query = "SELECT image, title, price, nft_token_id FROM product WHERE description LIKE %s"
        values = ('%' + category + '%',)
    elif search_term:
        query = "SELECT image, title, price, nft_token_id FROM product WHERE title LIKE %s"
        values = ('%' + search_term + '%',)
    else:
        query = "SELECT image, title, price, nft_token_id FROM product"
        values = ()

    # Add the sort order to the query
    if sort_order == 'High - Low':
        query += " ORDER BY price DESC"
    elif sort_order == 'Low - High':
        query += " ORDER BY price ASC"
    elif sort_order == 'Year':
        query += " ORDER BY title ASC"

    # Execute the query
    cursor.execute(query, values)

    # Fetch all the rows
    rows = cursor.fetchall()

    # Convert rows into a list of dictionaries
    products = [{"image": row[0], "title": row[1], "price": row[2], "nft_token_id": row[3]} for row in rows]

    # close the connection
    db.close()

    # Return the product data as JSON
    return jsonify(products)

@app.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    # Establish the connection
    db = mysql.connector.connect(
        host="feenix-mariadb.swin.edu.au",
        user="s104177995",
        password="180804",
        database="s104177995_db"
    )

    # Create a new cursor
    cursor = db.cursor()

    # SQL query to fetch the required data
    query = "SELECT image, title, price, description, nft_token_id, owner_blockchain_id FROM product WHERE nft_token_id = %s"

    # Execute the query
    cursor.execute(query, (id,))

    # Fetch the first row
    row = cursor.fetchone()

    # Check if a row was returned
    if row is None:
        return jsonify({"error": "Product not found"}), 404

    # Convert row into a dictionary
    product = {"image": row[0], "title": row[1], "price": row[2], "description": row[3], "nft_token_id": row[4], "owner_blockchain_id": row[5]}

    # close the connection
    db.close()

    # Return the product data as JSON
    return jsonify(product)

@app.route('/users/<username>', methods=['GET'])
def get_user(username):
    # Establish the connection
    db = mysql.connector.connect(
        host="feenix-mariadb.swin.edu.au",
        user="s104177995",
        password="180804",
        database="s104177995_db"
    )

    # Create a new cursor
    cursor = db.cursor()

    # SQL query to fetch the required data
    query = "SELECT username, password, email, balance, user_blockchain_id FROM user_info WHERE username = %s"

    # Execute the query
    cursor.execute(query, (username,))

    # Fetch the row
    row = cursor.fetchone()

    # Convert row into a dictionary
    user = {"username": row[0], "password": row[1], "email": row[2], "balance": row[3], "user_blockchain_id": row[4]} if row else None

    # close the connection
    db.close()

    # Return the user data as JSON
    return jsonify(user)

@app.route('/users/<username>/update', methods=['POST'])
def update_user_info(username):
    # Get the data from the request
    data = request.get_json()

    # Get the blockchain_id and balanceInEther from the data
    blockchain_id = data.get('blockchainId')
    balance_in_ether = data.get('balanceInEther')

    # Establish the connection
    db = mysql.connector.connect(
        host="feenix-mariadb.swin.edu.au",
        user="s104177995",
        password="180804",
        database="s104177995_db"
    )

    # Create a new cursor
    cursor = db.cursor()

    # SQL query to update the user's information
    query = "UPDATE user_info SET user_blockchain_id = %s, balance = %s WHERE username = %s"

    # Execute the query
    cursor.execute(query, (blockchain_id, balance_in_ether, username))

    # Commit the transaction
    db.commit()

    # Close the connection
    db.close()

    return jsonify({'message': 'User info updated successfully'}), 200

@app.route('/blockchain_ids/<blockchain_id>', methods=['GET'])
def get_user_by_blockchain_id(blockchain_id):
    # Establish the connection
    db = mysql.connector.connect(
        host="feenix-mariadb.swin.edu.au",
        user="s104177995",
        password="180804",
        database="s104177995_db"
    )

    # Create a new cursor
    cursor = db.cursor()

    # SQL query to fetch the required data
    query = "SELECT username, user_blockchain_id FROM user_info WHERE user_blockchain_id = %s"

    # Execute the query
    cursor.execute(query, (blockchain_id,))

    # Fetch the row
    row = cursor.fetchone()

    # close the connection
    db.close()

    # Return the username and user_blockchain_id as JSON if they exist
    return jsonify({"username": row[0], "user_blockchain_id": row[1]}) if row else jsonify({})

@app.route('/sign_up', methods=['POST'])
def signup():
    # Get the request data
    data = request.get_json()

    # Establish the connection
    db = mysql.connector.connect(
        host="feenix-mariadb.swin.edu.au",
        user="s104177995",
        password="180804",
        database="s104177995_db"
    )

    # Create a new cursor
    cursor = db.cursor()

    # SQL query to insert the new user
    query = "INSERT INTO user_info (username, password, email, balance, user_blockchain_id) VALUES (%s, %s, %s, %s, %s)"
    values = (data['username'], data['password'], data['email'], data.get('balance', None), data.get('user_blockchain_id', None))

    # Execute the query
    cursor.execute(query, values)

    # Commit the transaction
    db.commit()

    # Close the connection
    db.close()

    # Return the user data as JSON along with the success message
    return jsonify({'message': 'User created!', 'username': data['username'], 'password': data['password'], 'email': data['email']}), 201

@app.route('/log_in', methods=['POST'])
def login():
    # Get the request data
    data = request.get_json()

    # Establish the connection
    db = mysql.connector.connect(
        host="feenix-mariadb.swin.edu.au",
        user="s104177995",
        password="180804",
        database="s104177995_db"
    )

    # Create a new cursor
    cursor = db.cursor()

    # SQL query to fetch the user
    query = "SELECT password FROM user_info WHERE username = %s"
    values = (data['username'],)

    # Execute the query
    cursor.execute(query, values)

    # Fetch the user
    user = cursor.fetchone()

    # Close the connection
    db.close()

    # Check if the user exists and the password is correct
    if user and user[0] == data['password']:
        # Log the user in
        session['username'] = data['username']
        # Check if the session is created
        if 'username' in session:
            return jsonify({'message': 'Logged in and session created!'})
        else:
            return jsonify({'message': 'Logged in but session not created'}), 500

    return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/get_username', methods=['GET'])
def get_username():
    return jsonify({'username': session.get('username')})

@app.route('/log_out', methods=['POST', 'GET'])
def logout():
    # Remove the username from the session
    session.pop('username', None)
    return jsonify({'message': 'Logged out!'})

@app.route('/product_upload', methods=['POST'])
def product_upload():
    # Get the request data
    data = request.get_json()

    # image_file = request.files['image']

    # image_data = image_file.read()

    # Establish the connection
    db = mysql.connector.connect(
        host="feenix-mariadb.swin.edu.au",
        user="s104177995",
        password="180804",
        database="s104177995_db"
    )

    # Create a new cursor
    cursor = db.cursor()

    # SQL query to insert the new user
    query = "INSERT INTO product (title, price, description) VALUES (%s, %s, %s)"
    values = (data['title'], data['price'], data['description'])

    # query = "INSERT INTO product (title, price, description, image) VALUES (%s, %s, %s, %s)"
    # values = (data['title'], data['price'], data['description'], image_data)

    # Execute the query
    cursor.execute(query, values)

    # Commit the transaction
    db.commit()

    # Close the connection
    db.close()

    # Return the user data as JSON along with the success message
    return jsonify({'message': 'Upload product successful', 'title': data['title'], 'price': data['price'], 'description': data['description']}), 290

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)