"use client";

import Icons from "@/components/global/icons";
import { Button } from "@/components/ui/button";
import type { FormDefinition } from "@/types/form";
import { Loader2Icon, MoreVerticalIcon, CheckIcon, CopyIcon, ListIcon, ExternalLinkIcon, TrashIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const FormsPage = () => {

    const [forms, setForms] = useState<FormDefinition[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${API_BASE}/forms/definitions`)
            .then((r) => r.json())
            .then((data) => setForms(Array.isArray(data) ? data : []))
            .catch(() => toast.error("Could not load forms"))
            .finally(() => setLoading(false));
    }, []);

    const handleCopy = (formId: string) => {
        const link = `${window.location.origin}/forms/${formId}`;
        navigator.clipboard.writeText(link);
        setCopiedId(formId);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDelete = async (formId: string) => {
        if (!confirm("Are you sure you want to delete this form entirely? All submissions will be permanently lost.")) return;

        setDeletingId(formId);
        try {
            const res = await fetch(`${API_BASE}/forms/${formId}`, {
                method: "DELETE"
            });
            if (!res.ok) throw new Error("Failed to delete form");
            setForms(prev => prev.filter(f => f.id !== formId));
            toast.success("Form deleted successfully");
        } catch (e) {
            toast.error("Could not delete form");
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (iso: string) => {
        return new Date(iso).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <main className="min-h-screen bg-background">
            <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Icons.logo className="size-8" />
                        <div className="flex flex-col">
                            <h1 className="text-lg font-semibold tracking-tight">
                                Published Forms
                            </h1>
                            <p className="text-xs text-muted-foreground">
                                Share a link with your team to collect data
                            </p>
                        </div>
                    </div>
                    <Link href="/admin">
                        <Button size="sm">
                            New Form
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
                    </div>
                ) : forms.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 py-24 text-center">
                        <Icons.form className="size-8 text-muted-foreground/40" />
                        <p className="text-sm font-medium text-muted-foreground">
                            No forms published yet
                        </p>
                        <p className="text-xs text-muted-foreground/60">
                            Go to the builder and hit Publish to create your first form
                        </p>
                        <Link href="/admin">
                            <Button size="sm" className="mt-2">
                                Create a Form
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {forms.map((form) => (
                            <div
                                key={form.id}
                                className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-border/80 hover:bg-card/20"
                            >
                                <Icons.form className="size-5 text-muted-foreground shrink-0" />

                                <div className="flex flex-col flex-1 min-w-0 gap-0.5">
                                    <span className="text-sm font-medium truncate">
                                        {form.schema.title || "Untitled Form"}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-muted-foreground">
                                            {form.schema.fields.length} field{form.schema.fields.length !== 1 ? "s" : ""}
                                        </span>
                                        <span className="text-muted-foreground/40 text-xs">
                                            •
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {formatDate(form.created_at)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center shrink-0">
                                    {deletingId === form.id ? (
                                        <div className="flex items-center justify-center p-2">
                                            <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
                                        </div>
                                    ) : (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="flex items-center justify-center size-8 rounded-md hover:bg-muted text-muted-foreground transition-colors outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer">
                                                <MoreVerticalIcon className="size-4" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-44">
                                                <DropdownMenuItem onClick={() => handleCopy(form.id)} className="gap-2 cursor-pointer">
                                                    {copiedId === form.id ? "Copied!" : "Copy link"}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 cursor-pointer p-0">
                                                    <Link href={`/forms/${form.id}/submissions`} className="flex w-full items-center gap-2 px-2 py-1.5">
                                                        View Responses
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 cursor-pointer p-0">
                                                    <Link href={`/forms/${form.id}`} className="flex w-full items-center gap-2 px-2 py-1.5">
                                                        Fill Form
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(form.id)} className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 hover:text-destructive! mt-1 mb-0.5">
                                                    Delete Form
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default FormsPage;
