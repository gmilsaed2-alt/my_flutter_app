import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRODUCTS } from "@/lib/data";
import { Package, ReceiptText, Star } from "lucide-react";

export default function AdminDashboardPage() {
  const totalProducts = PRODUCTS.length;
  // Mock data for dashboard
  const totalOrders = 25;
  const featuredProducts = PRODUCTS.filter(p => p.featured).length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">لوحة التحكم</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلبات (مثال)</CardTitle>
            <ReceiptText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المنتجات المميزة</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featuredProducts}</div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <Card>
            <CardHeader>
                <CardTitle>مرحباً بك في لوحة التحكم</CardTitle>
            </CardHeader>
            <CardContent>
                <p>من هنا يمكنك إدارة منتجاتك، أسعارك، وصور متجرك بكل سهولة. استخدم القائمة الجانبية للتنقل بين الأقسام المختلفة.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
