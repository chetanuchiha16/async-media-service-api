"use client";

import { useEffect, useState } from "react";
import { getFeed, PostModel } from "@/client";
import { PostCard } from "@/components/PostCard";
import { UploadModal } from "@/components/UploadModal";
import { usePathname, useRouter } from "next/navigation";
import { deleteFeed } from "@/client";

export default function PostsPage() {
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const res = await getFeed({
                query: { limit: 50 },
            });
            if (res.error) {
                setError("Failed to load feed");
            } else {
                setPosts(res.data || []);
            }
        } catch (err) {
            setError("Network error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteFeed({ query: { id } });
            setPosts((prev) => prev.filter((post) => post.id !== id));
        } catch (err) {
            console.error("Failed to delete post", err);
        }
    };

    return (
        <div className="container mx-auto max-w-screen-xl px-4 py-8 md:px-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Your Feed</h1>
                    <p className="text-muted-foreground mt-1 text-sm md:text-base">
                        Discover the latest posts from the community.
                    </p>
                </div>
                <UploadModal onUploadSuccess={fetchPosts} />
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="aspect-square bg-muted rounded-2xl"></div>
                    ))}
                </div>
            ) : error ? (
                <div className="flex h-64 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 text-destructive">
                    <p>{error}</p>
                </div>
            ) : posts.length === 0 ? (
                <div className="flex flex-col h-64 items-center justify-center rounded-xl border border-border bg-card">
                    <p className="text-muted-foreground mb-4">No posts yet. Be the first to share!</p>
                    <UploadModal onUploadSuccess={fetchPosts} />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <PostCard 
                            key={post.id} 
                            post={post} 
                            onDelete={handleDelete}
                            // In a real app, currentUserId would come from a user context
                            currentUserId={post.user_id} // HACK: for testing, allowing delete of any loaded post
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
