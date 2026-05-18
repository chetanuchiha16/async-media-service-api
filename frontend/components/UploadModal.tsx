"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Images, X, UploadSimple } from "@phosphor-icons/react";
import { uploadFile } from "@/client";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function UploadModal({ onUploadSuccess }: { onUploadSuccess?: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [caption, setCaption] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleClear = () => {
        setFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        try {
            const response = await uploadFile({
                body: {
                    file: file as Blob,
                    caption: caption,
                },
            });

            if (response.error) {
                console.error("Upload failed", response.error);
                // Handle error (maybe show a toast)
            } else {
                setIsOpen(false);
                handleClear();
                setCaption("");
                if (onUploadSuccess) {
                    onUploadSuccess();
                } else {
                    router.refresh(); // Fallback if no callback
                }
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 shadow-lg hover:shadow-xl transition-all rounded-full px-6">
                    <UploadSimple weight="bold" className="h-4 w-4" />
                    New Post
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Create new post</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    {!previewUrl ? (
                        <div 
                            className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="rounded-full bg-primary/10 p-4 text-primary">
                                <Images className="h-8 w-8" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Click to select an image</p>
                                <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, WEBP</p>
                            </div>
                            <Input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>
                    ) : (
                        <div className="relative rounded-xl overflow-hidden aspect-square bg-muted">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src={previewUrl} 
                                alt="Preview" 
                                className="object-cover w-full h-full"
                            />
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-md"
                                onClick={handleClear}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    )}

                    <div className="space-y-2 mt-2">
                        <label className="text-sm font-medium">Caption</label>
                        <Textarea 
                            placeholder="Write a caption..." 
                            className="resize-none rounded-xl"
                            rows={3}
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                    </div>

                    <Button 
                        onClick={handleUpload} 
                        disabled={!file || isUploading}
                        className="w-full rounded-xl h-12 text-md font-semibold mt-2"
                    >
                        {isUploading ? "Uploading..." : "Post"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
