import sqlite3

conn = sqlite3.connect('books.db')
cursor = conn.cursor()

# Przykład: stworzenie tabeli
cursor.execute('''
CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year TEXT NOT NULL
)''')

conn.commit() # Zapisz zmiany
conn.close()  # Zamknij połączenie
