import { useAccount, useContractRead, useNetwork } from "wagmi";
import { abi } from "~/lib/abi";
import { contracts } from "~/lib/contracts";
import { Skeleton } from "./ui/skeleton";
import { Large } from "./typography";
import { cn } from "~/lib/utils";

type Props = {
  functionName: string;
  children: (props: { data: any[] }) => React.ReactNode;
  filterByAddress?: boolean;
  gridLayout?: boolean;
  args?: any[];
};

export default function ReadContract({
  functionName,
  children,
  filterByAddress,
  gridLayout = true,
  args = [],
}: Props) {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const contractAddress = contracts[chain?.network || ""]?.address;

  const { data, isLoading, error } = useContractRead({
    address: contractAddress,
    abi,
    functionName,
    args,
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div className="grid border rounded-lg px-4 py-5">
          <Skeleton className="h-[20px] mb-2" />
          <Skeleton className="h-[56px] mb-4" />
          <Skeleton className="h-[40px]" />
        </div>
        <div className="grid border rounded-lg px-4 py-5">
          <Skeleton className="h-[20px] mb-2" />
          <Skeleton className="h-[56px] mb-4" />
          <Skeleton className="h-[40px]" />
        </div>
        <div className="grid border rounded-lg px-4 py-5">
          <Skeleton className="h-[20px] mb-2" />
          <Skeleton className="h-[56px] mb-4" />
          <Skeleton className="h-[40px]" />
        </div>
        <div className="grid border rounded-lg px-4 py-5">
          <Skeleton className="h-[20px] mb-2" />
          <Skeleton className="h-[56px] mb-4" />
          <Skeleton className="h-[40px]" />
        </div>
      </div>
    );
  }

  if (!contractAddress) {
    return (
      <Large className="text-red-500">
        This chain is now available at the moment
      </Large>
    );
  }

  if (error) {
    return (
      <Large className="text-red-500">{error || "Something went wrong"}</Large>
    );
  }

  const filteredData = filterByAddress
    ? (data as any[]).filter((event) => event.owner === address)
    : (data as any[]);

  // console.log(filteredData);

  return (
    <div
      className={cn(
        gridLayout &&
          "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-start"
      )}
    >
      {!!filteredData ? children({ data: filteredData as any[] }) : null}
    </div>
  );
}
