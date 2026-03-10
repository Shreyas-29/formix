"use client";

import Icons from "@/components/global/icons";
import { Button } from "@/components/ui/button";
import type { FormDefinition } from "@/types/form";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const FormsPage = () => {

    const [forms, setForms] = useState<FormDefinition[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [copiedId, setCopiedId] = useState<string | null>(null);

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

                                <div className="flex items-center gap-1.5 shrink-0">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleCopy(form.id)}
                                        className="h-7 text-xs px-2.5"
                                    >
                                        {copiedId === form.id ? "Copied!" : "Copy link"}
                                    </Button>
                                    <Link href={`/forms/${form.id}/submissions`}>
                                        <Button size="sm" variant="outline" className="h-7 text-xs px-2.5">
                                            Responses
                                        </Button>
                                    </Link>
                                    <Link href={`/forms/${form.id}`}>
                                        <Button size="sm" className="h-7 text-xs px-2.5">
                                            Fill Form
                                        </Button>
                                    </Link>
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
