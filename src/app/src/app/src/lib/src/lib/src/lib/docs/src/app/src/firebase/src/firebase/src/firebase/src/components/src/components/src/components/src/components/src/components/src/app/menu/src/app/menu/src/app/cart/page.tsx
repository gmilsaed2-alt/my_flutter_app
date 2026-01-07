"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, totalItems } = useCart();

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="container flex-1 py-12">
        <h1 className="mb-8 text-center font-headline text-4xl font-bold">عربة التسوق</h1>

        {totalItems === 0 ? (
          <div className="text-center">
            <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
            <p className="mt-4 text-xl text-muted-foreground">عربة التسوق فارغة.</p>
            <Button asChild className="mt-6">
              <Link href="/menu">
                <ArrowLeft className="ml-2 h-4 w-4" />
                العودة إلى القائمة
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => {
                const productImage = PlaceHolderImages.find(img => img.id === item.productImageId);
                return (
                  <Card key={item.id} className="flex items-center p-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-md">
                      {productImage && (
                        <Image
                          src={productImage.imageUrl}
                          alt={item.productName}
                          fill
                          className="object-cover"
                          sizes="100px"
                          data-ai-hint={productImage.imageHint}
                        />
                      )}
                    </div>
                    <div className="flex-grow px-4">
                      <h3 className="font-bold">{item.productName}</h3>
                      <p className="text-sm text-muted-foreground">الحجم: {item.size.name}</p>
                      <p className="text-sm font-semibold">{item.price.toLocaleString('ar-EG')} ر.ي</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-20 text-center"
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
            
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">ملخص الطلب</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <span>إجمالي المنتجات</span>
                            <span>{totalItems}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>المجموع الكلي</span>
                            <span>{cartTotal.toLocaleString('ar-EG')} ر.ي</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                           <Link href="/checkout">إتمام الطلب</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>

          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
