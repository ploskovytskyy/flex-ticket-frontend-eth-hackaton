"use client";

import { hexToBigInt, parseEther, toHex } from "viem";
import { useAccount, useContractWrite, useNetwork } from "wagmi";
import { Connect } from "~/components/connect";
import { H1, H3, H4 } from "~/components/typography";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { abi } from "~/lib/abi";
import { contracts } from "~/lib/contracts";
import { dateToUint256, generateId } from "~/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DatePickerWithRange } from "~/components/ui/date-range";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Loader2, Settings, Ticket, Trash } from "lucide-react";
import { useToast } from "~/components/ui/use-toast";
import AddItem from "../../add-card";
import slugify from "slugify";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  tiers: z.array(
    z.object({
      id: z.string().min(1).optional(),
      name: z.string().min(1).optional(),
      symbol: z.string().min(1).optional(),
      initialPrice: z.string().min(1, { message: "Required" }).optional(),
      basePrice: z.string().min(1, { message: "Required" }).optional(),
      totalTickets: z.string().min(1, { message: "Required" }).optional(),
    })
  ),
});

const emptyTier = (): any => ({
  id: generateId(),
  name: "",
  symbol: "",
  initialPrice: "",
  basePrice: "",
  totalTickets: "",
});

type FormData = z.infer<typeof formSchema>;

export default function Page() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const chainBadge = chain?.name ?? chain?.id;
  const contractAddress = contracts[chain?.network || ""]?.address;
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      date: {
        from: undefined,
        to: undefined,
      },
      tiers: [emptyTier()],
    },
  });

  const { write, isLoading } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "registerEventWithFixedFee",
    value: parseEther("0.001"),
    onError(err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong",
        description: (
          <p>
            {(err as Error & { shortMessage: string })?.shortMessage ||
              err?.message ||
              "Unknown Error"}
          </p>
        ),
      });
    },
    onSuccess() {
      toast({
        title: "Hooray! Your transaction has been executed",
      });
      form.reset();
    },
  });

  function onSubmit(values: FormData) {
    console.log(values);

    const startDate = dateToUint256(values.date.from);
    const endDate = dateToUint256(values.date.to);

    write({
      args: [
        values.name,
        values.description,
        startDate,
        endDate,
        values.tiers.map((tier) => [
          tier.name,
          slugify(tier.name || ""),
          tier.symbol,
          +(tier.initialPrice || "0"),
          +(tier.basePrice || "0"),
          +(tier.totalTickets || "0"),
        ]),
        // [
        //   [
        //     "Full Ticket",
        //     "URI",
        //     "FT",
        //     hexToBigInt(toHex(20)),
        //     hexToBigInt(toHex(14)),
        //     hexToBigInt(toHex(100)),
        //   ],
        // ],
      ],
    });
  }

  return (
    <main className="py-10">
      {isConnected ? (
        <>
          <H1 className="flex items-center gap-5 mb-10 container">
            Create event
            <Badge variant="secondary">{chainBadge}</Badge>
          </H1>
          <hr className="mb-10" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
              <div className="grid gap-10 mb-20 container">
                <div className="grid gap-4 content-start">
                  <H3 className="mb-2 flex items-center">
                    <Settings className="w-6 mr-2" />
                    General info
                  </H3>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Event name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Event description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start and end date</FormLabel>
                        <FormControl>
                          <DatePickerWithRange date={field.value} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <hr />
                <div className="grid gap-4 content-start">
                  <H3 className="mb-2 flex items-center">
                    <Ticket className="w-7 h-7 mr-2" />
                    Ticket tiers
                  </H3>
                  <FormField
                    control={form.control}
                    name="tiers"
                    render={({ field }) => {
                      const tiers = field.value;
                      return (
                        <div className="grid lg:grid-cols-2 gap-5">
                          {tiers.length &&
                            tiers.map((tier, index) => (
                              <div
                                key={tier.id}
                                className="relative grid border gap-3 rounded-lg px-4 py-5 hover:border-slate-300 hover:shadow-lg transition-all"
                              >
                                {tiers.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      field.onChange(
                                        tiers
                                          .map((t, i) =>
                                            i === index ? null : t
                                          )
                                          .filter(Boolean)
                                      )
                                    }
                                    className="absolute -top-2 -right-2 w-8 h-8 grid place-content-center bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                                  >
                                    <Trash className="w-4 text-red-500" />
                                  </button>
                                )}
                                <FormField
                                  control={form.control}
                                  name={`tiers.${index}.name`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Name</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Tier name"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`tiers.${index}.symbol`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Symbol</FormLabel>
                                      <FormControl>
                                        <Input placeholder="ETH" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`tiers.${index}.basePrice`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Base price</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          placeholder="10"
                                          min={0}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`tiers.${index}.initialPrice`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Initial price</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          placeholder="15"
                                          min={0}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`tiers.${index}.totalTickets`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        Total amount of tickets
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          placeholder="30"
                                          min={0}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            ))}
                          <div
                            onClick={() =>
                              field.onChange([...tiers, emptyTier()])
                            }
                          >
                            <AddItem label="Add tier" />
                          </div>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>

              <div className="fixed grid bottom-0 p-4 w-full backdrop-blur-lg border-t">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="max-w-xs mx-auto w-full"
                >
                  {isLoading && <Loader2 className="w-5 mr-2 animate-spin" />}
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <div className="grid gap-5 max-w-lg px-5 py-5 rounded-lg border mx-auto my-40 text-center">
          <H3>Connect your wallet</H3>
          <Connect />
        </div>
      )}
    </main>
  );
}
