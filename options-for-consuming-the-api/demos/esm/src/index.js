const elem = document.getElementById('viewDiv');

const btn = document.createElement('button');
btn.innerText = 'Open Map';

elem.appendChild(btn);

const itemId = 'b234a118ab6b4c91908a1cf677941702';

btn.addEventListener('click', loadMap);

async function loadMap() {
    btn.removeEventListener('click', loadMap);
    // import map loader
    const { initMap } = await import('./webmap');
    elem.removeChild(btn);
    initMap(itemId, elem);
}
