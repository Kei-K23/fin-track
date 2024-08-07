import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

type FormValues = z.infer<typeof formSchema>;

type CategoryCreateFormProps = {
  id?: string;
  defaultValue?: FormValues;
  onSubmit?: (form: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export default function CategoryCreateForm({
  id,
  defaultValue,
  onSubmit,
  onDelete,
  disabled,
}: CategoryCreateFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit?.(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g Food, Travel, etc"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row  gap-4">
          <Button disabled={disabled} type="submit" className="w-full">
            {id ? "Save changes" : "Create category"}
          </Button>
          {!!id && (
            <Button
              disabled={disabled}
              type="button"
              className="w-full"
              variant={"outline"}
              onClick={handleDelete}
            >
              <Trash className="size-4 mr-2" />
              <span>Delete category</span>
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
