import {
  Network,
  Mail,
  MapPin,
  Facebook,
  Github,
  Instagram,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";

export default function Footer() {
  const { t, p } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-serif text-xl font-semibold mb-4 flex items-center">
              <Network className="w-5 h-5 mr-2" />
              {t("footer.title")}
            </h3>
            <p className="text-white/80 leading-relaxed">
              {t("footer.description")}
            </p>

            <div className="mt-6 flex items-center gap-5">
              <a
                href="https://www.facebook.com/adam.gierczak.334"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.social.facebook")}
                className="text-white/80 hover:text-white transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/AdamBabinicz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.social.x")}
                className="text-white/80 hover:text-white transition-colors"
              >
                <FaXTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/AdamBabinicz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.social.github")}
                className="text-white/80 hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.nav.title")}</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link
                  href={p("home")}
                  className="hover:text-white transition-colors"
                >
                  {t("footer.nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href={p("tree")}
                  className="hover:text-white transition-colors"
                >
                  {t("footer.nav.tree")}
                </Link>
              </li>
              <li>
                <Link
                  href={`${p("familyBase")}/gierczak`}
                  className="hover:text-white transition-colors"
                >
                  {t("footer.nav.gierczak")}
                </Link>
              </li>
              <li>
                <Link
                  href={`${p("familyBase")}/ofiara`}
                  className="hover:text-white transition-colors"
                >
                  {t("footer.nav.ofiara")}
                </Link>
              </li>
              <li>
                <Link
                  href={p("gallery")}
                  className="hover:text-white transition-colors"
                >
                  {t("footer.nav.gallery")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.contact.title")}</h4>
            <div className="text-white/80 space-y-2">
              <a
                href="mailto:puaro@vp.pl"
                className="flex items-center hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                [puaro@vp.pl]
              </a>
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {t("footer.contact.location")}
              </p>
              <div className="pt-4">
                <p className="text-sm whitespace-pre-line">
                  {t("footer.contact.projectInfo")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-stone-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-white/60">
          <p>{t("footer.copyright", { year: currentYear })}</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <Link
              href={p("terms")}
              className="hover:text-white transition-colors"
            >
              {t("footer.nav.terms")}
            </Link>
            <Link
              href={p("privacy")}
              className="hover:text-white transition-colors"
            >
              {t("footer.nav.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
