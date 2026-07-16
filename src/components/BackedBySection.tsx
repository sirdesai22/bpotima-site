"use client";

import { motion } from "framer-motion";

type Logo = { name: string; src: string; fallback?: string };

const logos: Logo[] = [
  { name: "Lovable", src: "https://upload.wikimedia.org/wikipedia/commons/b/be/Lovable_Logo_%2B_Wordmark_Black.png", fallback: "Lovable" },
  { name: "Airalo", src: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Airalo_logo.svg", fallback: "Airalo" },
  {
    name: "Wrtn",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZYAAAB8CAMAAAB9jmb0AAAAkFBMVEX////3Lwj2EgD3JAD8xr/3KwD3HAD4Si3+39r4X076gXH/8O36hHT5hXv3Mwn//fz8taz4Uzj7opf9zsb+4Nv5b177loj2AAD/9/X9083+5eH7qZ78urH+6+j5a1f92dP5eWn5c2H4XUf6jH77pZv8wLf7nJD4Pxv4VUH4Qib4WEX5bFn7rqT3ORf4TjP6fGzZrD0QAAAJ10lEQVR4nO2d62LiKhSFExC0taO1aozWu20dx9a+/9sdL9UmcS8CqSHMHNZvssPmC5fABoLgH1KDhZT4Q9UZ+3/LY3FSHouT8liclMfipDwWJ+WxOCmPxUl5LE7KY3FSHouT8liclMfipDwWJ+WxOCmPxUl5LE7KY3FSHouT8liclMfipDwWJ+WxOCmPxUl5LE7KY3FSHouT8lic1D+EpUaqh5I3X8n0TZC8TZuvdY3zGU9GM9JU/J0GYBHTLsjGt4apd9FO0mqMmnE2sz+XpDR4Q8m7AzL9DCRvSkalZ79NsjiqRdPfa0GaYnLynRBgCQXpZMrMNPnCBukkeJJJsfkzf+7elg3ph3xCybuk5xJiaQmynO50s9ccb/dFz7kQpKFQCA0s+eL95EsN7ezzxiUbtKJZW9etXJEvcgRLe7zlkucUSfVYzlnhrB7B1t9Q5BucwDKKRA6T0Cksh9xwuazplHquSPMOYJk8ME63W2lLTmE5ZIjVbwGGtF09lieRW1FOllzDchhgTCdZd4xFWq4ay6wuNWrK0ZJ7WPbW2LN2+QORdivG8q4LxVEsYcgWPxyUkVarxfJpUCqOYgn5ZmQA4Vqk0SqxxEtp4L6rWPaDMlQmWiJtVogl7uj19WdLrmLZcxlmfTMQabJCLGZUHMay5/KDf0vSYnVY5iYtWOg0llCsi8+TkQYrw/JkWiAuYwm59tTflUh7VWEZGpeH01hCBmfi80SaqwhLTKdWyW0sISva7ZPWKsLyYNixhM5jETtzIkeR1qrBUqQ0HMcSyvcCTAKnsCyNmzD3sQhebBaGNFYJFvP+PnQfi6IolTK0VSKWqcaaF7+Wzlo+8VhaMr2Wr20HLGUnn/ko9PNC2qoCS0/d3x+Wy1t/+ve/skoE3aDIl87VQ1d60cAidtmnFndrlrdaJ8d/NZaVqrII2bp/RVFPF90qTszETtxdrZXrEGJp+PajSFNVYFFVFtl51ek5y8ZyD9K/7lSZZ0Wm+OlisI+FNnxKrbvYVxWWIHgZ4AojX+BjWLQl+1juYRsmPnRnYqvDEszwBEWhX0rSkn0s7Q1yS7S0AxYqxBJMMBdeIOKCNGQfywi1zkLoN81VYglGcLAsC0Qo0YasY3lEWNirvi+VYglekQt8Zfj+wBksaHhstGRRLZZgAXwQU/VzlEhD9rGg+TDWMPClYiwTUF2KrFKShuxjQQH5Rut7FWOBo0mZ+yN8JdqObSzxADhkNHNRNZYZqC4FFsPo0rCNBU0Omo0tq8bSrtN1vsC0GG3HNpYa/Z2JjZEvVWMJPulWTJqHJNN2bGMZ01j43MiXyrGAYX6BNRdDOyVhuY0/lWMBE3s8MsyAK1jeAZZHI18qxzICD34aZsAVLKi2/GVYmmD9zDyMjy4Oj4Wyk4ulTY/zRccwAx6LiR2P5cuux5IqDo+FsuOxfNn1WFLF4bFQdjyWL7seS6o4PBbKjkUsLbI44HYZOlDYYznpdljWZAbg6vOMxoIWFDyWo7vmWDpUueGZW3rWR6I4CI/l6K45lilVbngSJ6axoEbPYzm6a46FDDlRRP+TOYa1y2M5umuO5YUsEAbjS8noR7EDkdsey9Fdcyx00Bne8jcn10VRVLrHcnTXHAvdh+POha5dCKPHcnTXHEtMR2gNUGhTjcYIotLdwJJbnLeyczss9FBMMbaigzsY/UNpF0sPLA6aBpu6gOWNLBEcoPmHLGgwFrOLBSylG5eKC1hAKCCcFotALBRZXexiQUvppjHANrHEo+74sTZrZoeybbpzERz0LkMQ0kXu3LSLJQbBpnBuCMgalubjgjN2PBJ+t8p81w/050+X814fIKKT6o0sYwE7skw3mFjCEq+4vOweF5ztUhdCoNMjJMgFaMVCRkTa2sXS3qGD+M1C5u1geZeZjeOCLZMh12jbopyT7+6B6HpBdEd2sQR9tJPBrLpYwXLProuGi0Rz+4R2l8kO+ZXBI3PYItu3WsYCj1yQRsdGWsAyqdMD4MQVLU24GZO3qPtv4CbBkK8znatlLHAHptiYDMbKx9Kuow9o8D1fgs/1EKxPzHaBbRyH9HKeqmCWsTTwB2NyxEf5WBb42At5qQlgvH/KC1tdgXlVpZdRot+yjEVxqiLv6O9gKh3Li6IAhbhU7Eh1Zgnn/eyJK2DEc5IU88tGdMtYVIdfcaG9Pb5sLGAe8uz0ZdtFDP5FzvmR7PdbN9E6qU9k2w/B2fa5cUgPPt/SsIDtS6eXsk5Nr4cpG8tKfUbX93VnqmbpZJkz8Xt6/1zrDme9RoxPaDm7IPfp+6tnMrCmPCyq5vgAptUfd2c9QqmGumQszZwLNxJ/v1uNM9QPN5OdLs6LwIxNNjlHO9XLwgKPLDi/mGvdpFcuFjhePCdfX/oM0AnQ4hFYdtFVeVhyqz3wSOesylthQT+9FyVWSRTneV3nL8oZJeSpPCz4pCW1Rxax4N/Ei9uJE8je9Lkct2guza6OSOezNCzBc6HPxSaWSW5Bp/Za6l8GccSSM3pTqkQs6JiSHI8sYslvl9LHW2p//6cNzfgArVyViaVQr2cTC9hVndRHyuhOk8vXPvOZ/s1q2XyWiCW4K9C6OoallbZ6p9eOnbf/98xvkPjKZ5lYmjrXiGY9sogFz/Re0mfjiKZaXC6nMozWxfr9UrEEY/NmzCYWetNDKv1VqM69jkvfh2U04QS1+r2lYsmb3KA8cmskdh1v+EQsml099n2GSXtbpIctGUuwNeViE0uc+2tFuV3L78hTR8tEipOZkcrGgleZkEc2//JBTEvCbWoNYtLJ+9bSJ/50NW+FTuazZCzag5eLRzax5N2IAk7lb69yGrLMQUzNO42GL/3isrGY3cBrGQuMaTl7jQ7rG6pv4L46H+tZGl7iWT6WfZ5MJl+tYlH/8Yo6fsG7ULQC18eWjeZGFcYGlqChvCci45FVLOr5lIFqFTV+y0aXJfJHnCY3XDL9GmMFy77CaGfJMpaeoiaD6LyL4rc1cIs+5G+2lbr/15awBM1P/G2lPbKLRdGM8U7uTTVxbcuookZnLzZWPO9Kpq98WsKyb10joZMl21jgMgpHEflpxePFhkue9kxxJGZt/iHzK409LIcs9UOWd7eadSzBO9kZgzhWUqNatKjLY8D/4e44IaTqpNJ49tYXA3ZOS+rqQoNHRqZjt8Cyb8u60VQoc8S3yfSNAZkIxcp/q00/yKktjMTvnmALw1sq2+3JcPz+En1OO/X6Ou8c3HZzOH56WEyXuzqpTT/zwHhNplsb3BKSl6Xe+PnXtkPnp75Jnb3a+6AT5QaYt1v0g+QuweZDulkRcnM7d72Ka/Twceq7jzFFy9s0DV4/Vzx7ebjbtDr9aJyaB/sP25zkV0E4HZEAAAAASUVORK5CYII=",
  },
  { name: "Micro1", src: "https://m12.vc/wp-content/uploads/2025/10/micro1.png", fallback: "micro1." },
  {
    name: "Salmon",
    src: "data:image/png;base64,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",
  },
  { name: "File.ai", src: "https://cdn.prod.website-files.com/612df374be86e685b93400e5/686509532f39e9b85c249f78_Logo.svg", fallback: "File.ai" },
];

export default function BackedBySection() {
  return (
    <section className="border-b border-line py-16 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Antler_logo.svg"
            alt="Antler"
            className="h-8 mx-auto mb-4 opacity-70"
          />
          <h2 className="font-sans text-lg font-bold text-ink">
            Global early-stage VC behind the AI tools you already use
          </h2>
          <p className="font-mono text-xs text-ink-soft/60 mt-2">
            200+ companies across 25+ countries
          </p>
        </motion.div>
      </div>

      <div className="relative w-1/2 mx-auto overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10" />

        <div className="marquee-track flex w-max items-center gap-12 py-6">
          {[...logos, ...logos].map((logo, i) => (
            <div key={`${logo.name}-${i}`} className="portfolio-item shrink-0 h-8 w-28 flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.name}
                className="portfolio-item-logo max-h-full max-w-full object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                onError={logo.fallback ? (e) => {
                  const target = e.currentTarget;
                  const span = document.createElement("span");
                  span.className = "portfolio-item-text font-sans text-base font-semibold text-ink-soft/40 tracking-tight whitespace-nowrap";
                  span.textContent = logo.fallback!;
                  target.parentNode?.replaceChild(span, target);
                } : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
