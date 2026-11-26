# ANGKA.ID — Indonesia in Numbers

![make.fun entry](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)
![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/nandorp28/best-national-statistics-site-20261126-0539/rank.svg)
![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/nandorp28/best-national-statistics-site-20261126-0539/reward.svg)

An independent national statistics dashboard for **Indonesia** — 281.6 million people, 38 provinces, 17,380 islands — built for the [make.fun bounty](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

## What it is

A dense, working statistics site that runs entirely from static files: no build step, no network requests, no tracking. Every figure is a real published statistic, labelled with its source and year.

- **Dashboard** — six headline KPIs (population, GDP, inflation, unemployment, poverty, HDI), GDP growth and population charts with a working year-range control, the most populous provinces, sector shares, inflation trend, and the latest BPS releases.
- **Population** — 281.6m people in 2024, density, median age, life expectancy, fertility, year-by-year table.
- **Economy** — GDP Rp22,139 trillion, 5.03% growth, GDP by sector, exports US$264.7bn and a US$31.0bn trade surplus.
- **Prices & Inflation** — CPI 1.57% (Dec 2024), core inflation, the rupiah, and a plain-language guide to reading inflation.
- **Employment** — unemployment 4.76% (Feb 2025), labour force 153.05m, average wage Rp3.23m, informal share.
- **Poverty & Welfare** — poverty 8.47% (Mar 2025, lowest on record), poverty line Rp609,160/month, Gini 0.379.
- **Education & Health** — HDI 75.02, schooling 9.08 years, literacy 98.9%, stunting 19.8%.
- **Regions & Provinces** — the 20 most populous provinces, sortable by population, density or name, with a filter box; largest cities; Java vs the rest.
- **Data Tables** — all 36 headline indicators in one searchable, sortable table.
- **Sources & Methods** — every publisher and definition, in one place.

## Sources

Statistics Indonesia (BPS) for nearly every figure; Bank Indonesia for the rupiah and the inflation target; the Ministry of Health (SSGI) for stunting; BKPM for investment. ANGKA.ID is independent and is not affiliated with BPS or any government body.

## Run it

```sh
node serve.ts   # serves app/ on http://localhost:8080
```

Open `app/index.html` in desktop Chrome or on a phone — it works offline, from its own files only.

## Hand-in

`main.ts` (Node 22, stdlib only) copies `app/` and `screenshots/` to `/output` and writes `/output/dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
