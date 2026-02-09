"use client";

import Link from "next/link";
import styles from "./TrustBadge.module.css";

interface NewsLogo {
  name: string;
  url: string;
  imageUrl: string;
  alt: string;
}

const newsLogos: NewsLogo[] = [
  {
    name: "Minyanville",
    url: "http://finance.minyanville.com/minyanville/news/article/marketersmedia-2026-1-12-alpha-capital-one-llc-reports-selective-buying-and-selling-activity-in-bitcoin-and-physical-gold",
    imageUrl: "https://www.brandpush.co/cdn-cgi/imagedelivery/gKm6BYVdHCj_SVQET_Msrw/b79268ce-3bb2-42ee-7919-7c650b840700/public",
    alt: "Featured on Minyanville",
  },
  {
    name: "The Chronicle Journal",
    url: "http://markets.chroniclejournal.com/chroniclejournal/news/article/marketersmedia-2026-1-12-alpha-capital-one-llc-reports-selective-buying-and-selling-activity-in-bitcoin-and-physical-gold",
    imageUrl: "https://www.brandpush.co/cdn-cgi/imagedelivery/gKm6BYVdHCj_SVQET_Msrw/ac708810-3bf8-4cd0-f934-a3f51cd64e00/public",
    alt: "Featured on The Chronicle Journal",
  },
  {
    name: "My Mother Lode",
    url: "https://money.mymotherlode.com/clarkebroadcasting.mymotherlode/news/article/marketersmedia-2026-1-12-alpha-capital-one-llc-reports-selective-buying-and-selling-activity-in-bitcoin-and-physical-gold",
    imageUrl: "https://www.brandpush.co/cdn-cgi/imagedelivery/gKm6BYVdHCj_SVQET_Msrw/d3e046d7-03ea-40d6-f101-13d5098e6700/public",
    alt: "Featured on My Mother Lode",
  },
];

const trustReefImageUrl = "https://www.brandpush.co/cdn-cgi/imagedelivery/gKm6BYVdHCj_SVQET_Msrw/3fb10293-8878-4ce5-5496-cef376fe9300/public";
const verifiedIconUrl = "https://www.brandpush.co/cdn-cgi/imagedelivery/gKm6BYVdHCj_SVQET_Msrw/5e5b9b47-6288-4640-2b2a-cd2459605c00/public";
const brandPushUrl = "https://www.brandpush.co?utm_source=Client+Referral&utm_medium=Trust+Badge&utm_campaign=Trust+Badge&utm_content=1765610600832";

export default function TrustBadge() {
  return (
    <div className="w-full mt-2.5">
      <div
        id="brandpush-trust-badge"
        className={`relative w-full bg-white min-h-[180px] mx-auto ${styles.trustBadgeContainer}`}
      >
        <div className={`text-center px-[5px] pb-2.5 font-sans font-semibold leading-[1.3] ${styles.titleSection}`}>
          <div className={`h-[58px] ${styles.titleWrapper}`}>
            <span className={styles.title}>
              AS SEEN ON
            </span>
          </div>
          <div className={styles.logoContainer}>
            <img
              src={trustReefImageUrl}
              alt="Trust Reef"
              className={`${styles.leaf} absolute h-[110px] left-6 m-0 p-0 z-0 opacity-20`}
            />
            <img
              src={trustReefImageUrl}
              alt="Trust Reef"
              className={`${styles.leaf} ${styles.leafFlipped} absolute h-[110px] right-6 m-0 p-0 z-0 opacity-20`}
            />
            <div className={styles.logoContainerItem}>
              <div className={styles.verticalCenter}>
                {newsLogos.map((logo) => (
                  <Link
                    key={logo.name}
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.newsLogoLink}
                  >
                    <img
                      src={logo.imageUrl}
                      alt={logo.alt}
                      className={styles.newsLogo}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-0 font-sans">
            <span className={styles.footer}>
              AND OVER 350 NEWS SITES
            </span>
            <div className="flex items-center justify-center text-[#717171] text-[10px] tracking-normal h-[15px] mt-0.5">
              <img
                src={verifiedIconUrl}
                alt="Verified"
                className="w-3 mr-1"
              />
              <span className="font-sans">
                Verified by{" "}
                <Link
                  href={brandPushUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#717171] hover:underline"
                >
                  BrandPush.co
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
