"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useCollection } from "@/firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useFirestore, useMemoFirebase } from "@/firebase/provider";
import { Skeleton } from "../ui/skeleton";

export function ProductDataTable() {
  const { toast } = useToast();
  const firestore = useFirestore();

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'products');
  }, [firestore]);

  const { data: products, isLoading } = useCollection<Product>(productsQuery);

  const handleDelete = (productId: string, productName: string) => {
    if (!firestore) return;
    if (confirm(`هل أنت متأكد أنك تريد حذف منتج: ${productName}؟`)) {
      const docRef = doc(firestore, 'products', productId);
      deleteDoc(docRef)
        .then(() => {
          toast({
            title: "تم حذف المنتج بنجاح",
          });
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
          toast({
            title: "حدث خطأ أثناء الحذف",
            description: "الرجاء المحاولة مرة أخرى.",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>الاسم</TableHead>
            <TableHead>القسم</TableHead>
            <TableHead>السعر (صغير)</TableHead>
            <TableHead className="text-left">إجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                <TableCell className="text-left">
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
          {!isLoading && products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.sizes[0].price.toLocaleString('ar-EG')} ر.ي</TableCell>
              <TableCell className="text-left">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/products/edit/${product.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id, product.name)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       {!isLoading && products?.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          لم يتم العثور على منتجات. ابدأ بإضافة منتج جديد.
        </div>
      )}
    </div>
  );
}
