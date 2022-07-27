const QRCode = require("qrcode-svg");

module.exports = async function generateSvg({ id, name }) {
    // const qrDataUrl = await QRCode.toDataURL(
    //     JSON.stringify({ id, name })
    //   )
    const svg = new QRCode(JSON.stringify({ id, name })).svg("g");
    const output = `
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2">
    <path style="fill:#fef9ec" d="M0 0h600v800H0z"/>
    <use xlink:href="#a" width="599" height="80" transform="matrix(.92963 0 0 .92963 22 22)"/>
    <path style="fill:#53ac99" d="M0 116h600v624H0z" transform="matrix(1 0 0 .98071 0 4)"/>
    <text x="300" y="800" style="font-family:'Inter Regular', 'Inter-Regular','Inter',sans-serif;font-size:43.85px" transform="matrix(.55873 0 0 .55873 -140 326)">Admit one</text>
    <text x="167" y="800" style="font-family:'Inter Regular', 'Inter-Regular','Inter',sans-serif;font-size:43.85px" transform="matrix(.55873 0 0 .55873 287 326)">August 29, 2022</text>
    <g transform="matrix(.85413 0 0 .85413 44 44)">
      <path d="M530 200c0-22-18-39-40-39H110c-22 0-40 17-40 39v381c0 22 18 40 40 40h380c22 0 40-18 40-40V200Z" style="fill:#53ac99"/>
      <clipPath id="b">
        <path d="M530 200c0-22-18-39-40-39H110c-22 0-40 17-40 39v381c0 22 18 40 40 40h380c22 0 40-18 40-40V200Z"/>
      </clipPath>
      <g clip-path="url(#b)">
        <g transform="translate(70 161) scale(1.8)">
          ${svg}
        </g>
      </g>
    </g>
    <text x="138" y="630" text-anchor="middle" style="font-family:'Inter Regular', 'Inter-Regular', 'Inter',sans-serif;font-weight:700;font-size:70px;fill:#fff" transform="translate(232 316) scale(.51861)">${name}</text>
    ${id ? `<text x="30" y="630" text-anchor="middle" style="font-family:'Inter Regular', 'Inter-Regular','Inter',sans-serif;font-size:102.571px;fill:#fff" transform="translate(296 529) scale(.24284)">${id}</text>` :``}
    <defs>
      <image id="a" width="599" height="80" xlink:href="data:image/png;base64,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"/>
    </defs>
  </svg>`;
    return output
};
