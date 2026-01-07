import { SettingsForm } from "@/components/admin/SettingsForm";
import { STORE_SETTINGS } from "@/lib/data";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">إعدادات المتجر</h1>
      <SettingsForm settings={STORE_SETTINGS} />
    </div>
  );
}
