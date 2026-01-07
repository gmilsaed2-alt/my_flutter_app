"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Save, Loader2, Trash2 } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDoc } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase/provider';
import type { Product, Size } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const firestore = useFirestore();
    const { id } = params;

    const productRef = useMemoFirebase(() => {
        if (!firestore || !id) return null;
        return doc(firestore, 'products', id as string);
    }, [firestore, id]);

    const { data: product, isLoading: isProductLoading } = useDoc<Product>(productRef);
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [sizes, setSizes] = useState<Size[]>([{ name: 'صغير', price: 0 }]);
    const [featured, setFeatured] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setCategory(product.category);
            setSizes(product.sizes);
            setFeatured(product.featured || false);
        }
    }, [product]);

    const handleSizeChange = (index: number, field: 'name' | 'price', value: string | number) => {
        const newSizes = [...sizes];
        if (field === 'price') {
            newSizes[index][field] = Number(value);
        } else {
            newSizes[index][field] = value as 'صغير' | 'كبير' | 'قارورة';
        }
        setSizes(newSizes);
    };

    const addSize = () => {
        setSizes([...sizes, { name: 'كبير', price: 0 }]);
    };

    const removeSize = (index: number) => {
        const newSizes = sizes.filter((_, i) => i !== index);
        setSizes(newSizes);
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!productRef) return;
        setIsSaving(true);
        
        const updatedProductData = {
            name,
            description,
            category,
            sizes,
            featured,
        };

        try {
            await updateDoc(productRef, updatedProductData);
            toast({ title: "تم تحديث المنتج بنجاح!" });
            router.push('/admin/products');
        } catch (error) {
            console.error("Error updating product:", error);
            toast({ title: "حدث خطأ أثناء تحديث المنتج", variant: 'destructive' });
        } finally {
            setIsSaving(false);
        }
    };
    
    if (isProductLoading) {
        return <Loader2 className="mx-auto mt-16 h-8 w-8 animate-spin" />;
    }

    if (!product) {
        return <p className="text-center mt-16">لم يتم العثور على المنتج.</p>;
    }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">تعديل المنتج</h1>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>تفاصيل المنتج</CardTitle>
            <CardDescription>قم بتحديث الحقول أدناه لتعديل المنتج.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="product-name">اسم المنتج</Label>
              <Input id="product-name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-description">وصف المنتج</Label>
              <Textarea id="product-description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-category">القسم</Label>
                 <Select dir="rtl" value={category} onValueChange={setCategory}>
                  <SelectTrigger id="product-category">
                    <SelectValue placeholder="اختر قسمًا" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
               <div className="flex items-center space-x-2 space-x-reverse pt-8">
                  <Switch id="featured-switch" checked={featured} onCheckedChange={setFeatured} />
                  <Label htmlFor="featured-switch">منتج مميز؟</Label>
                </div>
            </div>
            
            <div className="space-y-4 rounded-md border p-4">
                <Label>الأحجام والأسعار</Label>
                {sizes.map((size, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 items-center">
                        <Input value={size.name} onChange={e => handleSizeChange(index, 'name', e.target.value)} placeholder="اسم الحجم" />
                        <Input type="number" value={size.price} onChange={e => handleSizeChange(index, 'price', e.target.value)} placeholder="السعر" />
                        {sizes.length > 1 && <Button type="button" variant="ghost" size="icon" onClick={() => removeSize(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={addSize}>إضافة حجم</Button>
            </div>

            <div className="space-y-2">
              <Label>صورة المنتج (قيد التطوير)</Label>
              <div className="flex items-center justify-center w-full">
                  <Label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-not-allowed bg-secondary/20">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground">
                          <Upload className="w-8 h-8 mb-4" />
                          <p className="mb-2 text-sm">رفع الصور غير متاح حاليًا في التعديل</p>
                      </div>
                      <Input id="dropzone-file" type="file" className="hidden" disabled />
                  </Label>
              </div> 
            </div>
             <Button type="submit" disabled={isSaving}>
                {isSaving ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Save className="ml-2 h-4 w-4" />}
                حفظ التغييرات
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
            }
