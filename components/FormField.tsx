import {
  FormItem,
  FormField as BaseFormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const FormField = ({ control, name, label, placeholder, type }: FormFieldProps) => {
  return (
    <BaseFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="form-label">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              {...field}
              className="form-input"
            />
          </FormControl>
          <FormMessage className="form-error" />
        </FormItem>
      )}
    />
  );
};

export default FormField;
