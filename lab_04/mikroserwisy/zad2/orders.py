import sqlite3

conn = sqlite3.connect('orders.db')
cursor = conn.cursor()

# Przykład: stworzenie tabeli
cursor.execute('''
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    bookId INTEGER NOT NULL,
    quantity INTEGER NOT NULL
)''')

conn.commit() # Zapisz zmiany
conn.close()  # Zamknij połączenie