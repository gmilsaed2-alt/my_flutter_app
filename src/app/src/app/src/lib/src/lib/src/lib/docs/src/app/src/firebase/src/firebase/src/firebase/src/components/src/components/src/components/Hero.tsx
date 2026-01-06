import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { STORE_SETTINGS } from '@/lib/data';

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <section className="relative h-[60vh] w-full text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <h1 className="font-headline text-4xl font-bold md:text-6xl drop-shadow-lg">
          {STORE_SETTINGS.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
          {STORE_SETTINGS.slogan}
        </p>
        <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/menu">اطلب الآن</Link>
        </Button>
      </div>
    </section>
  );
}
