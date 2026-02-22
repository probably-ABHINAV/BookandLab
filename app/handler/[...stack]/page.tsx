import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "@/lib/auth/stack";

export default function Handler(props: any) {
  return <StackHandler app={stackServerApp} {...props} />;
}
