from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field

# ----------------- Auth & User Schemas -----------------

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)
    selected_theme: Optional[str] = "dark-dungeon"
    personality_house: Optional[str] = "Blossom Leader"
    character_avatar: Optional[str] = "warrior_girl"

class UserLogin(BaseModel):
    # Allows logging in with either username or email
    username_or_email: str
    password: str

class UserThemeUpdate(BaseModel):
    selected_theme: str

class UserStatsUpdate(BaseModel):
    xp_gain: Optional[int] = 0
    gold_gain: Optional[int] = 0
    level: Optional[int] = None
    streak: Optional[int] = None
    intellect: Optional[int] = None
    strength: Optional[int] = None
    vitality: Optional[int] = None
    mind: Optional[int] = None

class UserOut(UserBase):
    id: int
    selected_theme: str
    personality_house: str
    character_avatar: str
    level: int
    xp: int
    gold: int
    streak: int
    intellect: int
    strength: int
    vitality: int
    mind: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut

class TokenData(BaseModel):
    user_id: Optional[int] = None
    username: Optional[str] = None


# ----------------- Task Schemas -----------------

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    map_location: str = "Town Square"
    difficulty: str = "Medium"
    xp_reward: int = 50
    gold_reward: int = 20

class TaskCreate(TaskBase):
    pass

class TaskOut(TaskBase):
    id: int
    user_id: int
    is_completed: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ----------------- Lounge Schemas -----------------

class LoungeBase(BaseModel):
    name: str
    is_private: bool = False

class LoungeCreate(LoungeBase):
    pass

class LoungeOut(LoungeBase):
    id: int
    invite_code: str
    creator_id: int

    class Config:
        from_attributes = True
