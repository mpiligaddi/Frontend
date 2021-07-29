const products = [
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'TRADICIONAL X 400',
    id: 0
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'SERENISIMA TRADIC X 400',
    id: 1
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'SANCOR TRADIC X 400',
    id: 2
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'MILKAUT TRADIC X 400',
    id: 3
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'LIGHT X 400',
    id: 4
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'SERENISIMA LIGHT X 400',
    id: 5
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'SANCOR LIGHT X 402',
    id: 6
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'MILKAUT LIGHT X 403',
    id: 7
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'REPOSTERO X 400',
    id: 8
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'SERENISIMA REPOSTERO X 400',
    id: 9
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'SANCOR REPOSTERO X 402',
    id: 10
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'MILKAUT REPOSTERO X 403',
    id: 11
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'VIDRIO 480G',
    id: 12
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'PONCHO NEGRO VIDRIO 480G',
    id: 13
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'CACHAFAZ VIDRIO 480G',
    id: 14
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'VIDRIO X 890 GR',
    id: 15
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'CACHAFAZ VIDRIO X 890 GR',
    id: 16
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'LATA 1KG',
    id: 17
  },
  {
    chain: 'COTO',
    category: 'DULCE DE LECHE',
    description: 'SERENISIMA LATA 1KG',
    id: 18
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'TRACIONAL X 290GR',
    id: 19
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'CASANCREM TRAD X 290GR',
    id: 20
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'MENDICRIMTRAD X 290GR',
    id: 21
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'MILKAUT TRAD X 290GR',
    id: 22
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'LA PAULINA TRAD X 290GR',
    id: 23
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'TRADICIONAL X 480GR',
    id: 24
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'CASANCREM TRAD X 480GR',
    id: 25
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'MENDICRIMTRAD X 480GR',
    id: 26
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'MILKAUT TRAD X 480GR',
    id: 27
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'LA PAULINA TRAD X 480GR',
    id: 28
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'LIGHT X 290GR',
    id: 29
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'CASANCREM LIGHT X 290GR',
    id: 30
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'MENDICRIM LICHT X 290GR',
    id: 31
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'MILKAUT LICHT X 290GR',
    id: 32
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'LA PAULINA LIGHT X 290GR',
    id: 33
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'LIGTH X 480 GR',
    id: 34
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'CASANCREM LIGHT X 480GR',
    id: 35
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'MENDICRIM LICHT X 480GR',
    id: 36
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'MILKAUT LICHT X 480GR',
    id: 37
  },
  {
    chain: 'COTO',
    category: 'QUESO CREMA',
    description: 'LA PAULINA LIGHT X 480GR',
    id: 38
  },
  {
    chain: 'COTO',
    category: 'QUESO AZUL',
    description: 'CUÑA X 140GR',
    id: 39
  },
  {
    chain: 'COTO',
    category: 'QUESO AZUL',
    description: 'SANCOR CUÑA X 140GR',
    id: 40
  },
  {
    chain: 'COTO',
    category: 'QUESO AZUL',
    description: 'SERENISIMA CUÑA X 140GR%',
    id: 41
  }
];

console.log(products.map((product, id) => ({ ...product, id })));

export default products;
