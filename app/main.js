// ANGKA.ID — router and views. All numbers come from data.js (BPS figures);
// charts are drawn by charts.js; province data loads on demand.
import { POPULATION, GDP_GROWTH, INFLATION, UNEMPLOYMENT, POVERTY, KPIS,
  SECTORS, TRADE, RELEASES, INDICATORS, TOP_PROVINCES, seriesInRange } from "./data.js";
import { lineChart, barChart, hbarRows } from "./charts.js";

const NAV = [
  ["", "Dashboard"], ["population", "Population"], ["economy", "Economy"],
  ["prices", "Prices & Inflation"], ["employment", "Employment"],
  ["poverty", "Poverty & Welfare"], ["education", "Education & Health"],
  ["regions", "Regions & Provinces"], ["tables", "Data Tables"], ["sources", "Sources & Methods"],
];
const SECTION_OF = { population: "Population", economy: "Economy", prices: "Prices",
  employment: "Employment", poverty: "Poverty", education: "Education", regions: "Regions" };

let yearFrom = 2015, yearTo = 2024;
let provSort = "pop", provDir = -1, provQuery = "";
let tableSort = "name", tableDir = 1, tableQuery = "", tableSection = "All";

const main = document.getElementById("main");
const navEl = document.getElementById("sidenav");
const searchEl = document.getElementById("topsearch");

function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
function fmt(n, d) { return Number(n).toLocaleString("en-US", { minimumFractionDigits: d == null ? 2 : d, maximumFractionDigits: d == null ? 2 : d }); }
function srcLine(text) { return '<p class="src">Source: ' + esc(text) + '</p>'; }
function kpiCards(list) {
  return '<div class="kpis">' + list.map(function (k) {
    return '<a class="kpi" href="' + k.route + '"><div class="k-label">' + esc(k.label) + '</div>' +
      '<div class="k-value">' + esc(k.value) + '</div><div class="k-delta">' + esc(k.delta) + '</div>' +
      '<div class="k-detail">' + esc(k.detail) + ' · ' + esc(k.source) + '</div></a>';
  }).join("") + "</div>";
}
function yearControls() {
  const opts = function (sel) {
    let o = "";
    for (let y = 2015; y <= 2024; y++) o += '<option value="' + y + '"' + (y === sel ? " selected" : "") + ">" + y + "</option>";
    return o;
  };
  return '<div class="controls"><label>Chart years:</label> from <select id="yfrom">' + opts(yearFrom) +
    '</select> to <select id="yto">' + opts(yearTo) + '</select>' +
    '<span class="muted">Charts and tables below follow this range.</span></div>';
}
function bindYears(rerender) {
  const f = document.getElementById("yfrom"), t = document.getElementById("yto");
  if (!f) return;
  const go = function () {
    yearFrom = Math.min(+f.value, +t.value); yearTo = Math.max(+f.value, +t.value);
    rerender();
  };
  f.addEventListener("change", go); t.addEventListener("change", go);
}
function sectionTable(rows, cols) {
  return "<table><thead><tr>" + cols.map(function (c) { return "<th" + (c.num ? ' class="num"' : "") + ">" + esc(c.h) + "</th>"; }).join("") +
    "</tr></thead><tbody>" + rows.map(function (r) {
      return "<tr>" + r.map(function (cell, i) { return '<td' + (cols[i].num ? ' class="num"' : "") + ">" + cell + "</td>"; }).join("") + "</tr>";
    }).join("") + "</tbody></table>";
}
function panel(title, inner, more) {
  return '<section class="panel"><h2>' + esc(title) + (more ? '<a class="more" href="' + more[1] + '">' + esc(more[0]) + ' →</a>' : "") +
    "</h2>" + inner + "</section>";
}
function topProvincesTable(limit) {
  const total = 281.60;
  const rows = TOP_PROVINCES.slice(0, limit || 8).map(function (p, i) {
    const share = (p.pop / total) * 100;
    return ["<span class='rank'>" + (i + 1) + "</span> " + esc(p.name),
      '<span class="bar-track"><span class="bar-fill" style="width:' + Math.round(share / 17.7 * 100) + '%"></span></span>' + fmt(p.pop) + "m",
      fmt(share, 1) + "%", fmt(p.density, 0) + " /km²"];
  });
  return sectionTable(rows, [{ h: "Province" }, { h: "Population 2024" }, { h: "Share", num: true }, { h: "Density", num: true }]) +
    srcLine("BPS, Population by Province, mid-year 2024.");
}

// ---------- Dashboard ----------
function renderDashboard() {
  const growth = seriesInRange(GDP_GROWTH, yearFrom, yearTo).map(function (p) { return { label: String(p.year), value: p.value }; });
  const pop = seriesInRange(POPULATION, yearFrom, yearTo).map(function (p) { return { label: String(p.year), value: p.value }; });
  const cpi = INFLATION.map(function (p) { return { label: String(p.year), value: p.value }; });
  main.innerHTML =
    "<h1>Indonesia in Numbers</h1>" +
    "<p class=\"muted\">281.6 million people, 38 provinces, 17,380 islands — the country's headline statistics, " +
    "each figure labelled with its source and year. Pick a section on the left, or search above.</p>" +
    yearControls() +
    kpiCards(KPIS) +
    '<div class="cols">' +
      panel("Real GDP growth, % per year", barChart(growth, { unit: "%", decimals: 2 }) +
        "<p class=\"muted\">The 2020 contraction (−2.07%) is the COVID-19 recession; growth has held above 5% since 2022.</p>" +
        srcLine("BPS, National Accounts, 2015–2024."), ["Economy", "#/economy"]) +
      panel("Most populous provinces", topProvincesTable(8), ["All regions", "#/regions"]) +
    "</div>" +
    '<div class="cols">' +
      panel("Population, millions", barChart(pop, { unit: "m", decimals: 0, color: "#1d5fa8" }) +
        srcLine("BPS, mid-year population estimates, 2015–2024."), ["Population", "#/population"]) +
      panel("Where GDP comes from, 2024", hbarRows(SECTORS, 100) +
        srcLine("BPS, GDP by industry, 2024. Manufacturing is the largest single sector at 18.9%.")) +
    "</div>" +
    '<div class="cols">' +
      panel("Latest releases", RELEASES.map(function (r) {
        return '<div class="release"><span class="date">' + esc(r.date) + '</span><span><span class="tag">' + esc(r.tag) +
          "</span>" + esc(r.title) + "</span></div>";
      }).join("") + srcLine("BPS release calendar, 2024–2025.")) +
      panel("Inflation, December year on year", lineChart(cpi, { unit: "%", decimals: 2, color: "#b3382e" }) +
        "<p class=\"muted\">Inflation spiked to 5.51% in 2022 after the fuel-subsidy adjustment, then fell back inside target.</p>" +
        srcLine("BPS, Consumer Price Index, 2019–2024."), ["Prices", "#/prices"]) +
    "</div>" +
    '<div class="panel"><h2>Explore the data</h2><div class="explore">' +
      [["Population", "281.6m people · density · age", "#/population"],
       ["Economy", "GDP, sectors, trade US$264.7bn", "#/economy"],
       ["Prices & Inflation", "CPI 1.57% · rupiah Rp16,162/$", "#/prices"],
       ["Employment", "4.76% jobless · 153m in work", "#/employment"],
       ["Poverty & Welfare", "8.47% poor · Gini 0.379", "#/poverty"],
       ["Education & Health", "HDI 75.02 · schooling 9.08 yrs", "#/education"],
       ["Regions & Provinces", "38 provinces, ranked & sortable", "#/regions"],
       ["Data Tables", "Every indicator, searchable", "#/tables"]].map(function (c) {
        return '<a href="' + c[2] + '"><b>' + c[0] + "</b><span>" + c[1] + "</span></a>";
      }).join("") + "</div></div>" +
    '<footer class="site">ANGKA.ID is an independent dashboard. Figures are published statistics from Statistics Indonesia (BPS), ' +
    "Bank Indonesia and the Ministry of Health; it is not affiliated with BPS. See Sources &amp; Methods for the full list.</footer>";
  bindYears(renderDashboard);
}

// ---------- Population ----------
function renderPopulation() {
  const pop = seriesInRange(POPULATION, yearFrom, yearTo).map(function (p) { return { label: String(p.year), value: p.value }; });
  const rows = POPULATION.filter(function (p) { return p.year >= yearFrom && p.year <= yearTo; }).map(function (p, i, a) {
    const prev = POPULATION[POPULATION.indexOf(p) - 1];
    const g = prev ? ((p.value / prev.value - 1) * 100).toFixed(2) + "%" : "—";
    return [String(p.year), fmt(p.value) + "m", g];
  });
  main.innerHTML = "<h1>Population</h1><p class=\"muted\">Indonesia is the world's fourth most populous country.</p>" + yearControls() +
    kpiCards([
      { label: "Population 2024", value: "281.6m", delta: "+1.05% on 2023", detail: "Mid-year estimate", source: "BPS, 2024", route: "#/population" },
      { label: "Density", value: "147.8 /km²", delta: "Land area 1,904,569 km²", detail: "Java holds 56% of people on 7% of land", source: "BPS, 2024", route: "#/regions" },
      { label: "Median age", value: "30.6 yrs", delta: "A young, working-age country", detail: "68% of people are 15–64", source: "BPS, 2024", route: "#/population" },
    ]) +
    '<div class="cols">' +
    panel("Population 2015–2024, millions", barChart(pop, { unit: "m", decimals: 0, color: "#1d5fa8" }) +
      srcLine("BPS, mid-year estimates. 2020 is the census count (270.20m).")) +
    panel("Life & family", "<p><b>Life expectancy:</b> 74.23 years (BPS, 2024).</p>" +
      "<p><b>Total fertility rate:</b> 2.14 children per woman (BPS, 2024) — just above replacement level.</p>" +
      "<p><b>Sex ratio:</b> 102.5 males per 100 females (BPS, 2024).</p>" +
      "<p><b>Largest city:</b> Jakarta, 10.56 million people (BPS, 2024).</p>" +
      srcLine("BPS, Population Statistics, 2024.")) +
    "</div>" +
    panel("Population by year", sectionTable(rows, [{ h: "Year" }, { h: "Population", num: true }, { h: "Growth", num: true }]) +
      srcLine("BPS, mid-year estimates, 2015–2024.")) +
    '<footer class="site">Next: <a href="#/economy">Economy →</a></footer>';
  bindYears(renderPopulation);
}

// ---------- Economy ----------
function renderEconomy() {
  const growth = seriesInRange(GDP_GROWTH, yearFrom, yearTo).map(function (p) { return { label: String(p.year), value: p.value }; });
  const rows = GDP_GROWTH.filter(function (p) { return p.year >= yearFrom && p.year <= yearTo; }).map(function (p) {
    return [String(p.year), fmt(p.value, 2) + "%"];
  });
  main.innerHTML = "<h1>Economy</h1><p class=\"muted\">Southeast Asia's largest economy — GDP Rp22,139 trillion in 2024.</p>" + yearControls() +
    kpiCards([
      { label: "GDP nominal 2024", value: "Rp22,139tn", delta: "US$1.40 trillion", detail: "Rp78.62m per person", source: "BPS, 2024", route: "#/economy" },
      { label: "Real growth 2024", value: "5.03%", delta: "2023: 5.05% · 2022: 5.31%", detail: "Household spending drove growth", source: "BPS, 2024", route: "#/economy" },
      { label: "Trade surplus 2024", value: "US$31.0bn", delta: "Exports US$264.7bn", detail: "Imports US$233.7bn", source: "BPS, 2024", route: "#/economy" },
    ]) +
    '<div class="cols">' +
    panel("Real GDP growth, % per year", barChart(growth, { unit: "%", decimals: 2 }) +
      srcLine("BPS, National Accounts, 2015–2024.")) +
    panel("GDP by sector, 2024", hbarRows(SECTORS, 100) +
      "<p class=\"muted\">Manufacturing, trade and agriculture together make up 44.4% of GDP.</p>" +
      srcLine("BPS, GDP by industry, 2024.")) +
    "</div>" +
    '<div class="cols">' +
    panel("Growth by year", sectionTable(rows, [{ h: "Year" }, { h: "Real GDP growth", num: true }]) +
      srcLine("BPS, National Accounts.")) +
    panel("Trade in 2024", "<p><b>Exports:</b> US$264.70 billion — coal (10.4%), palm oil (9.0%), iron &amp; steel (6.5%).</p>" +
      "<p><b>Imports:</b> US$233.66 billion.</p><p><b>Balance:</b> US$31.04 billion surplus, the fifth straight annual surplus.</p>" +
      "<p><b>Investment realised:</b> Rp1,714.2 trillion (BKPM, 2024).</p>" +
      srcLine("BPS International Trade; BKPM, 2024.")) +
    "</div>" +
    '<footer class="site">Next: <a href="#/prices">Prices &amp; Inflation →</a></footer>';
  bindYears(renderEconomy);
}

// ---------- Prices ----------
function renderPrices() {
  const cpi = INFLATION.map(function (p) { return { label: String(p.year), value: p.value }; });
  const rows = INFLATION.map(function (p) { return [String(p.year), fmt(p.value, 2) + "%"]; });
  main.innerHTML = "<h1>Prices &amp; Inflation</h1><p class=\"muted\">Consumer prices, the rupiah and what they mean for households.</p>" +
    kpiCards([
      { label: "CPI inflation", value: "1.57%", delta: "Dec 2024, year on year", detail: "Target: 2.5% ± 1", source: "BPS, Dec 2024", route: "#/prices" },
      { label: "Core inflation", value: "2.26%", delta: "Dec 2024, year on year", detail: "Excludes volatile food & administered prices", source: "BPS, Dec 2024", route: "#/prices" },
      { label: "Rupiah / US$", value: "Rp16,162", delta: "End of 2024", detail: "Bank Indonesia middle rate", source: "Bank Indonesia, 2024", route: "#/prices" },
    ]) +
    '<div class="cols">' +
    panel("CPI inflation, December year on year", lineChart(cpi, { unit: "%", decimals: 2, color: "#b3382e" }) +
      "<p class=\"muted\">The 2022 spike followed the subsidised-fuel price adjustment; by 2024 inflation was back near the bottom of the target band.</p>" +
      srcLine("BPS, Consumer Price Index, 2019–2024.")) +
    panel("Inflation by year", sectionTable(rows, [{ h: "Year" }, { h: "CPI inflation (Dec, yoy)", num: true }]) +
      srcLine("BPS, Consumer Price Index.")) +
    "</div>" +
    '<div class="note"><b>How to read it:</b> 1.57% means prices in December 2024 were 1.57% higher than in December 2023. ' +
    "Bank Indonesia's inflation target is 2.5%, plus or minus 1 percentage point.</div>" +
    '<footer class="site">Next: <a href="#/employment">Employment →</a></footer>';
}

// ---------- Employment ----------
function renderEmployment() {
  const u = UNEMPLOYMENT.map(function (p) { return { label: p.label.replace(" ", "\n"), value: p.value }; });
  const rows = UNEMPLOYMENT.map(function (p) { return [p.label, fmt(p.value, 2) + "%"]; });
  main.innerHTML = "<h1>Employment</h1><p class=\"muted\">Who works, who is looking for work, and what they earn.</p>" +
    kpiCards([
      { label: "Unemployment", value: "4.76%", delta: "Feb 2025 — lowest in the series", detail: "7.28m people looking for work", source: "BPS Sakernas", route: "#/employment" },
      { label: "Labour force", value: "153.05m", delta: "Participation 70.60%", detail: "145.77m people employed", source: "BPS Sakernas, Feb 2025", route: "#/employment" },
      { label: "Average wage", value: "Rp3.23m", delta: "Per month, employees", detail: "Informal work: 59.17% of jobs", source: "BPS Sakernas, Aug 2024", route: "#/employment" },
    ]) +
    '<div class="cols">' +
    panel("Open unemployment rate, %", barChart(u, { unit: "%", decimals: 2, color: "#a06a00" }) +
      "<p class=\"muted\">Unemployment peaked at 6.49% in August 2021, during the pandemic, and has fallen in every survey since.</p>" +
      srcLine("BPS, National Labour Force Survey (Sakernas), 2022–2025.")) +
    panel("Unemployment by survey", sectionTable(rows, [{ h: "Survey" }, { h: "Unemployment rate", num: true }]) +
      srcLine("BPS Sakernas. Surveys run every February and August.")) +
    "</div>" +
    '<footer class="site">Next: <a href="#/poverty">Poverty &amp; Welfare →</a></footer>';
}

// ---------- Poverty ----------
function renderPoverty() {
  const p = POVERTY.map(function (x) { return { label: x.label, value: x.value }; });
  const rows = POVERTY.map(function (x) { return [x.label, fmt(x.value, 2) + "%"]; });
  main.innerHTML = "<h1>Poverty &amp; Welfare</h1><p class=\"muted\">How many Indonesians live below the poverty line, and how unequal incomes are.</p>" +
    kpiCards([
      { label: "Poverty rate", value: "8.47%", delta: "23.85m people", detail: "March 2025 — lowest on record", source: "BPS, Mar 2025", route: "#/poverty" },
      { label: "Poverty line", value: "Rp609,160", delta: "Per person, per month", detail: "March 2025", source: "BPS, Mar 2025", route: "#/poverty" },
      { label: "Gini ratio", value: "0.379", delta: "March 2025", detail: "0 = perfect equality, 1 = total inequality", source: "BPS, Mar 2025", route: "#/poverty" },
    ]) +
    '<div class="cols">' +
    panel("Poverty rate, % of population", lineChart(p, { unit: "%", decimals: 2, color: "#0b6e4f" }) +
      "<p class=\"muted\">Poverty jumped above 10% in 2021, then fell in every release since — below 9% for the first time in September 2024.</p>" +
      srcLine("BPS, Poverty Statistics, 2019–2025.")) +
    panel("Poverty by release", sectionTable(rows, [{ h: "Release" }, { h: "Poverty rate", num: true }]) +
      srcLine("BPS. Releases run every March and September.")) +
    "</div>" +
    '<div class="note"><b>How to read it:</b> the poverty line (Rp609,160 per person per month, March 2025) is the minimum monthly spending ' +
    "needed for food and basic non-food needs. 8.47% of Indonesians spent less than that.</div>" +
    '<footer class="site">Next: <a href="#/education">Education &amp; Health →</a></footer>';
}

// ---------- Education & Health ----------
function renderEducation() {
  main.innerHTML = "<h1>Education &amp; Health</h1><p class=\"muted\">Schooling, literacy, health and human development.</p>" +
    kpiCards([
      { label: "Human Development Index", value: "75.02", delta: "+0.85 on 2023", detail: "High human development", source: "BPS, 2024", route: "#/education" },
      { label: "Life expectancy", value: "74.23 yrs", delta: "At birth, 2024", detail: "Up from 73.93 in 2023", source: "BPS, 2024", route: "#/education" },
      { label: "Mean schooling", value: "9.08 yrs", delta: "Adults 25+, 2024", detail: "Expected: 13.33 years", source: "BPS, 2024", route: "#/education" },
    ]) +
    '<div class="cols">' +
    panel("Education", "<p><b>Adult literacy (15+):</b> 98.9% (BPS, 2024).</p>" +
      "<p><b>Mean years of schooling:</b> 9.08 years — roughly the end of junior high (BPS, 2024).</p>" +
      "<p><b>Expected years of schooling:</b> 13.33 years for a child starting school today (BPS, 2024).</p>" +
      "<p><b>What it means:</b> each extra year of schooling is the slowest-moving, most reliable development indicator on this site.</p>" +
      srcLine("BPS, Education Statistics &amp; HDI, 2024.")) +
    panel("Health", "<p><b>Infant mortality:</b> 15.9 deaths per 1,000 live births (BPS, 2023).</p>" +
      "<p><b>Stunting (children under 5):</b> 19.8% — about one child in five (Ministry of Health, SSGI 2024).</p>" +
      "<p><b>Life expectancy:</b> 74.23 years, up 0.30 years on 2023 (BPS, 2024).</p>" +
      "<p><b>HDI:</b> 75.02 — the health, education and income index combined (BPS, 2024).</p>" +
      srcLine("BPS; Ministry of Health (SSGI), 2024.")) +
    "</div>" +
    '<footer class="site">Next: <a href="#/regions">Regions &amp; Provinces →</a></footer>';
}

// ---------- Regions (province data loads on demand) ----------
function renderRegions() {
  main.innerHTML = "<h1>Regions &amp; Provinces</h1><p class=\"muted\">Loading provincial data…</p>";
  import("./provinces.js").then(function (mod) {
    const rows = mod.PROVINCES.slice();
    const draw = function () {
      let list = rows.filter(function (p) { return p.name.toLowerCase().indexOf(provQuery.toLowerCase()) !== -1; });
      list.sort(function (a, b) {
        const va = provSort === "name" ? a.name : provSort === "density" ? mod.density(a) : a.pop;
        const vb = provSort === "name" ? b.name : provSort === "density" ? mod.density(b) : b.pop;
        return (va < vb ? -1 : va > vb ? 1 : 0) * provDir;
      });
      const total = 281.60;
      const body = list.map(function (p, i) {
        const share = (p.pop / total) * 100;
        return "<tr><td><span class='rank'>" + (i + 1) + "</span> " + esc(p.name) + "</td>" +
          '<td class="num">' + fmt(p.pop) + "m</td>" +
          '<td class="num">' + fmt(share, 1) + "%</td>" +
          '<td class="num">' + fmt(mod.density(p), 0) + " /km²</td>" +
          '<td class="num">' + fmt(p.area, 0) + " km²</td></tr>";
      }).join("");
      const sortBtn = function (key, label) {
        return '<button data-sort="' + key + '" class="' + (provSort === key ? "on" : "") + '">' + label +
          (provSort === key ? (provDir === -1 ? " ↓" : " ↑") : "") + "</button>";
      };
      main.innerHTML = "<h1>Regions &amp; Provinces</h1>" +
        '<p class="muted">Indonesia has 38 provinces. The 20 most populous are ranked below — click a column to sort, or type to filter.</p>' +
        '<div class="controls"><label>Sort by:</label>' + sortBtn("pop", "Population") + sortBtn("density", "Density") + sortBtn("name", "Name") +
        '<input type="search" id="provq" placeholder="Filter provinces…" value="' + esc(provQuery) + '" aria-label="Filter provinces"></div>' +
        '<div class="panel"><table><thead><tr><th>Province</th><th class="num">Population 2024</th><th class="num">Share</th>' +
        '<th class="num">Density</th><th class="num">Land area</th></tr></thead><tbody>' + body + "</tbody></table>" +
        srcLine("BPS, Population by Province, mid-year 2024. Density = population ÷ land area.") + "</div>" +
        '<div class="cols"><div class="panel"><h2>Largest cities, 2024</h2>' +
        sectionTable(mod.CITIES.map(function (c) { return [esc(c.name), fmt(c.pop) + "m"]; }),
          [{ h: "City" }, { h: "Population", num: true }]) + srcLine("BPS, 2024.") + "</div>" +
        '<div class="panel"><h2>Java vs the rest</h2><p>Java holds <b>56%</b> of the population on <b>7%</b> of the land — ' +
        "the densest large island on Earth. Jakarta's density, 15,904 people per km², is more than 100 times the national average.</p>" +
        "<p>At the other end, Papua's provinces average under 10 people per km².</p>" +
        srcLine("BPS, 2024.") + "</div></div>" +
        '<footer class="site">Next: <a href="#/tables">Data Tables →</a></footer>';
      main.querySelectorAll("[data-sort]").forEach(function (b) {
        b.addEventListener("click", function () {
          const k = b.getAttribute("data-sort");
          if (provSort === k) provDir = -provDir; else { provSort = k; provDir = k === "name" ? 1 : -1; }
          draw();
        });
      });
      const q = document.getElementById("provq");
      q.addEventListener("input", function () { provQuery = q.value; draw(); const nq = document.getElementById("provq"); nq.focus(); nq.setSelectionRange(nq.value.length, nq.value.length); });
    };
    draw();
  }).catch(function () {
    main.innerHTML = "<h1>Regions &amp; Provinces</h1><p>Provincial data could not be loaded. Please reload the page.</p>";
  });
}

// ---------- Data tables ----------
function renderTables() {
  const draw = function () {
    let list = INDICATORS.filter(function (i) {
      const q = tableQuery.toLowerCase();
      const hitQ = !q || i.name.toLowerCase().indexOf(q) !== -1 || i.section.toLowerCase().indexOf(q) !== -1;
      const hitS = tableSection === "All" || i.section === tableSection;
      return hitQ && hitS;
    });
    list.sort(function (a, b) {
      const va = tableSort === "year" ? String(a.year) : tableSort === "section" ? a.section : a.name;
      const vb = tableSort === "year" ? String(b.year) : tableSort === "section" ? b.section : b.name;
      return (va < vb ? -1 : va > vb ? 1 : 0) * tableDir;
    });
    const sections = ["All"].concat(Array.from(new Set(INDICATORS.map(function (i) { return i.section; }))));
    const sortBtn = function (key, label) {
      return '<button data-sort="' + key + '" class="' + (tableSort === key ? "on" : "") + '">' + label +
        (tableSort === key ? (tableDir === -1 ? " ↓" : " ↑") : "") + "</button>";
    };
    main.innerHTML = "<h1>Data Tables</h1><p class=\"muted\">Every headline indicator on this site — " + INDICATORS.length +
      " figures, each with its year and source. Search, filter by section, or sort.</p>" +
      '<div class="controls"><input type="search" id="tq" placeholder="Search indicators…" value="' + esc(tableQuery) + '" aria-label="Search indicators">' +
      '<select id="tsec">' + sections.map(function (s) { return '<option' + (s === tableSection ? " selected" : "") + ">" + s + "</option>"; }).join("") + "</select>" +
      sortBtn("name", "Name") + sortBtn("section", "Section") + sortBtn("year", "Year") + "</div>" +
      '<div class="panel"><table><thead><tr><th>Indicator</th><th>Value</th><th class="num">Year</th><th>Source</th><th>Section</th></tr></thead><tbody>' +
      list.map(function (i) {
        return "<tr><td>" + esc(i.name) + "</td><td><b>" + esc(i.value) + "</b></td><td class='num'>" + esc(i.year) +
          "</td><td>" + esc(i.source) + "</td><td>" + esc(i.section) + "</td></tr>";
      }).join("") + "</tbody></table><p class=\"muted\">" + list.length + " of " + INDICATORS.length + " indicators shown.</p></div>" +
      '<footer class="site">All figures: BPS unless stated. See <a href="#/sources">Sources &amp; Methods</a>.</footer>';
    const q = document.getElementById("tq");
    q.addEventListener("input", function () { tableQuery = q.value; draw(); const nq = document.getElementById("tq"); nq.focus(); nq.setSelectionRange(nq.value.length, nq.value.length); });
    document.getElementById("tsec").addEventListener("change", function (e) { tableSection = e.target.value; draw(); });
    main.querySelectorAll("[data-sort]").forEach(function (b) {
      b.addEventListener("click", function () {
        const k = b.getAttribute("data-sort");
        if (tableSort === k) tableDir = -tableDir; else { tableSort = k; tableDir = 1; }
        draw();
      });
    });
  };
  draw();
}

// ---------- Sources ----------
function renderSources() {
  main.innerHTML = "<h1>Sources &amp; Methods</h1><p class=\"muted\">Where every number comes from, and how this site is built.</p>" +
    '<div class="panel"><h2>Sources</h2><table><thead><tr><th>Publisher</th><th>What it supplied</th></tr></thead><tbody>' +
    [["Statistics Indonesia (BPS)", "Population, GDP, inflation, unemployment, poverty, Gini, HDI, schooling, trade, provincial data"],
     ["Bank Indonesia", "Rupiah per US dollar, end-2024; inflation target"],
     ["Ministry of Health (SSGI)", "Stunting prevalence, 2024"],
     ["Investment Coordinating Board (BKPM)", "Investment realisation, 2024"]].map(function (r) {
      return "<tr><td><b>" + r[0] + "</b></td><td>" + r[1] + "</td></tr>";
    }).join("") + "</tbody></table>" +
    "<p class=\"muted\">Figures are the headline numbers from each publisher's latest release as of 26 November 2026. " +
    "Where a publisher revises a figure, this site uses the revised value.</p></div>" +
    '<div class="panel"><h2>Methods &amp; notes</h2>' +
    "<p><b>Population:</b> mid-year estimates; 2020 is the census count. <b>GDP:</b> nominal in current rupiah; growth is real (constant-price) change. " +
    "<b>Inflation:</b> Consumer Price Index, December year on year, unless labelled core. <b>Unemployment:</b> open unemployment rate from the " +
    "National Labour Force Survey (Sakernas), run each February and August. <b>Poverty:</b> share of people spending below the poverty line; " +
    "the line is recalculated each March and September. <b>Gini:</b> 0 is perfect equality, 1 is total inequality.</p>" +
    "<p><b>Independence:</b> ANGKA.ID is an independent dashboard and is not affiliated with BPS, Bank Indonesia or any government body. " +
    "Figures are republished with their source named on every panel.</p></div>" +
    '<div class="panel"><h2>About this site</h2><p>Built as a static site: no build step, no network requests, no tracking. ' +
    "Charts are drawn in the browser from the data files, so every number on screen is a number in the source. " +
    "The site works on a desktop and on a phone.</p></div>";
}

// ---------- Search ----------
function runSearch(q) {
  const box = document.getElementById("searchbox");
  if (!box) return;
  if (!q || q.trim().length < 2) { box.innerHTML = ""; return; }
  const hits = INDICATORS.filter(function (i) {
    return (i.name + " " + i.section + " " + i.value).toLowerCase().indexOf(q.toLowerCase()) !== -1;
  }).slice(0, 8);
  box.innerHTML = hits.length ? '<div class="search-results"><b>' + hits.length + " result" + (hits.length > 1 ? "s" : "") + ' for “' + esc(q) + '”</b>' +
    hits.map(function (i) {
      const route = { Population: "#/population", Economy: "#/economy", Prices: "#/prices", Employment: "#/employment",
        Poverty: "#/poverty", Education: "#/education", Health: "#/education", Welfare: "#/poverty", Regions: "#/regions" }[i.section] || "#/tables";
      return '<a href="' + route + '"><b>' + esc(i.name) + "</b> — " + esc(i.value) + ' <span class="muted">(' + esc(i.source) + ", " + esc(i.year) + ")</span></a>";
    }).join("") + "</div>" : '<div class="search-results">No indicator matches “' + esc(q) + '”. Try “poverty”, “GDP” or “inflation”.</div>';
}

// ---------- Router ----------
const ROUTES = {
  "": renderDashboard, population: renderPopulation, economy: renderEconomy,
  prices: renderPrices, employment: renderEmployment, poverty: renderPoverty,
  education: renderEducation, regions: renderRegions, tables: renderTables, sources: renderSources,
};
function route() {
  const hash = (location.hash || "#/").replace(/^#\/?/, "");
  const key = hash.split("/")[0] in ROUTES ? hash.split("/")[0] : "";
  navEl.innerHTML = '<div class="navhead">Sections</div>' + NAV.map(function (n) {
    return '<a href="#/' + n[0] + '" class="' + (n[0] === key ? "active" : "") + '">' + esc(n[1]) + "</a>";
  }).join("");
  const box = document.createElement("div");
  box.id = "searchbox";
  main.innerHTML = "";
  ROUTES[key]();
  // Renderers replace main.innerHTML, so insert the search box after them.
  main.prepend(box);
  if (searchEl.value) runSearch(searchEl.value);
  window.scrollTo(0, 0);
}
searchEl.addEventListener("input", function () { runSearch(searchEl.value); });
searchEl.addEventListener("keydown", function (e) { if (e.key === "Enter") { location.hash = "#/tables"; tableQuery = searchEl.value; } });
window.addEventListener("hashchange", route);
route();
