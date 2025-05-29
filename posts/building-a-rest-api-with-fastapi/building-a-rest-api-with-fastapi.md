---
date: 2024-03-13
author: Roger Willis
tags: [python, fastapi, api, web-development]
title: Building a REST API with FastAPI
excerpt: A comprehensive guide to building modern, high-performance REST APIs using FastAPI, Python's fastest web framework.
---

# Building a REST API with FastAPI

FastAPI is a modern, fast web framework for building APIs with Python. It's built on top of Starlette and Pydantic, offering automatic OpenAPI documentation, type checking, and high performance.

## Why FastAPI?

1. **Performance**: One of the fastest Python web frameworks available
2. **Type Safety**: Built-in type checking with Pydantic
3. **Documentation**: Automatic OpenAPI (Swagger) documentation
4. **Modern**: Based on Python 3.6+ type hints
5. **Easy to Use**: Intuitive API design

## Basic FastAPI Application

```python
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None
    tags: List[str] = []

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/items/")
async def create_item(item: Item):
    return item
```

## CRUD Operations

### Create and Read

```python
from fastapi import FastAPI, HTTPException
from typing import Dict

app = FastAPI()
items: Dict[int, Item] = {}

@app.post("/items/", response_model=Item)
async def create_item(item: Item):
    item_id = len(items) + 1
    items[item_id] = item
    return item

@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: int):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]
```

### Update and Delete

```python
@app.put("/items/{item_id}", response_model=Item)
async def update_item(item_id: int, item: Item):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    items[item_id] = item
    return item

@app.delete("/items/{item_id}")
async def delete_item(item_id: int):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    del items[item_id]
    return {"message": "Item deleted"}
```

## Advanced Features

### Query Parameters

```python
from typing import Optional

@app.get("/items/")
async def read_items(
    skip: int = 0,
    limit: int = 10,
    search: Optional[str] = None
):
    return {
        "skip": skip,
        "limit": limit,
        "search": search
    }
```

### Path Parameters

```python
@app.get("/users/{user_id}/items/{item_id}")
async def read_user_item(
    user_id: int,
    item_id: int,
    q: Optional[str] = None
):
    return {
        "user_id": user_id,
        "item_id": item_id,
        "q": q
    }
```

### Request Body

```python
class User(BaseModel):
    username: str
    email: str
    full_name: Optional[str] = None

@app.post("/users/")
async def create_user(user: User):
    return user
```

## Best Practices

1. **Use Type Hints**: Always use type hints for better code quality
2. **Validate Input**: Use Pydantic models for request validation
3. **Error Handling**: Implement proper error handling with HTTPException
4. **Documentation**: Add descriptions to your endpoints
5. **Testing**: Write tests for your API endpoints

## Security

### Basic Authentication

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

security = HTTPBasic()

def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = "admin"
    correct_password = "secret"
    if credentials.username != correct_username or credentials.password != correct_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

@app.get("/secure/")
async def secure_endpoint(username: str = Depends(get_current_username)):
    return {"message": f"Hello {username}"}
```

## Deployment

FastAPI applications can be deployed using:

1. **Uvicorn**: For development and small deployments
2. **Gunicorn**: For production deployments
3. **Docker**: For containerized deployments
4. **Cloud Platforms**: AWS, Google Cloud, Azure, etc.

## Conclusion

FastAPI is an excellent choice for building modern REST APIs in Python. Its combination of performance, type safety, and automatic documentation makes it a powerful tool for API development.

Remember to:
- Use type hints consistently
- Implement proper error handling
- Add comprehensive documentation
- Write tests for your endpoints
- Follow security best practices

