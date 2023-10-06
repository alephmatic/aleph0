"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { postRequest } from "@/lib/api";
import { userProfileBody, UserProfileBody } from "@/app/api/user/settings/validation";

// this zod schema is defined in "@/api/user/settings/validation"
// const userProfileSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   email: z.string().email(),
//   city: z.enum(["London", "New York", "Tokyo"]),
// });

export function ProfileForm() {
  const { toast } = useToast();

  const form = useForm<UserProfileBody>({
    resolver: zodResolver(userProfileBody),
    defaultValues: {
      username: "",
      email: "",
      city: "London",
    },
  });

  async function onSubmit(values: UserProfileBody) {
    try {
      const res = await postRequest<any, UserProfileBody>(
        "/api/user/settings",
        values
      );

      toast({
        title: "Profile updated",
        description: `${JSON.stringify(res, null, 2)}`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `There was an error: ${error.message}`,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn@shadcn.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Your city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="London">London</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="Tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage your city in your settings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
