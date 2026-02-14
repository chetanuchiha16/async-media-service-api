from imagekitio import ImageKit

from app.config import settings

imagekit = ImageKit(**settings.imagekit.model_dump())
