const zones = [
  {
    ID: 'CABA1',
    name: 'Capital Federal 1',
    region: 'CABA',
    supervisorId: 'GL'
  },
  {
    ID: 'CABA2',
    name: 'Capital Federal 2',
    region: 'CABA',
    supervisorId: 'FN'
  },
  {
    ID: 'INT01',
    name: 'Mar Del Plata',
    region: 'Buenos Aires',
    supervisorId: 'FN'
  },
  {
    ID: 'INT04',
    name: 'Bahía Blanca',
    region: 'Buenos Aires',
    supervisorId: 'FN'
  },
  { ID: 'INT05', name: 'Junin', region: 'Buenos Aires', supervisorId: 'CLT' },
  {
    ID: 'INT06',
    name: 'San Nicolas',
    region: 'Buenos Aires',
    supervisorId: 'AR'
  },
  { ID: 'INT07', name: 'Tandil', region: 'Buenos Aires', supervisorId: 'CLT' },
  {
    ID: 'INT08',
    name: 'Olavarria',
    region: 'Buenos Aires',
    supervisorId: 'CLT'
  },
  {
    ID: 'INT09',
    name: 'Pergamino',
    region: 'Buenos Aires',
    supervisorId: 'CLT'
  },
  { ID: 'INT10', name: 'Catamarca', region: 'Catamarca', supervisorId: 'GL' },
  { ID: 'INT11', name: 'Resistencia', region: 'Chaco', supervisorId: 'GL' },
  {
    ID: 'INT12',
    name: 'Comodoro Rivadavia',
    region: 'Chubut',
    supervisorId: 'DR'
  },
  { ID: 'INT13', name: 'Esquel', region: 'Chubut', supervisorId: 'MM' },
  { ID: 'INT14', name: 'Puerto Madryn', region: 'Chubut', supervisorId: 'MM' },
  { ID: 'INT15', name: 'Trelew', region: 'Chubut', supervisorId: 'DR' },
  { ID: 'INT16', name: 'Cordoba', region: 'Cordoba', supervisorId: 'RV' },
  { ID: 'INT17', name: 'Rio Cuarto', region: 'Cordoba', supervisorId: 'RV' },
  { ID: 'INT18', name: 'Villa Maria', region: 'Cordoba', supervisorId: 'RV' },
  { ID: 'INT19', name: 'Corrientes', region: 'Corrientes', supervisorId: 'GL' },
  {
    ID: 'INT20',
    name: 'Concepcion',
    region: 'Entre Rios',
    supervisorId: 'CLT'
  },
  { ID: 'INT21', name: 'Concordia', region: 'Entre Rios', supervisorId: 'CLT' },
  {
    ID: 'INT22',
    name: 'Gualeguaychu',
    region: 'Entre Rios',
    supervisorId: 'CLT'
  },
  { ID: 'INT23', name: 'Parana', region: 'Entre Rios', supervisorId: 'MMT' },
  { ID: 'INT24', name: 'Jujuy', region: 'Jujuy', supervisorId: 'CLT' },
  { ID: 'INT25', name: 'General Pico', region: 'La Pampa', supervisorId: 'DR' },
  { ID: 'INT26', name: 'Santa Rosa', region: 'La Pampa', supervisorId: 'DR' },
  { ID: 'INT27', name: 'La Rioja', region: 'La Rioja', supervisorId: 'GL' },
  { ID: 'INT28', name: 'Mendoza', region: 'Mendoza', supervisorId: 'RV' },
  { ID: 'INT29', name: ' San Rafael', region: 'Mendoza', supervisorId: 'RV' },
  { ID: 'INT30', name: 'Tunuyan', region: 'Mendoza', supervisorId: 'RV' },
  { ID: 'INT31', name: 'Posadas', region: 'Misiones', supervisorId: 'GL' },
  { ID: 'INT32', name: 'Neuquen', region: 'Neuquen', supervisorId: 'DR' },
  { ID: 'INT33', name: 'Viedma', region: 'Rio Negro', supervisorId: 'DR' },
  { ID: 'INT34', name: 'Cipoletti', region: 'Rio Negro', supervisorId: 'DR' },
  { ID: 'INT35', name: 'Bariloche', region: 'Rio Negro', supervisorId: 'DR' },
  {
    ID: 'INT36',
    name: 'General Roca',
    region: 'Rio Negro',
    supervisorId: 'DR'
  },
  { ID: 'INT37', name: 'Salta', region: 'Salta', supervisorId: 'GL' },
  { ID: 'INT38', name: 'San Juan', region: 'San Juan', supervisorId: 'RV' },
  { ID: 'INT39', name: 'San Luis', region: 'San Luis', supervisorId: 'RV' },
  {
    ID: 'INT40',
    name: 'Villa Mercedes',
    region: 'San Luis',
    supervisorId: 'RV'
  },
  { ID: 'INT41', name: 'Rafaela', region: 'Santa Fe', supervisorId: 'MM' },
  { ID: 'INT42', name: 'Santa Fe', region: 'Santa Fe', supervisorId: 'MMT' },
  { ID: 'INT43', name: 'Rosario', region: 'Santa Fe', supervisorId: 'AR' },
  {
    ID: 'INT44',
    name: 'Venado Tuerto',
    region: 'Santa Fe',
    supervisorId: 'MM'
  },
  {
    ID: 'INT45',
    name: 'Santiago Del Estero',
    region: 'Santiago Del Estero',
    supervisorId: 'RV'
  },
  { ID: 'INT46', name: 'Santa Cruz', region: 'Santa Cruz', supervisorId: 'DR' },
  {
    ID: 'INT47',
    name: 'Rio Grande',
    region: 'Tierra del Fuego',
    supervisorId: 'DR'
  },
  { ID: 'INT48', name: 'Tucuman', region: 'Tucuman', supervisorId: 'RV' },
  { ID: 'ZN1', name: 'GBA Norte 1', region: 'AMBA', supervisorId: 'DR' },
  { ID: 'ZN2', name: 'GBA Norte 2', region: 'AMBA', supervisorId: 'AR' },
  { ID: 'ZO', name: 'GBA Oeste', region: 'AMBA', supervisorId: 'MMT' },
  { ID: 'ZS', name: 'GBA Sur', region: 'AMBA', supervisorId: 'CLT' }
];

export default zones;
