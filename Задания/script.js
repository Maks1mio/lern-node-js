let Tr = 6;
let Td = 6;
let g = 0;

const panel = document.getElementById("panel")
const strokeTr = document.createElement('tr')
const strokeTd = document.createElement('td')

for (let i = 0; i < Tr; i++) {
    panel.append(strokeTr);
    for (let g = 0; g < Td; g++) {
        strokeTr.append(strokeTd[g]);
    }
}