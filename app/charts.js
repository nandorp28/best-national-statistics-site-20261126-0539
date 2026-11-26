// Hand-rolled SVG charts — no library, no network. Every chart is drawn from
// the data arrays in data.js, so the numbers on screen are the numbers in
// the source files.

function esc(v) {
  return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const lo = Math.floor(min / s) * s;
  const out = [];
  for (let v = lo; v <= max + s * 0.001; v += s) out.push(v);
  return out;
}

export function lineChart(points, opts) {
  const o = Object.assign({ width: 560, height: 210, unit: "", decimals: 1, color: "#0b6e4f", fill: true }, opts || {});
  const w = o.width, h = o.height, padL = 44, padR = 10, padT = 12, padB = 26;
  const vals = points.map(function (p) { return p.value; });
  let min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
  if (min > 0) min = Math.min(0, min - (max - min) * 0.15);
  else min -= (max - min) * 0.1;
  max += (max - min) * 0.08;
  const x = function (i) { return padL + (i * (w - padL - padR)) / Math.max(1, points.length - 1); };
  const y = function (v) { return padT + (1 - (v - min) / (max - min)) * (h - padT - padB); };
  const ticks = niceTicks(min, max, 4);
  let s = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Line chart">';
  ticks.forEach(function (t) {
    s += '<line x1="' + padL + '" y1="' + y(t).toFixed(1) + '" x2="' + (w - padR) + '" y2="' + y(t).toFixed(1) + '" stroke="#e2e8e2" stroke-width="1"/>';
    s += '<text x="' + (padL - 6) + '" y="' + (y(t) + 4).toFixed(1) + '" font-size="10" fill="#5b6b5e" text-anchor="end">' + t.toFixed(o.decimals) + o.unit + '</text>';
  });
  const line = points.map(function (p, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + y(p.value).toFixed(1); }).join(" ");
  if (o.fill) {
    s += '<path d="' + line + " L" + x(points.length - 1).toFixed(1) + " " + y(min).toFixed(1) + " L" + x(0).toFixed(1) + " " + y(min).toFixed(1) + ' Z" fill="' + o.color + '" opacity="0.12"/>';
  }
  s += '<path d="' + line + '" fill="none" stroke="' + o.color + '" stroke-width="2.5" stroke-linejoin="round"/>';
  points.forEach(function (p, i) {
    s += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(p.value).toFixed(1) + '" r="3.2" fill="#fff" stroke="' + o.color + '" stroke-width="2"/>';
    const anchor = i === 0 ? "start" : i === points.length - 1 ? "end" : "middle";
    const lx = i === 0 ? padL : i === points.length - 1 ? w - padR : x(i);
    s += '<text x="' + lx.toFixed(1) + '" y="' + (h - 8) + '" font-size="10" fill="#5b6b5e" text-anchor="' + anchor + '">' + esc(p.label) + '</text>';
  });
  const last = points[points.length - 1];
  s += '<text x="' + (x(points.length - 1) - 4).toFixed(1) + '" y="' + (y(last.value) - 9).toFixed(1) + '" font-size="12" font-weight="700" fill="' + o.color + '" text-anchor="end">' + last.value.toFixed(o.decimals) + o.unit + '</text>';
  return s + "</svg>";
}

export function barChart(rows, opts) {
  const o = Object.assign({ width: 560, height: 230, unit: "", decimals: 1, color: "#0b6e4f" }, opts || {});
  const w = o.width, h = o.height, padL = 44, padR = 46, padT = 10, padB = 26;
  const maxV = Math.max.apply(null, rows.map(function (r) { return r.value; })) * 1.08;
  const minV = Math.min(0, Math.min.apply(null, rows.map(function (r) { return r.value; })) * 1.15);
  const bw = (w - padL - padR) / rows.length;
  const y = function (v) { return padT + (1 - (v - minV) / (maxV - minV)) * (h - padT - padB); };
  let s = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Bar chart">';
  niceTicks(minV, maxV, 4).forEach(function (t) {
    s += '<line x1="' + padL + '" y1="' + y(t).toFixed(1) + '" x2="' + (w - padR) + '" y2="' + y(t).toFixed(1) + '" stroke="#e2e8e2"/>';
    s += '<text x="' + (padL - 6) + '" y="' + (y(t) + 4).toFixed(1) + '" font-size="10" fill="#5b6b5e" text-anchor="end">' + t.toFixed(0) + o.unit + '</text>';
  });
  rows.forEach(function (r, i) {
    const bx = padL + i * bw + bw * 0.14;
    const top = Math.min(y(0), y(r.value));
    const bh = Math.max(1, Math.abs(y(0) - y(r.value)));
    s += '<rect x="' + bx.toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + (bw * 0.72).toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="3" fill="' + (r.value < 0 ? "#b3382e" : o.color) + '"/>';
    const ly = r.value < 0 ? y(r.value) + 14 : y(r.value) - 5;
    s += '<text x="' + (bx + bw * 0.36).toFixed(1) + '" y="' + ly.toFixed(1) + '" font-size="10.5" font-weight="700" fill="' + (r.value < 0 ? "#b3382e" : "#243b2e") + '" text-anchor="middle">' + r.value.toFixed(o.decimals) + o.unit + '</text>';
    s += '<text x="' + (bx + bw * 0.36).toFixed(1) + '" y="' + (h - 8) + '" font-size="10" fill="#5b6b5e" text-anchor="middle">' + esc(r.label) + '</text>';
  });
  return s + "</svg>";
}

export function hbarRows(rows, maxVal) {
  const val = function (r) { return r.value == null ? r.share : r.value; };
  const max = maxVal || Math.max.apply(null, rows.map(val));
  return rows.map(function (r) {
    const v = val(r);
    const pct = Math.max(1.5, (v / max) * 100);
    return '<div class="hbar"><span class="hbar-name">' + esc(r.name) + '</span>' +
      '<span class="hbar-track"><span class="hbar-fill" style="width:' + pct.toFixed(1) + '%"></span></span>' +
      '<span class="hbar-val">' + v.toFixed(1) + '%</span></div>';
  }).join("");
}
