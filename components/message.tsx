import { cls } from "../libs/client/utils";

interface MessageProps {
  name?: string;
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
}

export default function Message({
  name,
  message,
  avatarUrl = "null",
  reversed,
}: MessageProps) {
  return (
    <div
      className={cls(
        "flex  items-start",
        reversed ? "flex-row-reverse space-x-2 space-x-reverse" : "space-x-2",
      )}
    >
      <div className="h-8 w-8 rounded-full bg-slate-400" />
      <div className="w-1/2">
        <div className={cls(reversed ? "text-end" : "")}>
          <span>{name}</span>
        </div>
        <div className="rounded-md border border-gray-300 p-2 text-sm text-gray-700">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
