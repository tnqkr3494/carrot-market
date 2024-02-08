import { cls } from "../libs/client/utils";

interface ButtonProps {
  large?: boolean;
  buy?: boolean;
  text: string;
  [key: string]: any;
}

export default function Button({
  large = false,
  buy = false,
  onClick,
  text,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={cls(
        "rounded-md border border-transparent px-4 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
        large ? "py-3 text-base" : "py-2 text-sm ",
        buy
          ? "bg-buy-color hover:bg-buy-color-bold focus:ring-buy-color"
          : "w-full  bg-orange-500  hover:bg-orange-600 focus:ring-orange-500",
      )}
    >
      {text}
    </button>
  );
}
