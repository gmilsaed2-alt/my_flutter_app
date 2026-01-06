'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, Lightbulb, ShoppingCart, GlassWater, Sandwich, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const quickActions = [
    {
      label: 'الأصناف المميزة',
      icon: Lightbulb,
      action: () => router.push('/#featured'),
    },
    {
      label: 'قسم العصائر',
      icon: GlassWater,
      action: () => router.push('/menu'), // In a real app, this could target the specific tab
    },
    {
      label: 'قسم السندوتشات',
      icon: Sandwich,
      action: () => router.push('/menu'),
    },
    {
      label: 'عربة التسوق',
      icon: ShoppingCart,
      action: () => router.push('/cart'),
    },
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-4 left-4 z-50 rounded-full w-16 h-16 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 flex items-center justify-center"
        >
          {isOpen ? <X className="h-8 w-8" /> : <Image src="/owner-photo.jpg" alt="AI Assistant" width={48} height={48} className="rounded-full object-cover w-12 h-12" />}
          <span className="sr-only">مساعد الذكاء الاصطناعي</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="start" className="w-80 rounded-xl mb-2">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">مساعدك الذكي</h4>
            <p className="text-sm text-muted-foreground">
              كيف يمكنني مساعدتك اليوم؟
            </p>
          </div>
          <div className="grid gap-2">
            {quickActions.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
