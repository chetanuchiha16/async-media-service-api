import { PostModel } from "@/client";
import { formatDistanceToNow } from "date-fns";
import { Trash, Image as ImageIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";

interface PostCardProps {
    post: PostModel;
    onDelete?: (id: string) => void;
    currentUserId?: string;
}

export function PostCard({ post, onDelete, currentUserId }: PostCardProps) {
    const isOwner = currentUserId && post.user_id === currentUserId;

    return (
        <div className="group relative overflow-hidden rounded-2xl bg-card border border-border/40 shadow-sm transition-all hover:shadow-md dark:hover:shadow-primary/5">
            <div className="aspect-square w-full bg-muted relative overflow-hidden">
                {post.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={post.url}
                        alt={post.caption || "Post image"}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                        <ImageIcon className="h-12 w-12 opacity-50" />
                    </div>
                )}
                
                {/* Overlay for actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-4">
                    <div className="flex justify-end">
                        {isOwner && onDelete && (
                            <Button
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8 rounded-full opacity-90 hover:opacity-100"
                                onClick={() => onDelete(post.id!)}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="p-4">
                <p className="text-sm text-card-foreground line-clamp-2">
                    {post.caption || "No caption"}
                </p>
                <div className="mt-2 text-xs text-muted-foreground">
                    {post.created_at ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true }) : "Unknown date"}
                </div>
            </div>
        </div>
    );
}
