# UFC Fight Prediction Full Stack Web Application

I developed a machine learning web application that predicts UFC match outcomes using logistic regression. The model analyzes fighter statistics scraped from the official UFC website. As the sole creator, I handled every aspect of the project, from data preprocessing and model training in Jupyter Notebook to building the web interface with Next.js and setting up API routes with FastAPI. Data was stored in PostgreSQL using Neon, a serverless platform.

I particularly enjoyed experimenting with different training methods to improve model accuracy and designing an intuitive web interface to make the model accessible to users worldwide. The process of bringing a machine learning model to life through a full-stack application was incredibly rewarding.

One of the challenges I encountered was selecting the right tools and frameworks to ensure seamless integration. Initially, I used PgAdmin for PostgreSQL and FastAPI for data retrieval, but I later switched to Neon and Prisma with Next.js server components for more efficient data management. Another hurdle was deployment: while the frontend was successfully deployed, the backend posed issues due to the model's size exceeding serverless platform limits. I’m currently exploring solutions to overcome this limitation.
