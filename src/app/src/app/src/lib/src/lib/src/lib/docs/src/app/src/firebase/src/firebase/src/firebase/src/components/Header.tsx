import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, UtensilsCrossed } from 'lucide-react';
import { CartButton } from './CartButton';
import { STORE_SETTINGS } from '@/lib/data';

export function Header() {
  const navItems = [
    { href: '/', label: 'الرئيسية' },
    { href: '/menu', label: 'قائمة الطعام' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/logo.svg" alt="Logo" width={24} height={24} className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block font-headline">
              {STORE_SETTINGS.name}
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">فتح القائمة</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-4">
                 <Image src="/logo.svg" alt="Logo" width={24} height={24} className="h-6 w-6" />
                <span className="font-bold font-headline">{STORE_SETTINGS.name}</span>
              </Link>
              <div className="flex flex-col space-y-3">
                {navItems.map(item => (
                  <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
            <CartButton />
        </div>
      </div>
    </header>
  );
}
