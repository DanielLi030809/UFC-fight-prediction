import psycopg2

conn = psycopg2.connect(
    host="localhost",
    dbname="postgres",
    user="postgres",
    password="Leting61468126",
    port=5433
)

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

cur.execute("""CREATE TABLE IF NOT EXISTS processed (
        id SERIAL PRIMARY KEY,
        name TEXT,
        height FLOAT,   
        weight FLOAT,
        reach FLOAT,
        slpm FLOAT,
        stracc FLOAT,
        sapm FLOAT,
        strdef FLOAT,
        tdavg FLOAT,
        tdacc FLOAT,
        tddef FLOAT,
        subavg FLOAT,
        win FLOAT,
        loss FLOAT,
        draw FLOAT
    )""")


conn.commit()

cur.close()
conn.close()

