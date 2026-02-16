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

export default function TrustBadge() {
  return (
    <div className="w-full mt-2.5">
      <div
        id="brandpush-trust-badge"
        className="relative w-full bg-black min-h-[180px] mx-auto rounded-none py-5 md:py-8"
      >
        <div className="text-white text-center px-[5px] pb-2.5 font-sans font-semibold leading-[1.3] text-sm sm:text-base md:text-lg">
          <div className="h-[58px] flex items-center justify-center w-full relative">
            <span className={`${styles.title} text-white`}>
              AS SEEN ON
            </span>
          </div>
          <div className="text-center mx-auto flex items-center justify-between flex-nowrap flex-row px-2.5 sm:px-4 md:px-5">
            <img
              src={trustReefImageUrl}
              alt="Trust Reef"
              className={`${styles.trustReef} hidden sm:block absolute h-[110px] left-6 m-0 p-0 z-0 opacity-20`}
            />
            <img
              src={trustReefImageUrl}
              alt="Trust Reef"
              className={`${styles.trustReef} ${styles.leafFlipped} hidden sm:block absolute h-[110px] right-6 m-0 p-0 z-0 opacity-20`}
            />
            <div className="w-full relative py-4 px-5 sm:py-5 sm:px-9 md:py-6 md:px-12">
              <div className="h-full flex flex-wrap flex-row justify-center items-center">
                {newsLogos.map((logo) => (
                  <Link
                    key={logo.name}
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block relative"
                  >
                    <img
                      src={logo.imageUrl}
                      alt={logo.alt}
                      className={`${styles.newsLogo} max-w-[50px] max-h-[33px] min-w-[40px] min-h-[14px] h-auto w-auto my-1 mx-2 overflow-visible min-[340px]:max-w-[60px] min-[340px]:my-2 sm:max-w-[70px] sm:max-h-[46px] sm:mx-3 md:max-w-[100px] md:max-h-[66px]`}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-0 font-sans">
            <span className={`${styles.footer} text-white`}>
              AND OVER 350 NEWS SITES
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
