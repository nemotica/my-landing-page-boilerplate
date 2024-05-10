import { defaultLocale, getDictionary } from "@/lib/i18n";
import CTA from "@/src/components/home/CTA";
import Calculator from "@/src/components/home/Caculator";
import FAQ from "@/src/components/home/FAQ";
import Hero from "@/src/components/home/Hero";
import SocialProof from "@/src/components/home/SocialProof";
import WallOfLove from "@/src/components/home/WallOfLove";

export default async function LangHome({
  params: { lang },
}: {
  params: { lang: string };
}) {
  // const langName = (lang && lang[0]) || defaultLocale;
  let langName =
    lang && lang[0] && lang[0] !== "index" ? lang[0] : defaultLocale;

  const dict = await getDictionary(langName);

  return (
    <>
      {/* Hero Section */}
      <Hero locale={dict.Hero} CTALocale={dict.CTAButton} />
      <SocialProof locale={dict.SocialProof} />
      {/* Can be used to display technology stack, partners, project honors, etc. */}
      {/* <ScrollingLogos /> */}

      {/* USP (Unique Selling Proposition) */}
      {/* <Feature id="Features" locale={dict.Feature} langName={langName} /> */}

      {/* Pricing */}
      {/* <Pricing id="Pricing" locale={dict.Pricing} langName={langName} /> */}

      {/* Fire Calculator */}
      {/* <Calculator id="Calculator" locale={dict.Calculator} /> */}
      <Calculator locale={dict.Calculator} />

      {/* Testimonials / Wall of Love */}
      <WallOfLove id="WallOfLove" locale={dict.WallOfLove} />

      {/* FAQ (Frequently Asked Questions) */}
      <FAQ id="FAQ" locale={dict.FAQ} langName={langName} />

      {/* CTA (Call to Action) */}
      <CTA locale={dict.CTA} CTALocale={dict.CTAButton} />
    </>
  );
}
