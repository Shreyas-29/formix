"use client";

import { useEffect, useState } from "react";
import DynamicField from "@/components/renderer/dynamic-field";
import type { FormField, Branch, LogicRule } from "@/types/form";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type FormState = Record<string, string>;

const evaluateRule = (rule: LogicRule, formState: FormState): boolean => {
    const sourceVal = formState[rule.fieldId];
    switch (rule.operator) {
        case "==": return String(sourceVal) === String(rule.value);
        case "!=": return String(sourceVal) !== String(rule.value);
        case ">=": return Number(sourceVal) >= Number(rule.value);
        case "<=": return Number(sourceVal) <= Number(rule.value);
        case ">": return Number(sourceVal) > Number(rule.value);
        case "<": return Number(sourceVal) < Number(rule.value);
        default: return false;
    }
};

const isFieldVisible = (field: FormField, formState: FormState): boolean => {
    if (!field.rules) return true;

    const hideRule = field.rules.find((r) => r.effect === "hide" && r.targetFieldId === field.id);
    const showRule = field.rules.find((r) => r.effect === "show" && r.targetFieldId === field.id);

    if (hideRule && evaluateRule(hideRule, formState)) return false;
    if (showRule) return evaluateRule(showRule, formState);

    return true;
};

const shouldHighlight = (field: FormField, formState: FormState): boolean => {
    if (!field.rules) return false;
    return field.rules.some(
        (r) => r.effect === "highlight" && evaluateRule(r, formState)
    );
};

type DynamicFormProps = {
    fields: FormField[];
    formState: FormState;
    onChange: (id: string, value: string) => void;
};

const DynamicForm = ({ fields, formState, onChange }: DynamicFormProps) => {
    
    const [branches, setBranches] = useState<Branch[]>([]);

    useEffect(() => {
        const hasBranchSource = fields.some((f) => f.dataSource === "branches");
        if (!hasBranchSource) return;

        fetch(`${API_BASE}/metadata/branches`)
            .then((r) => r.json())
            .then(setBranches)
            .catch(() => { });
    }, [fields]);

    return (
        <div className="flex flex-col gap-1 p-2">
            {fields.map((field) => {
                if (!isFieldVisible(field, formState)) return null;

                return (
                    <DynamicField
                        key={field.id}
                        field={field}
                        value={formState[field.id] ?? ""}
                        onChange={onChange}
                        branches={branches}
                        highlight={shouldHighlight(field, formState)}
                    />
                );
            })}
        </div>
    );
};

export default DynamicForm;
