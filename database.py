import psycopg2

conn = psycopg2.connect(host="localhost", dbname="postgres", user="postgres", password="Leting61468126", port=5433)

cur = conn.cursor()

cur.execute("""CREATE TABLE IF NOT EXISTS fighters (
        name VARCHAR(255) PRIMARY KEY,
        height FLOAT,   
        weight FLOAT,
        reach FLOAT,
        stance VARCHAR(255),
        age INT,
        
        
                
        )""")

conn.commit()

cur.close()
conn.close()

