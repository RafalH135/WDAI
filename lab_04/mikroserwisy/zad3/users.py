import sqlite3

conn = sqlite3.connect('users.db')
cursor = conn.cursor()

# Przykład: stworzenie tabeli
cursor.execute('''
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL
)''')

conn.commit() # Zapisz zmiany
conn.close()  # Zamknij połączenie