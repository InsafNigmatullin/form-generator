export interface FormField {
    type: 'input' | 'select' | 'checkbox' | 'textarea';
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    options?: Array<{
        value: string | number;
        label: string;
        disabled?: boolean
    }>;
    attrs?: Record<string, any>;
    validation?: {
        pattern?: RegExp;
        message?: string;
    };
}