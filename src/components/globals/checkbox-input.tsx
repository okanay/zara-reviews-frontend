import { Check } from "lucide-react";

type Props = React.ComponentProps<"input">;

export const Checkbox = ({ ref, ...props }: Props) => {
  return (
    <div className="inline-flex items-center">
      <div className="relative flex cursor-pointer items-center">
        <input
          {...props}
          ref={ref as never}
          type="checkbox"
          className="peer size-5 cursor-pointer appearance-none rounded-sm border border-neutral-300 transition-all checked:bg-primary-500 focus:ring-0"
        />
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-0 peer-checked:opacity-100">
          <Check className="size-3 stroke-neutral-50" />
        </span>
      </div>
    </div>
  );
};
