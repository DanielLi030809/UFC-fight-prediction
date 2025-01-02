import psycopg2

conn = psycopg2.connect(host="localhost", dbname="postgres", user="postgres", password="Leting61468126", port=5433)

cur = conn.cursor()

cur.execute("""CREATE TABLE IF NOT EXISTS fighters (
        id SERIAL PRIMARY KEY,
        name TEXT,
        height TEXT,   
        weight FLOAT,
        reach FLOAT,
        stance TEXT,
        dob DATE,
        slpm FLOAT,
        stracc TEXT,
        sapm FLOAT,
        strdef TEXT,
        tdavg FLOAT,
        tdacc TEXT,
        tddef TEXT,
        subavg FLOAT,
        record TEXT
    )""")


conn.commit()

cur.close()
conn.close()

