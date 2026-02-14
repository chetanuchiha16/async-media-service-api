# Async Media Service API

A high-performance, asynchronous REST API built with **FastAPI**. This project demonstrates modern backend architectural patterns, including secure user authentication, cloud-based media management, and background processing.

## 🚀 Key Features

* **Asynchronous Architecture:** Fully `async/await` implementation using **SQLAlchemy 2.0** for non-blocking database operations.
* **Robust Authentication:** Integrated **FastAPI Users** with JWT strategy, supporting registration, login, and email verification.
* **Cloud Media Management:** Seamless integration with **ImageKit.io** for optimized image uploads and transformations.
* **Background Processing:** Utilizes FastAPI `BackgroundTasks` for asynchronous audit logging, ensuring low-latency API responses.
* **Structured Design:** Clean separation of concerns with dedicated layers for `Models`, `Schemas`, `CRUD`, and `Routers`.
* **Automatic Documentation:** Interactive API documentation provided via **Swagger UI** and **ReDoc**.

## 🛠️ Tech Stack

* **Framework:** FastAPI
* **Database:** PostgreSQL (via SQLAlchemy Async Engine)
* **Authentication:** JWT (JSON Web Tokens)
* **Media Storage:** ImageKit SDK
* **Environment:** Python 3.12+ (Managed via `uv`)

## 📂 Project Structure

```text
├── app/
│   ├── crud/           # Database abstraction layer (Create, Read, Update, Delete)
│   ├── db/             # Database connection and model definitions
│   ├── routers/        # API route handlers (Posts, Users, Auth)
│   ├── schemas/        # Pydantic models for data validation
│   ├── imagekit.py     # ImageKit cloud storage configuration
│   └── app.py          # Application factory and middleware
├── main.py             # Entry point for the Uvicorn server
└── pyproject.toml      # Dependency management

```

## ⚙️ Setup & Installation

1. **Clone the repository:**
```bash
git clone https://github.com/chetanuchiha16/fast-api_tutorial.git
cd fast-api_tutorial

```


2. **Install dependencies:**
*(Recommended to use `uv` for faster installation)*
```bash
uv sync

```


3. **Environment Variables:**
Create a `.env` file in the root directory and add your credentials:
```env
DATABASE_URL=sqlite+aiosqlite:///./test.db
SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_endpoint

```


4. **Run the application:**
```bash
uv run main.py

```



## 📖 API Documentation

Once the server is running, you can access the interactive documentation at:

* **Swagger UI:** `http://127.0.0.1:8000/docs`
* **ReDoc:** `http://127.0.0.1:8000/redoc`

---