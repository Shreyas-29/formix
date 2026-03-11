import Icons from "@/components/global/icons";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const HomePage = async () => {
    return (
        <main className="flex flex-col h-dvh items-center justify-center bg-background px-4">
            <div className="flex flex-col items-center gap-10 w-full max-w-lg">
                <div className="flex flex-col items-center gap-2 text-center">
                    <Icons.logo className="size-10 text-primary" />
                    <h1 className="text-3xl font-semibold tracking-tight mt-2">
                        Formix
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        Dynamic safety form engine. Build custom checklists and collect submissions in the field
                    </p>
                </div>

                <div className="flex flex-col gap-3 w-full">
                    <Link
                        href="/admin"
                        className="group flex items-center gap-4 rounded-lg lg:rounded-xl border border-border bg-card p-3 lg:p-5 transition-all hover:border-primary/40"
                    >
                        <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 shrink-0">
                            <Icons.edit className="size-5 text-primary" />
                        </div>
                        <div className="flex flex-col flex-1">
                            <span className="text-sm font-medium">
                                Form Builder
                            </span>
                            <span className="text-xs text-muted-foreground">
                                Create and configure safety forms
                            </span>
                        </div>
                        <ArrowRightIcon className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </Link>

                    <Link
                        href="/forms"
                        className="group flex items-center gap-4 rounded-lg lg:rounded-xl border border-border bg-card p-3 lg:p-5 transition-all hover:border-primary/40"
                    >
                        <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 shrink-0">
                            <Icons.document className="size-5 text-primary" />
                        </div>
                        <div className="flex flex-col flex-1">
                            <span className="text-sm font-medium">
                                Fill a Form
                            </span>
                            <span className="text-xs text-muted-foreground">
                                Open a form link to submit data
                            </span>
                        </div>
                        <ArrowRightIcon className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </Link>
                </div>
            </div>
        </main>
    )
};

export default HomePage
