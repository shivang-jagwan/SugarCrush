"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useTransition } from "react";
import Balancer from "react-wrap-balancer";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2, MessageCircle, Sparkles, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { enhanceOrder } from "@/app/actions";

const orderFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  contact: z.string().min(10, "Please enter a valid contact number.").max(15),
  orderDetails: z.string().min(10, "Please provide some details about your order."),
  deliveryDate: z.date({
    required_error: "A delivery date is required.",
  }),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

export const Order = () => {
  const [isPending, startTransition] = useTransition();
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name: "",
      contact: "",
      orderDetails: "",
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    startTransition(async () => {
      const result = await enhanceOrder({ orderDetails: data.orderDetails });
      if (result.success && result.data) {
        setAiResponse(result.data.enhancedOrderDetails);
      } else {
        setAiResponse("Sorry, we couldn't process your request right now. Please try again.");
      }
      setFormSubmitted(true);
    });
  };

  return (
    <section id="order" className="py-20 lg:py-32 bg-secondary/50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-foreground">
            Create Your Custom Order
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            <Balancer>
              Have something special in mind? Fill out the form below, and we'll help bring your sweet vision to life.
            </Balancer>
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-card p-8 rounded-lg shadow-xl">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Jane Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number (WhatsApp preferred)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 9876543210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="deliveryDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Preferred Delivery Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="orderDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order Details</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your dream cake! e.g., 'A 1kg chocolate truffle cake for a birthday, with 'Happy Birthday' written on it.'"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                      {isPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...</>
                      ) : (
                        <><Sparkles className="mr-2 h-4 w-4" /> Get AI Suggestions & Submit</>
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            ) : (
              <motion.div
                key="thank-you"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-card p-8 rounded-lg shadow-xl text-center flex flex-col items-center"
              >
                <motion.div initial={{scale: 0}} animate={{scale:1, transition:{delay: 0.2, type: 'spring', stiffness: 200}}}>
                  <ThumbsUp className="h-20 w-20 text-primary bg-accent rounded-full p-4" />
                </motion.div>
                <h3 className="font-headline text-3xl font-bold mt-6">Thank You!</h3>
                <p className="text-muted-foreground mt-2">We've received your request and our AI has some thoughts:</p>
                <div className="mt-4 text-left bg-secondary p-4 rounded-md w-full">
                  <p className="font-semibold text-foreground flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary"/> AI Suggestion:</p>
                  <p className="mt-2 text-muted-foreground">{aiResponse || "Loading suggestion..."}</p>
                </div>
                <p className="text-muted-foreground mt-6">We will get in touch with you shortly on WhatsApp to confirm the details!</p>
                <Button onClick={() => { setFormSubmitted(false); setAiResponse(null); form.reset(); }} className="mt-6">
                  Place Another Order
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground">Prefer to chat directly?</p>
            <Button asChild size="lg" className="mt-4 bg-green-500 hover:bg-green-600 text-white">
                <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Order on WhatsApp
                </a>
            </Button>
        </div>
      </div>
    </section>
  );
};
