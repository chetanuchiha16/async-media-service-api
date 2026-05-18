from app.core.base_repo import CrudBase
from app.post.models import Post
from app.post.schema import PostCreateSchema


class PostCrud(CrudBase[Post, PostCreateSchema]):
    pass


post_crud = PostCrud(Post)
