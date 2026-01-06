import { STORE_SETTINGS } from "@/lib/data";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} {STORE_SETTINGS.name}. جميع الحقوق محفوظة.
          </p>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <Link href="/login" className="hover:underline">
            دخول المالك
          </Link>
        </div>
      </div>
    </footer>
  );
}
