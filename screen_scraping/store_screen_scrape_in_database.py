import sqlite3
import os

if os.path.exists('reviews.sqlite'):
    os.remove('reviews.sqlite')
conn = sqlite3.connect('reviews.sqlite')
c = conn.cursor()
c.execute('CREATE TABLE users (first_name TEXT, last_name TEXT, user_name TEXT)')
c.execute("INSERT INTO users (first_name, last_name, user_name) VALUES (?,?,?)",["ruben","pierich","rpierich"])
c.execute("INSERT INTO users (first_name, last_name, user_name) VALUES (?,?,?)",("shane","moulton","smoulton"))

conn.commit()
conn.close()
