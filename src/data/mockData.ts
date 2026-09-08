import { 
  Article, 
  Category, 
  Topic, 
  Author, 
  Source, 
  Report, 
  Dossier, 
  IngestionItem, 
  TelemetryLog,
  AutomationConfig 
} from '../types';

export const CATEGORIES: Category[] = [
  {
    slug: 'geoai',
    name: 'GeoAI & Inteligência Artificial',
    shortName: 'GeoAI',
    description: 'Aplicações de machine learning, visão computacional e modelos de fundação geoespaciais aplicados ao território.',
    color: '#06b6d4',
    articleCount: 7
  },
  {
    slug: 'gis-cartografia',
    name: 'GIS / SIG & Cartografia',
    shortName: 'GIS & Mapas',
    description: 'Sistemas de informação geográfica, infraestrutura de dados espaciais, cartografia temática e ferramentas de análise.',
    color: '#38bdf8',
    articleCount: 6
  },
  {
    slug: 'sensoriamento-remoto',
    name: 'Sensoriamento Remoto & Observação da Terra',
    shortName: 'Sensoriamento',
    description: 'Monitoramento orbital, sensores ópticos, hiperespectrais e radar de abertura sintética (SAR).',
    color: '#10b981',
    articleCount: 5
  },
  {
    slug: 'satelites-newspace',
    name: 'Satélites & NewSpace',
    shortName: 'Satélites',
    description: 'Constelações de nanossatélites, veículos lançadores, infraestrutura orbital e o mercado espacial privado.',
    color: '#818cf8',
    articleCount: 6
  },
  {
    slug: 'drones-lidar',
    name: 'Drones, LiDAR & Fotogrametria',
    shortName: 'Drones & LiDAR',
    description: 'Veículos aéreos não tripulados, varredura a laser 3D aerotransportada e terrestre, e fotogrametria de alta precisão.',
    color: '#f59e0b',
    articleCount: 5
  },
  {
    slug: 'gnss-geodesia',
    name: 'GNSS, Geodésia & Posicionamento',
    shortName: 'GNSS & Geodésia',
    description: 'Constelações de posicionamento por satélite (GPS, Galileo, BeiDou, Glonass), redes RTK e referenciais geodésicos.',
    color: '#ec4899',
    articleCount: 4
  },
  {
    slug: 'digital-twins',
    name: 'Digital Twins, 3D & Nuvens de Pontos',
    shortName: 'Digital Twins 3D',
    description: 'Gêmeos digitais urbanos e industriais, malhas 3D texturizadas, BIM integrado a GIS e modelagem territorial.',
    color: '#a855f7',
    articleCount: 4
  },
  {
    slug: 'dados-abertos',
    name: 'Dados Abertos, OGC, APIs & Open Source',
    shortName: 'Dados & Open Source',
    description: 'Padrões abertos internacionais OGC, ecossistema QGIS, GDAL/OGR, Cloud Optimized GeoTIFF (COG) e APIs espaciais.',
    color: '#34d399',
    articleCount: 4
  },
  {
    slug: 'clima-ambiente',
    name: 'Clima, Meio Ambiente & Desastres',
    shortName: 'Clima & Desastres',
    description: 'Monitoramento do desmatamento, queimadas, secas extremas, enchentes, deslizamentos e modelagem climática.',
    color: '#14b8a6',
    articleCount: 6
  },
  {
    slug: 'agro-infra',
    name: 'Agricultura, Mineração & Infraestrutura',
    shortName: 'Agro & Infra',
    description: 'Agricultura de precisão, monitoramento de barragens, corredores logísticos, energia renovável e ferrovias.',
    color: '#eab308',
    articleCount: 4
  },
  {
    slug: 'mercado',
    name: 'Mercado, Empresas & Startups',
    shortName: 'Mercado Geo',
    description: 'Fusões, aquisições, venture capital no setor espacial, regulação geoespacial e tendências da indústria.',
    color: '#64748b',
    articleCount: 4
  }
];

export const TOPICS: Topic[] = [
  { slug: 'qgis', name: 'QGIS', description: 'O sistema de informação geográfica de código aberto mais adotado no mundo.', categorySlug: 'gis-cartografia', articleCount: 8 },
  { slug: 'arcgis', name: 'ArcGIS', description: 'Plataforma líder em soluções corporativas de SIG da Esri.', categorySlug: 'gis-cartografia', articleCount: 6 },
  { slug: 'copernicus', name: 'Copernicus', description: 'O ambicioso programa de observação da Terra da União Europeia e ESA.', categorySlug: 'sensoriamento-remoto', articleCount: 11 },
  { slug: 'sentinel', name: 'Sentinel', description: 'Família de satélites radar e ópticos da missão europeia Copernicus.', categorySlug: 'satelites-newspace', articleCount: 9 },
  { slug: 'landsat', name: 'Landsat', description: 'O programa contínuo de imageamento civil da Terra da NASA e USGS desde 1972.', categorySlug: 'sensoriamento-remoto', articleCount: 5 },
  { slug: 'lidar', name: 'LiDAR', description: 'Tecnologia de sensoriamento ativo que utiliza pulsos laser para criar nuvens de pontos 3D.', categorySlug: 'drones-lidar', articleCount: 7 },
  { slug: 'gnss', name: 'GNSS', description: 'Sistemas globais de navegação e determinação de coordenadas milimétricas.', categorySlug: 'gnss-geodesia', articleCount: 5 },
  { slug: 'geoai', name: 'GeoAI', description: 'Fusão de inteligência artificial profunda com modelos geoespaciais.', categorySlug: 'geoai', articleCount: 12 },
  { slug: 'mapbiomas', name: 'MapBiomas', description: 'Iniciativa brasileira de mapeamento anual da cobertura e uso da terra por satélite.', categorySlug: 'clima-ambiente', articleCount: 8 },
  { slug: 'inpe', name: 'INPE', description: 'Instituto Nacional de Pesquisas Espaciais do Brasil, pioneiro em sensoriamento remoto.', categorySlug: 'satelites-newspace', articleCount: 9 },
  { slug: 'nasa', name: 'NASA', description: 'Agência espacial americana e suas missões de ciência da Terra.', categorySlug: 'satelites-newspace', articleCount: 8 },
  { slug: 'esa', name: 'ESA', description: 'Agência Espacial Europeia, polo de inovação em radares SAR e astrofísica.', categorySlug: 'satelites-newspace', articleCount: 7 },
  { slug: 'ogc', name: 'OGC', description: 'Open Geospatial Consortium, organização que define padrões abertos globais.', categorySlug: 'dados-abertos', articleCount: 4 }
];

export const AUTHORS: Author[] = [
  {
    slug: 'redacao-geozine',
    name: 'Redação Geozine',
    role: 'Equipe Editorial & Inteligência Geoespacial',
    type: 'Redação Geozine',
    bio: 'Equipe multidisciplinar de engenheiros cartógrafos, geógrafos e jornalistas científicos dedicados à cobertura rigorosa das geotecnologias.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    expertise: ['Políticas Espaciais', 'Sensoriamento Remoto', 'Análise de Mercado', 'GeoAI'],
    articlesCount: 14,
    socials: { twitter: 'https://twitter.com/geozine_br', linkedin: 'https://linkedin.com/company/geozine', website: 'https://geozine.com.br' }
  },
  {
    slug: 'marcelo-fontes',
    name: 'Dr. Marcelo Fontes',
    role: 'Editor Técnico & Pesquisador em Sensoriamento',
    type: 'Especialista',
    bio: 'Doutor em Geodésia e Ciências Geodésicas pela UFPR com pós-doutorado em interferometria SAR pelo DLR na Alemanha. Pesquisa aplicações de radar na Amazônia.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    expertise: ['Interferometria SAR', 'Geodésia Espacial', 'Constelações Satelitais', 'LiDAR'],
    articlesCount: 7,
    socials: { linkedin: 'https://linkedin.com/in/marcelo-fontes-geo', twitter: 'https://twitter.com/mfontes_sar' }
  },
  {
    slug: 'camila-arantes',
    name: 'Dra. Camila Arantes',
    role: 'Analista Sênior de GeoAI & Modelagem Espacial',
    type: 'Especialista',
    bio: 'Especialista em visão computacional geoespacial e modelos fundacionais de observação da Terra. Docente e consultora de infraestruturas SIG abertas.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    expertise: ['Modelos de Fundação Geoespaciais', 'Visão Computacional', 'QGIS / GDAL', 'Digital Twins'],
    articlesCount: 6,
    socials: { linkedin: 'https://linkedin.com/in/camila-arantes-geoai', github: 'https://github.com/camila-geoai' }
  },
  {
    slug: 'lucas-neves',
    name: 'Lucas Neves',
    role: 'Repórter de Tecnologia e Drones',
    type: 'Colaborador',
    bio: 'Piloto certificado de VANTs profissionais e engenheiro ambiental. Cobre a interseção entre agrimensura digital, drones de pulverização e escaneamento laser.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    expertise: ['Drones Profissionais', 'Agricultura de Precisão', 'Fotogrametria', 'Nuvens de Pontos'],
    articlesCount: 5,
    socials: { twitter: 'https://twitter.com/lucasneves_drone', linkedin: 'https://linkedin.com/in/lucasneves-geo' }
  },
  {
    slug: 'automacao-editorial',
    name: 'Radar Automatizado Geozine',
    role: 'Módulo de Ingestão e Agregação Assistida',
    type: 'Automação editorial',
    bio: 'Pipeline algorítmico do Geozine configurado para monitoramento de feeds oficiais, boletins governamentais e repositórios acadêmicos pré-validados.',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80',
    expertise: ['Monitoramento de Feeds', 'Deduplicação de Notícias', 'Classificação Semântica', 'Indexação'],
    articlesCount: 8,
    socials: { website: 'https://geozine.com.br/metodologia-editorial' }
  }
];

export const SOURCES: Source[] = [
  {
    slug: 'inpe',
    name: 'INPE — Instituto Nacional de Pesquisas Espaciais',
    domain: 'inpe.br',
    url: 'http://www.inpe.br',
    country: 'Brasil',
    sourceType: 'Instituição pública',
    category: 'Sensoriamento Remoto & Satélites',
    description: 'Órgão federal brasileiro responsável por pesquisas em ciências espaciais, meteorologia orbital e sistemas de monitoramento do desmatamento (PRODES/DETER).',
    status: 'Ativa',
    lastChecked: 'Hoje, às 14:12 UTC',
    frequency: 'A cada 30 minutos',
    articlesCount: 9
  },
  {
    slug: 'esa-copernicus',
    name: 'ESA / Programa Copernicus',
    domain: 'copernicus.eu',
    url: 'https://www.copernicus.eu',
    country: 'União Europeia',
    sourceType: 'Agência espacial',
    category: 'Observação da Terra',
    description: 'Iniciativa da Comissão Europeia implementada pela ESA que fornece serviços operacionais de dados abertos para ambiente, segurança e clima.',
    status: 'Ativa',
    lastChecked: 'Hoje, às 14:00 UTC',
    frequency: 'A cada 15 minutos',
    articlesCount: 11
  },
  {
    slug: 'mapbiomas',
    name: 'Rede MapBiomas',
    domain: 'mapbiomas.org',
    url: 'https://brasil.mapbiomas.org',
    country: 'Brasil',
    sourceType: 'Iniciativa colaborativa',
    category: 'Clima & Uso da Terra',
    description: 'Rede multidisciplinar que produz séries históricas anuais de mapas de cobertura e transições do uso do solo no Brasil e América do Sul usando algoritmos em nuvem.',
    status: 'Ativa',
    lastChecked: 'Hoje, às 13:45 UTC',
    frequency: 'A cada 1 hora',
    articlesCount: 7
  },
  {
    slug: 'nasa-earthdata',
    name: 'NASA Earth Data & Science',
    domain: 'earthdata.nasa.gov',
    url: 'https://earthdata.nasa.gov',
    country: 'Estados Unidos',
    sourceType: 'Agência espacial',
    category: 'Geociências & Satélites',
    description: 'Repositório de dados abertos e missões de satélites científicos para estudos de hidrologia, atmosfera, criosfera e biosfera terrestre.',
    status: 'Ativa',
    lastChecked: 'Hoje, às 13:30 UTC',
    frequency: 'A cada 20 minutos',
    articlesCount: 6
  },
  {
    slug: 'ogc-consortium',
    name: 'Open Geospatial Consortium (OGC)',
    domain: 'ogc.org',
    url: 'https://www.ogc.org',
    country: 'Global',
    sourceType: 'Organização de padrões',
    category: 'Dados Abertos & Padrões',
    description: 'Consórcio internacional de indústria e governos que estabelece padrões abertos para interoperabilidade de sistemas de dados geoespaciais e APIs de mapas.',
    status: 'Ativa',
    lastChecked: 'Hoje, às 12:15 UTC',
    frequency: 'A cada 2 horas',
    articlesCount: 4
  },
  {
    slug: 'planet-labs',
    name: 'Planet Labs Newsroom',
    domain: 'planet.com',
    url: 'https://www.planet.com',
    country: 'Estados Unidos',
    sourceType: 'Empresa',
    category: 'NewSpace & Satélites',
    description: 'Operadora de uma das maiores constelações de imageamento diário da Terra em alta frequência temporal via nanossatélites.',
    status: 'Ativa',
    lastChecked: 'Hoje, às 11:20 UTC',
    frequency: 'A cada 45 minutos',
    articlesCount: 5
  },
  {
    slug: 'ibge',
    name: 'IBGE — Geociências e Cartografia',
    domain: 'ibge.gov.br',
    url: 'https://www.ibge.gov.br',
    country: 'Brasil',
    sourceType: 'Instituição pública',
    category: 'Geodésia & Cartografia',
    description: 'Órgão cartográfico oficial federal do Brasil, responsável pela Rede Geodésica Nacional, limites territoriais e o Sistema Cartográfico Nacional.',
    status: 'Ativa',
    lastChecked: 'Hoje, às 10:50 UTC',
    frequency: 'A cada 1 hora',
    articlesCount: 6
  },
  {
    slug: 'qgis-project',
    name: 'QGIS Project Community',
    domain: 'qgis.org',
    url: 'https://qgis.org',
    country: 'Global',
    sourceType: 'Portal especializado',
    category: 'Open Source GIS',
    description: 'Projeto colaborativo global sob a égide da OSGeo que desenvolve o desktop GIS e servidor de mapas open source de maior difusão mundial.',
    status: 'Ativa',
    lastChecked: 'Hoje, às 09:30 UTC',
    frequency: 'A cada 3 horas',
    articlesCount: 5
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-01',
    slug: 'nova-geracao-modelos-fundacao-geoespaciais-segmentacao-sar',
    title: 'Nova geração de modelos de fundação geoespaciais atinge 94% de precisão na segmentação contínua de radares SAR',
    subtitle: 'Arquitetura com atenção espacial auto-supervisionada supera limitações históricas causadas por ruído speckle em imagens Sentinel-1 e NISAR.',
    excerpt: 'Pesquisadores de consórcio internacional apresentaram uma nova família de pesos pré-treinados capazes de analisar simultaneamente séries temporais de radar e óptico para mapeamento de inundações em tempo quase real.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">A interpretação automatizada de imagens de Radar de Abertura Sintética (SAR) acaba de dar um salto significativo com a apresentação de uma nova geração de modelos de fundação treinados especificamente para propriedades de coerência de fase e retroespalhamento eletromagnético.</p>

      <h2>O fim do gargalo no tratamento de ruído speckle</h2>
      <p>Tradicionalmente, a análise de imagens SAR depende de complexas etapas prévias de filtragem de ruído speckle e decomposição polarimétrica, que comumente reduzem a resolução espacial efetiva. O novo modelo adota uma camada de atenção convolucional com atenção temporal cruzada, aprendendo a representar a física do sinal de retorno sem depender de filtros destrutivos.</p>

      <blockquote>
        "Pela primeira vez, conseguimos mapear limites de inundação sob cobertura de copas vegetais densas em menos de 12 segundos após a descida do dado bruto na estação receptora, preservando detalhes de 10 metros com coerência interferométrica intacta."
        <footer>— Equipe de desenvolvimento do consórcio internacional</footer>
      </blockquote>

      <h2>Integração com sensores ópticos em séries temporais</h2>
      <p>O avanço mais promissor reside na capacidade do modelo em realizar fusão tardia (late fusion) com sensores ópticos multiespectrais, como os instrumentos MSI a bordo do Sentinel-2 e OLI-2 do Landsat 9. Quando há nuvens, o modelo interpola o estado da cobertura com base na série SAR; havendo céu claro, combina as assinaturas de infravermelho de ondas curtas (SWIR) com o retroespalhamento polarimétrico VV/VH.</p>

      <div class="my-6 p-4 rounded-lg bg-slate-900/80 border border-cyan-500/20">
        <h4 class="text-cyan-400 font-mono text-sm uppercase mb-2">// Especificações Técnicas do Modelo</h4>
        <ul class="space-y-1 text-sm text-slate-300">
          <li><strong>Parâmetros:</strong> 1.4 bilhão de pesos (versão Geo-Foundation SAR-Large)</li>
          <li><strong>Dataset de pré-treino:</strong> 3.8 milhões de quilômetros quadrados de cenas globais Sentinel-1 GRD/SLC</li>
          <li><strong>Compatibilidade:</strong> Exportável em ONNX para inferência em nós de borda (edge computing em estações terrenas)</li>
          <li><strong>Licença:</strong> Pesos abertos sob licença Apache 2.0 para pesquisa e uso governamental</li>
        </ul>
      </div>

      <h2>Aplicações imediatas para defesa civil e meio ambiente</h2>
      <p>A Defesa Civil e agências ambientais na América Latina e Ásia já iniciaram testes pilotos utilizando a tecnologia. Em cenários de calamidade hidroclimática, como as cheias extremas registradas nos últimos anos, a capacidade de delimitar com exatidão a mancha de inundação mesmo em tempestades noturnas pode reduzir o tempo de resposta humanitária em até 60%.</p>
    `,
    category: 'geoai',
    categoryName: 'GeoAI & Inteligência Artificial',
    tags: ['GeoAI', 'Copernicus', 'Sentinel', 'Sensoriamento Remoto', 'SAR'],
    sourceName: 'ESA / Programa Copernicus',
    sourceSlug: 'esa-copernicus',
    sourceUrl: 'https://www.copernicus.eu',
    sourceType: 'Agência espacial',
    originalPublishedAt: '2026-09-08T09:30:00Z',
    publishedAt: '2026-09-08T10:15:00Z',
    updatedAt: '2026-09-08T11:00:00Z',
    author: {
      name: 'Dra. Camila Arantes',
      slug: 'camila-arantes',
      role: 'Analista Sênior de GeoAI',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
      type: 'Especialista'
    },
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Visualização computacional de retroespalhamento de radar orbital sobre continente com gradientes de textura',
    imageCredit: 'Visualização gerada por processamento de dados Copernicus Sentinel-1',
    aiGeneratedImage: false,
    country: 'Global',
    region: 'Global',
    latitude: 50.1109,
    longitude: 8.6821,
    readingTime: 6,
    featured: true,
    breaking: false,
    reviewStatus: 'Revisão humana',
    relatedArticleIds: ['art-02', 'art-03', 'art-09'],
    keyTakeaways: [
      'Novo modelo de fundação espacial treinado em dados de radar SAR alcança 94% de precisão sem depender de filtros prévios de ruído speckle.',
      'Arquitetura permite fusão multimodal automática com satélites ópticos como Sentinel-2 e Landsat 9.',
      'O tempo de delimitação de inundações sob chuva e nuvens cai de horas para apenas 12 segundos por cena de 100 km.',
      'Pesos foram liberados sob licença aberta para uso por órgãos de defesa civil e monitoramento ambiental.'
    ],
    references: [
      { title: 'Artigo técnico do consórcio: Foundation Models for Spaceborne Synthetic Aperture Radar', url: 'https://copernicus.eu/publications/sar-foundation-2026' },
      { title: 'Repositório de pesos e documentação de inferência', url: 'https://github.com/esa-sar-foundation' }
    ],
    viewsCount: 4820
  },
  {
    id: 'art-02',
    slug: 'inpe-consolida-novo-satelite-amazonia-1b-e-anuncia-sensor-lidar',
    title: 'INPE conclui revisão preliminar do Amazônia-1B e confirma estudos para sensor LiDAR orbital nacional',
    subtitle: 'Nova plataforma nacional terá maior resolução geométrica de 15 metros e canal espectral infravermelho de ondas curtas (SWIR).',
    excerpt: 'Em coletiva técnica realizada em São José dos Campos, o Instituto Nacional de Pesquisas Espaciais detalhou o cronograma da missão que dará continuidade ao monitoramento da cobertura vegetal e recursos hídricos.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">O Instituto Nacional de Pesquisas Espaciais (INPE) concluiu com sucesso a Revisão Preliminar de Projeto (PDR) do satélite Amazônia-1B, marcando o início da fabricação dos subsistemas de engenharia nas instalações de São José dos Campos (SP).</p>

      <h2>Evolução sobre a plataforma PMM</h2>
      <p>O Amazônia-1B é o segundo elemento baseado na Plataforma Multi-Missão (PMM) brasileira. Em relação ao seu antecessor, o Amazônia-1 lançado em 2021, o novo veículo trará uma câmera aprimorada capaz de entregar resolução espacial de 15 metros na banda pancromática e 30 metros nas bandas multiespectrais, em faixa de varredura útil de 700 quilômetros.</p>

      <h2>Estudos de perfilamento laser para a Amazônia</h2>
      <p>A grande novidade revelada pela equipe de engenharia espacial foi a aprovação da fase conceitual de um instrumento de perfilamento laser orbital (LiDAR), projetado para medir a altura das copas florestais e o relevo sob a vegetação densa, atuando de maneira sinérgica ao instrumento GEDI da NASA.</p>

      <blockquote>
        "Ter a capacidade soberana de mensurar biomassa florestal e relevo sob a copa por meio de altimetria laser é um divisor de águas para o inventário de carbono e a cartografia de precisão do Brasil."
        <footer>— Coordenação Geral de Engenharia, Tecnologia e Ciências Espaciais do INPE</footer>
      </blockquote>

      <p>O lançamento do Amazônia-1B está previsto para a janela de 2027-2028 a partir do Centro Espacial de Alcântara ou por meio de contrato de lançamento em órbita polar síncrona com o Sol a 752 km de altitude.</p>
    `,
    category: 'satelites-newspace',
    categoryName: 'Satélites & NewSpace',
    tags: ['INPE', 'Satélites', 'LiDAR', 'Sensoriamento Remoto', 'Brasil'],
    sourceName: 'INPE — Instituto Nacional de Pesquisas Espaciais',
    sourceSlug: 'inpe',
    sourceUrl: 'http://www.inpe.br',
    sourceType: 'Instituição pública',
    originalPublishedAt: '2026-09-08T08:15:00Z',
    publishedAt: '2026-09-08T09:00:00Z',
    author: {
      name: 'Dr. Marcelo Fontes',
      slug: 'marcelo-fontes',
      role: 'Editor Técnico',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
      type: 'Especialista'
    },
    heroImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Satélite artificial em órbita com a Terra ao fundo mostrando a América do Sul',
    imageCredit: 'Conceito artístico da missão / INPE / Divulgação oficial',
    aiGeneratedImage: false,
    country: 'Brasil',
    region: 'Brasil',
    latitude: -23.2104,
    longitude: -45.8756,
    readingTime: 5,
    featured: true,
    breaking: false,
    reviewStatus: 'Revisão humana',
    relatedArticleIds: ['art-01', 'art-04', 'art-07'],
    keyTakeaways: [
      'Revisão preliminar do satélite Amazônia-1B concluída no Laboratório de Integração e Testes do INPE.',
      'Resolução espacial aprimorada de 15 metros e nova banda espectral SWIR para discriminação de umidade e biomassa.',
      'Anunciado estudo de viabilidade para instrumento LiDAR orbital nacional para mensuração de carbono florestal.',
      'Reforço direto aos sistemas DETER e PRODES da Amazônia e do Cerrado.'
    ],
    references: [
      { title: 'Boletim da Coordenação Espacial do INPE', url: 'http://inpe.br/noticias/amazonia1b-pdr' }
    ],
    viewsCount: 3940
  },
  {
    id: 'art-03',
    slug: 'qgis-lanca-versao-3-42-suporte-nativo-cog-geoparquet-gpugis',
    title: 'QGIS lança versão 3.42 com aceleração de renderização por GPU e leitura nativa ultrarrápida de GeoParquet',
    subtitle: 'Atualização do software livre traz melhorias profundas de performance para projetos com bilhões de vetores e nuvens de pontos 3D.',
    excerpt: 'A comunidade global do QGIS disponibilizou a mais recente versão estável de curto prazo (STR), introduzindo um novo subsistema de visualização vetorial em GPU e suporte direto ao padrão OGC GeoParquet 1.1.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">O projeto QGIS disponibilizou oficialmente a versão 3.42, consolidando um dos saltos de desempenho mais aguardados pela comunidade de SIG corporativo e pesquisadores de big data espacial.</p>

      <h2>GeoParquet no centro da estratégia de dados</h2>
      <p>Com a rápida ascensão do formato Apache Parquet com metadados geoespaciais (GeoParquet), o QGIS agora realiza carregamento direto de arquivos locais e remotos no padrão OGC com leitura colunar paralela. Testes de benchmark com a base territorial cadastral do Brasil apontaram velocidade de abertura 8 vezes superior ao formato tradicional GeoPackage e 24 vezes mais rápida que Shapefiles legados.</p>

      <h2>Renderização acelerada por GPU</h2>
      <p>Outro marco é o motor gráfico reescrito sobre Vulkan e Metal, que transfere o processamento de estilos de simbologia complexa — como sombreamento de relevo analítico (hillshade) e polígonos densos com hachuras — diretamente para a placa de vídeo.</p>

      <div class="my-6 p-4 rounded-lg bg-slate-900 border border-slate-700">
        <h4 class="text-emerald-400 font-mono text-sm uppercase mb-2">// Destaques do Changelog 3.42</h4>
        <ul class="list-disc pl-5 space-y-1 text-sm text-slate-300">
          <li>Leitura e escrita nativa de GeoParquet 1.1 sem dependência de drivers experimentais do GDAL.</li>
          <li>Suporte aprimorado para Cloud Optimized Point Clouds (COPC) com carregamento sob demanda em janelas 3D.</li>
          <li>Nova ferramenta de snapping topológico com algoritmo R-Tree dinâmico em memória.</li>
          <li>Integração direta com endpoints OGC API - Features e OGC API - Tiles.</li>
        </ul>
      </div>

      <p>A versão já está disponível para download nos repositórios oficiais para Linux, Windows e macOS.</p>
    `,
    category: 'gis-cartografia',
    categoryName: 'GIS / SIG & Cartografia',
    tags: ['QGIS', 'Open Source', 'OGC', 'GIS & Mapas', 'Dados Abertos'],
    sourceName: 'QGIS Project Community',
    sourceSlug: 'qgis-project',
    sourceUrl: 'https://qgis.org',
    sourceType: 'Portal especializado',
    originalPublishedAt: '2026-09-07T14:00:00Z',
    publishedAt: '2026-09-07T15:30:00Z',
    author: {
      name: 'Redação Geozine',
      slug: 'redacao-geozine',
      role: 'Equipe Editorial',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
      type: 'Redação Geozine'
    },
    heroImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Interface com visualização cartográfica de curvas de nível e malha vetorial de alta densidade',
    imageCredit: 'Captura de tela demonstrativa da interface de testes QGIS 3.42',
    aiGeneratedImage: false,
    country: 'Global',
    region: 'Global',
    latitude: 46.8182,
    longitude: 8.2275,
    readingTime: 4,
    featured: true,
    breaking: false,
    reviewStatus: 'Verificado pela redação',
    relatedArticleIds: ['art-06', 'art-10', 'art-14'],
    keyTakeaways: [
      'QGIS 3.42 introduz renderização vetorial pesada acelerada por GPU via API gráfica moderna.',
      'Suporte pleno ao padrão GeoParquet com carregamento até 24 vezes mais rápido em bases de dados massivas.',
      'Novos recursos nativos para nuvens de pontos 3D no padrão aberto COPC.',
      'Compatibilidade aprimorada com a suíte moderna de padrões OGC API.'
    ],
    references: [
      { title: 'Notas de lançamento oficiais do QGIS 3.42', url: 'https://qgis.org/en/site/forusers/visualchangelog342/' }
    ],
    viewsCount: 5120
  },
  {
    id: 'art-04',
    slug: 'mapbiomas-lanca-colecao-inedita-dinamica-recursos-hidricos-radar',
    title: 'MapBiomas Água publica mapeamento diário de superfície de corpos hídricos utilizando constelação SAR',
    subtitle: 'Metodologia pioneira combina dados Sentinel-1 e IA para monitorar reservatórios, lagoas e várzeas mesmo em períodos de seca extrema.',
    excerpt: 'A iniciativa MapBiomas disponibilizou uma nova camada temática pública que detalha a retração e expansão dos corpos de água em todo o território nacional ao longo de quatro décadas, agora com frequência semanal ininterrupta.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">A rede MapBiomas anunciou o lançamento do módulo Água 2.0, trazendo pela primeira vez uma série temporal de alta frequência para a dinâmica de reservatórios, rios e várzeas em todos os biomas brasileiros.</p>

      <h2>Superando a barreira da nebulosidade amazônica</h2>
      <p>Um dos desafios crônicos do sensoriamento óptico no Brasil sempre foi a densa cobertura de nuvens sobre a Bacia Amazônica durante a estação chuvosa. Ao integrar de forma massiva dados do radar Sentinel-1 processados no Google Earth Engine com algoritmos de aprendizado profundo, a equipe conseguiu reconstruir as manchas de inundação semana a semana, sem descontinuidades.</p>

      <blockquote>
        "Os dados revelam que o Brasil perdeu mais de 15% de sua superfície natural de água líquida nas últimas três décadas, mas a capacidade de visualizar isso em escala de bacia hidrográfica semanal transforma a gestão hídrica e a prevenção de estiagens."
        <footer>— Coordenação Técnica do MapBiomas Água</footer>
      </blockquote>

      <h2>Impacto para o setor elétrico e agronegócio</h2>
      <p>A plataforma oferece acesso gratuito através de painéis analíticos interativos, permitindo que comitês de bacias, operadoras de hidrelétricas e produtores rurais cruzem dados de outorga com o nível real medido por satélite.</p>
    `,
    category: 'clima-ambiente',
    categoryName: 'Clima, Meio Ambiente & Desastres',
    tags: ['MapBiomas', 'Clima', 'Sensoriamento Remoto', 'Brasil', 'SAR'],
    sourceName: 'Rede MapBiomas',
    sourceSlug: 'mapbiomas',
    sourceUrl: 'https://brasil.mapbiomas.org',
    sourceType: 'Iniciativa colaborativa',
    originalPublishedAt: '2026-09-06T11:00:00Z',
    publishedAt: '2026-09-06T12:30:00Z',
    author: {
      name: 'Dra. Camila Arantes',
      slug: 'camila-arantes',
      role: 'Analista Sênior de GeoAI',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
      type: 'Especialista'
    },
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Vista aérea orbital de curso sinuoso de rio e planície de inundação com vegetação',
    imageCredit: 'Composição de imagem de satélite processada pela rede MapBiomas',
    aiGeneratedImage: false,
    country: 'Brasil',
    region: 'Brasil',
    latitude: -15.7975,
    longitude: -47.8919,
    readingTime: 5,
    featured: false,
    breaking: false,
    reviewStatus: 'Revisão humana',
    relatedArticleIds: ['art-01', 'art-02', 'art-08'],
    keyTakeaways: [
      'MapBiomas Água 2.0 disponibiliza monitoramento semanal de corpos hídricos em escala nacional.',
      'Algoritmo SAR supera nuvens na Amazônia e no litoral durante as cheias e estiagens.',
      'Série histórica atualizada detalha perda de superfície de água natural e impactos em reservatórios.',
      'Camadas de dados abertas disponíveis em formato GeoTIFF e WMS/WFS para usuários SIG.'
    ],
    viewsCount: 3180
  },
  {
    id: 'art-05',
    slug: 'sensores-lidar-estado-solido-drones-agrimensura-precisao-centimetrica',
    title: 'Avanço de sensores LiDAR em estado sólido viabiliza escaneamento laser centimétrico em drones com custo 70% menor',
    subtitle: 'Novos chips fotônicos integrados eliminam espelhos mecânicos giratórios, reduzindo peso para menos de 450 gramas e democratizando o perfilamento 3D.',
    excerpt: 'Fabricantes de sistemas de navegação e fotogrametria aérea iniciaram entregas de pods LiDAR com alcance de até 300 metros operando em frequências de 1.5 milhão de pulsos por segundo integrados a drones leves de consumo industrial.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">O mercado de topografia e cadastro territorial multifinalitário está diante de uma de suas maiores transformações de hardware com a chegada dos sensores LiDAR de estado sólido (solid-state) projetados especificamente para veículos aéreos não tripulados (VANTs).</p>

      <h2>O salto dos semicondutores fotônicos</h2>
      <p>Diferente dos tradicionais cabeçotes com prismas ópticos ou espelhos poligonais giratórios de alta precisão mecânica, os novos sensores utilizam matrizes de diodos laser emissores de superfície de cavidade vertical (VCSEL) e detectores de fóton único (SPAD) integrados em silício. Essa arquitetura não só elimina o desgaste por vibração, como reduz o consumo de energia de 60W para menos de 18W.</p>

      <blockquote>
        "Conseguimos voar com um drone padrão de menos de 4 kg por 42 minutos e coletar uma nuvem de pontos com 280 pontos por metro quadrado sob densa vegetação secundária, gerando um modelo digital de terreno (MDT) com desvio padrão vertical inferior a 3 centímetros."
        <footer>— Lucas Neves, especialista de campo da Geozine</footer>
      </blockquote>

      <h2>Integração com IMUs de grau tático e RTK</h2>
      <p>O pacote inclui receptores GNSS de multifrequência com suporte a PPP (Posicionamento por Ponto Preciso) e unidades de medição inercial (IMU) MEMS calibradas em temperatura, garantindo amarração geodésica imediata sem a necessidade de dezenas de alvos de controle em terra.</p>
    `,
    category: 'drones-lidar',
    categoryName: 'Drones, LiDAR & Fotogrametria',
    tags: ['LiDAR', 'Drones & LiDAR', 'Fotogrametria', 'Topografia', 'GNSS'],
    sourceName: 'Portal Especializado GeoSensors',
    sourceSlug: 'planet-labs',
    sourceUrl: 'https://geosensors.example.com',
    sourceType: 'Portal especializado',
    originalPublishedAt: '2026-09-05T16:20:00Z',
    publishedAt: '2026-09-05T17:45:00Z',
    author: {
      name: 'Lucas Neves',
      slug: 'lucas-neves',
      role: 'Repórter de Drones',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
      type: 'Colaborador'
    },
    heroImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Drone com payload de sensores voando sobre área de relevo acidentado com luz solar suave',
    imageCredit: 'Foto: Acervo técnico Geozine / Equipamento de ensaio em campo',
    aiGeneratedImage: false,
    country: 'Brasil',
    region: 'América Latina',
    latitude: -19.9167,
    longitude: -43.9345,
    readingTime: 4,
    featured: false,
    breaking: false,
    reviewStatus: 'Verificado pela redação',
    relatedArticleIds: ['art-02', 'art-03', 'art-12'],
    keyTakeaways: [
      'Sensores LiDAR em estado sólido dispensam partes mecânicas giratórias, barateando sistemas aéreos em até 70%.',
      'Peso inferior a 450 gramas viabiliza montagem em aeronaves elétricas leves com maior tempo de autonomia de voo.',
      'Capacidade de múltiplos retornos (até 5 ecos por pulso) assegura penetração na copa vegetal para modelos de terreno.',
      'Adoção massiva prevista em inventários florestais, linhas de transmissão e projetos de infraestrutura viária.'
    ],
    viewsCount: 2890
  },
  {
    id: 'art-06',
    slug: 'ibge-conclui-modernizacao-rede-geodesica-sirgas2000-e-expande-rbmc',
    title: 'IBGE conclui fase de modernização da Rede Brasileira de Monitoramento Contínuo com suporte aos quatro sistemas GNSS',
    subtitle: 'Estações RBMC-IP passam a transmitir correções RTK abertas com rastreio de GPS, Galileo, GLONASS e BeiDou em todo o país.',
    excerpt: 'O Instituto Brasileiro de Geografia e Estatística concluiu a atualização de infraestrutura tecnológica das estações da Rede Brasileira de Monitoramento Contínuo (RBMC), melhorando a precisão geodésica em tempo real para demarcação territorial.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">A Diretoria de Geociências do IBGE finalizou a etapa de transição para a nova geração de receptores multifrequência da Rede Brasileira de Monitoramento Contínuo dos Sistemas GNSS (RBMC).</p>

      <h2>Interoperabilidade multiconstelação</h2>
      <p>Com a modernização, todas as mais de 140 estações operacionais ativas passam a receber e decodificar sinais civis modernos de satélites, incluindo as frequências L1C/L5 do GPS, E1/E5 do sistema europeu Galileo, e B1C/B2a do chinês BeiDou. Isso garante geometria de satélites (GDOP) muito mais favorável para profissionais em campo, especialmente em áreas de cânions urbanos ou sob vegetação densa.</p>

      <h2>Serviço RTK em tempo real gratuito via protocolo NTRIP</h2>
      <p>O grande benefício para a comunidade técnica de agrimensores, cartógrafos e engenheiros civis é a gratuidade e estabilidade do fluxo de correção diferencial por internet (RBMC-IP) via protocolo padrão NTRIP com formato RTCM 3.3.</p>

      <blockquote>
        "A garantia de um referencial geodésico SIRGAS2000 robusto e acessível em tempo real é o alicerce invisível de tudo: desde a condução autônoma de máquinas agrícolas até o registro imobiliário com segurança jurídica."
        <footer>— Coordenação de Geodésia do IBGE</footer>
      </blockquote>
    `,
    category: 'gnss-geodesia',
    categoryName: 'GNSS, Geodésia & Posicionamento',
    tags: ['GNSS', 'Geodésia', 'IBGE', 'Brasil', 'Topografia'],
    sourceName: 'IBGE — Geociências e Cartografia',
    sourceSlug: 'ibge',
    sourceUrl: 'https://www.ibge.gov.br',
    sourceType: 'Instituição pública',
    originalPublishedAt: '2026-09-04T13:00:00Z',
    publishedAt: '2026-09-04T14:15:00Z',
    author: {
      name: 'Dr. Marcelo Fontes',
      slug: 'marcelo-fontes',
      role: 'Editor Técnico',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
      type: 'Especialista'
    },
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Antena de referência geodésica instalada em pilar de concreto com domo de proteção e céu aberto',
    imageCredit: 'Foto: Acervo institucional IBGE / Divulgação oficial',
    aiGeneratedImage: false,
    country: 'Brasil',
    region: 'Brasil',
    latitude: -22.9068,
    longitude: -43.1729,
    readingTime: 4,
    featured: false,
    breaking: false,
    reviewStatus: 'Revisão humana',
    relatedArticleIds: ['art-02', 'art-05', 'art-13'],
    keyTakeaways: [
      'Estações ativas da RBMC agora realizam rastreio simultâneo das constelações GPS, Galileo, GLONASS e BeiDou.',
      'Acesso gratuito a correções diferenciais RTCM via protocolo NTRIP para posicionamento centimétrico em tempo real.',
      'Aprimoramento da ancoragem do referencial geodésico oficial brasileiro SIRGAS2000.',
      'Redução do tempo de convergência para receptores GNSS de alta precisão em levantamentos cadastrais.'
    ],
    viewsCount: 2450
  },
  {
    id: 'art-07',
    slug: 'dossie-geozine-amazonia-orbital-sistema-vigilancia-radar',
    title: 'Dossiê Geozine: O escudo invisível — Como constelações SAR e GeoAI revolucionaram o combate ao crime ambiental na Amazônia',
    subtitle: 'Uma investigação técnica detalhada sobre como sensores que enxergam através das nuvens desarticularam a estratégia de desmatamento na estação chuvosa.',
    excerpt: 'Durante décadas, infratores ambientais na floresta tropical aproveitavam os meses de céu nublado para derrubar a mata sem serem vistos por satélites convencionais. Um novo consórcio de radares e inteligência analítica mudou definitivamente essa dinâmica.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">Na imensidão da Amazônia Legal, as nuvens costumavam funcionar como uma cortina impenetrável de outubro a abril. Em períodos em que satélites como Landsat e CBERS não conseguiam capturar imagens ópticas sem nuvens por semanas a fio, milhares de hectares de floresta primária eram derrubados silenciosamente.</p>

      <h2>A virada estratégica: a física das micro-ondas</h2>
      <p>A radiação eletromagnética nas bandas C (como no Sentinel-1) e banda L (comprimento de onda em torno de 24 cm) atravessa com facilidade as gotas de vapor d'água e a fumaça de queimadas. Quando uma árvore é derrubada, a geometria do retroespalhamento volumétrico da copa desaparece repentinamente, transformando-se em reflexão difusa no solo exposto.</p>

      <blockquote>
        "Antes do radar com reprocessamento diário em nuvem, recebíamos o primeiro alerta de desmate de dezembro apenas em maio do ano seguinte, quando o estrago já estava consolidado e o gado já pastava no local."
        <footer>— Auditor fiscal do órgão de controle ambiental</footer>
      </blockquote>

      <h2>Da detecção manual aos pipelines de Deep Learning</h2>
      <p>Nos últimos três anos, a automação com redes neurais treinadas em pares interferométricos reduziu a taxa de falsos positivos causados por umidade natural do solo de 38% para menos de 4%. O processo gera polígonos geoespaciais autenticados com hash criptográfico e registro de carimbo de tempo, permitindo embargos remotos automáticos aceitos pelos tribunais superiores.</p>

      <h2>O próximo passo: constelações de revisitamento horário</h2>
      <p>Com a entrada em operação de constelações NewSpace de nanossatélites SAR comerciais de alta frequência, o intervalo entre a primeira motosserra entrar na mata e a emissão do alerta tático em campo encolheu para menos de três horas.</p>
    `,
    category: 'clima-ambiente',
    categoryName: 'Clima, Meio Ambiente & Desastres',
    tags: ['MapBiomas', 'INPE', 'SAR', 'Copernicus', 'Dossiê Geozine', 'Brasil'],
    sourceName: 'Redação Geozine — Especial Investigativo',
    sourceSlug: 'redacao-geozine',
    sourceUrl: 'https://geozine.com.br/dossies',
    sourceType: 'Publicação científica',
    originalPublishedAt: '2026-09-03T10:00:00Z',
    publishedAt: '2026-09-03T11:00:00Z',
    author: {
      name: 'Dr. Marcelo Fontes',
      slug: 'marcelo-fontes',
      role: 'Editor Técnico',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
      type: 'Especialista'
    },
    heroImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Vista panorâmica aérea da densa floresta amazônica sob névoa matinal com rio sinuoso',
    imageCredit: 'Fotografia aérea com sensores multiespectrais / Divulgação Geozine Dossiês',
    aiGeneratedImage: false,
    country: 'Brasil',
    region: 'Brasil',
    latitude: -3.4653,
    longitude: -62.2159,
    readingTime: 9,
    featured: false,
    breaking: false,
    dossier: true,
    reviewStatus: 'Revisão humana',
    relatedArticleIds: ['art-01', 'art-02', 'art-04'],
    keyTakeaways: [
      'Investigação técnica revela como a fusão SAR banda C/L encerrou o "apagão de nuvens" histórico na Amazônia.',
      'Algoritmos de inteligência artificial reduziram falsos positivos de 38% para menos de 4% em alertas de desmate.',
      'Alertas automatizados agora embasam autuações fiscais remotas com validação judicial célere.',
      'Entrada de constelações NewSpace SAR reduz tempo de ciclo de alerta para cerca de 3 horas.'
    ],
    viewsCount: 6840
  },
  {
    id: 'art-08',
    slug: 'cidades-gemeos-digitais-urbanos-open-standards-smart-cities',
    title: 'Gêmeos Digitais Urbanos: Capitais adotam padrões OGC 3D Tiles para planejamento e simulação de microclima',
    subtitle: 'Integração entre nuvens de pontos LiDAR, malhas texturizadas e dados cadastrais melhora predição de ilhas de calor e drenagem pluvial.',
    excerpt: 'Cidades na América Latina e Europa estão migrando seus sistemas SIG municipais convencionais em 2D para réplicas tridimensionais operáveis em navegadores com base no padrão aberto OGC 3D Tiles 1.1 e motores WebGL.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">O conceito de Gêmeo Digital Urbano (Urban Digital Twin) deixou o campo dos relatórios conceituais para se tornar infraestrutura essencial de tomada de decisão nas grandes metrópoles.</p>

      <h2>Do SIG plano ao tecido urbano volumétrico</h2>
      <p>Ao conectar levantamentos aéreos oblíquos por fotogrametria e varredura LiDAR com dados de consumo energético e tráfego em tempo real, as secretarias de planejamento conseguem modelar a dispersão de poluentes atmosféricos e o sombreamento solar dos edifícios projetados antes mesmo do alvará de construção ser emitido.</p>

      <h2>Interoperabilidade com OGC 3D Tiles e CityGML</h2>
      <p>A consolidação do padrão aberto 3D Tiles permitiu carregar modelos volumétricos de cidades inteiras com centenas de gigabytes diretamente em navegadores web padrão, sem a necessidade de estações de trabalho de altíssimo custo para os fiscais urbanos.</p>
    `,
    category: 'digital-twins',
    categoryName: 'Digital Twins, 3D & Nuvens de Pontos',
    tags: ['Digital Twins', 'OGC', 'GIS & Mapas', 'LiDAR'],
    sourceName: 'Open Geospatial Consortium (OGC)',
    sourceSlug: 'ogc-consortium',
    sourceUrl: 'https://www.ogc.org',
    sourceType: 'Organização de padrões',
    originalPublishedAt: '2026-09-02T15:00:00Z',
    publishedAt: '2026-09-02T16:20:00Z',
    author: {
      name: 'Dra. Camila Arantes',
      slug: 'camila-arantes',
      role: 'Analista Sênior de GeoAI',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
      type: 'Especialista'
    },
    heroImage: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Visualização tridimensional de cidade inteligente com malha vetorial e fluxos de dados luminosos',
    imageCredit: 'Simulação 3D urbana / OGC Open City Framework',
    aiGeneratedImage: false,
    country: 'Brasil',
    region: 'América Latina',
    latitude: -23.5505,
    longitude: -46.6333,
    readingTime: 5,
    featured: false,
    breaking: false,
    reviewStatus: 'Verificado pela redação',
    relatedArticleIds: ['art-03', 'art-05', 'art-11'],
    keyTakeaways: [
      'Gêmeos digitais urbanos utilizam o padrão aberto OGC 3D Tiles para visualização 3D fluida em navegadores.',
      'Integração de dados de vento e relevo permite mapear ilhas de calor e riscos de alagamento com precisão métrica.',
      'Cidades reduzem custos ao adotar plataformas geoespaciais abertas integradas a sistemas cadastrais.',
      'Adoção de dados BIM em formato IFC com georreferenciamento padronizado para obras públicas.'
    ],
    viewsCount: 3560
  },
  {
    id: 'art-09',
    slug: 'copernicus-sentinel-1c-conclui-calibracao-em-orbita-e-inicia-operacao',
    title: 'Copernicus Sentinel-1C conclui com êxito calibração em órbita e restabelece constelação radar completa',
    subtitle: 'Com instrumento SAR em banda C totalmente calibrado, a missão garante continuidade das medições interferométricas com ciclo de revisita de 6 dias.',
    excerpt: 'A Agência Espacial Europeia (ESA) declarou formalmente operacional o satélite Sentinel-1C após quatro meses de intensos testes de comissionamento e calibração radiométrica sobre alvos de referência terrestres.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">A Europa recuperou oficialmente sua capacidade total de observação por radar de abertura sintética com a entrada em serviço comercial e científico do Sentinel-1C, lançado para substituir o Sentinel-1B após a anomalia de energia ocorrida na missão anterior.</p>

      <h2>Precisão radiométrica e estabilidade de órbita</h2>
      <p>Os testes de calibração conduzidos em colaboração com estações transponder na Alemanha e alvos homogêneos na Floresta Amazônica demonstraram estabilidade radiométrica superior a 0.3 dB, superando as exigências nominais de projeto.</p>

      <h2>Volta do intervalo de 6 dias para interferometria (InSAR)</h2>
      <p>Para cientistas que estudam deformação crustal, vulcanismo, subsidência urbana provocada por extração de água subterrânea e monitoramento de geleiras, o restabelecimento do par com o Sentinel-1A restaura o intervalo ótimo de 6 dias para formação de interferogramas de alta coerência temporal.</p>
    `,
    category: 'satelites-newspace',
    categoryName: 'Satélites & NewSpace',
    tags: ['Sentinel', 'Copernicus', 'ESA', 'Sensoriamento Remoto', 'Satélites'],
    sourceName: 'ESA / Programa Copernicus',
    sourceSlug: 'esa-copernicus',
    sourceUrl: 'https://www.copernicus.eu',
    sourceType: 'Agência espacial',
    originalPublishedAt: '2026-09-08T07:00:00Z',
    publishedAt: '2026-09-08T08:30:00Z',
    author: {
      name: 'Dr. Marcelo Fontes',
      slug: 'marcelo-fontes',
      role: 'Editor Técnico',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
      type: 'Especialista'
    },
    heroImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Visão orbital da Terra mostrando horizonte atmosférico iluminado por sol poente',
    imageCredit: 'ESA / Copernicus Sentinel data / Imagem orbital oficial',
    aiGeneratedImage: false,
    country: 'Europa',
    region: 'Europa',
    latitude: 49.8728,
    longitude: 8.6512,
    readingTime: 4,
    featured: false,
    breaking: true,
    reviewStatus: 'Revisão humana',
    relatedArticleIds: ['art-01', 'art-02', 'art-07'],
    keyTakeaways: [
      'Sentinel-1C atinge plena capacidade operacional após testes de calibração radiométrica da ESA.',
      'Retomada do ciclo de revisita interferométrica global de 6 dias em conjunto com o Sentinel-1A.',
      'Distribuição livre e imediata de dados sob a política de open access da União Europeia.',
      'Benefícios diretos para monitoramento de falhas geológicas, geleiras e subsidência urbana.'
    ],
    viewsCount: 4230
  },
  {
    id: 'art-10',
    slug: 'cloud-native-geospatial-cloud-optimized-geotiff-stac-conquista-setor',
    title: 'O triunfo do Cloud-Native Geospatial: COG e STAC consolidam-se como padrão de fato nas grandes infraestruturas espaciais',
    subtitle: 'Eliminação da necessidade de download prévio de gigabytes de dados acelera análises de sensoriamento remoto em escala planetária.',
    excerpt: 'A transição de arquivos compactados e monolíticos para formatos nativos de nuvem como Cloud Optimized GeoTIFF (COG), Zarr e a especificação SpatioTemporal Asset Catalog (STAC) reduziu em até 90% o tráfego de rede nas plataformas de análise territorial.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">Até poucos anos atrás, analisar uma série histórica de imagens orbitais sobre uma bacia hidrográfica exigia baixar dezenas de arquivos comprimidos .zip ou .tar.gz, descompactá-los localmente e depois recortar a pequena área de interesse.</p>

      <h2>A revolução das requisições HTTP Range</h2>
      <p>Com o formato COG, a estrutura interna em pirâmides e blocos (tiles) permite que softwares como QGIS, ArcGIS ou bibliotecas Python como Rasterio façam requisições HTTP parciais (Range Requests), lendo apenas os exatos bytes correspondentes à área em exibição na tela.</p>

      <h2>STAC: o catálogo universal do tempo e do espaço</h2>
      <p>Complementando os formatos de arquivo, a especificação aberta STAC tornou-se o protocolo comum de busca em acervos da NASA, ESA, Planet Labs, Microsoft Planetary Computer e INPE, unificando a descoberta de dados por metadados espaciais e temporais padronizados em JSON.</p>
    `,
    category: 'dados-abertos',
    categoryName: 'Dados Abertos, OGC, APIs & Open Source',
    tags: ['OGC', 'Dados Abertos', 'QGIS', 'GeoAI'],
    sourceName: 'Open Geospatial Consortium (OGC)',
    sourceSlug: 'ogc-consortium',
    sourceUrl: 'https://www.ogc.org',
    sourceType: 'Organização de padrões',
    originalPublishedAt: '2026-09-01T14:00:00Z',
    publishedAt: '2026-09-01T15:10:00Z',
    author: {
      name: 'Redação Geozine',
      slug: 'redacao-geozine',
      role: 'Equipe Editorial',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
      type: 'Redação Geozine'
    },
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Linhas de servidores em data center de computação em nuvem com iluminação azul e verde',
    imageCredit: 'Foto: Banco de mídia tecnológica Geozine',
    aiGeneratedImage: false,
    country: 'Global',
    region: 'Global',
    latitude: 37.7749,
    longitude: -122.4194,
    readingTime: 4,
    featured: false,
    breaking: false,
    reviewStatus: 'Verificado pela redação',
    relatedArticleIds: ['art-03', 'art-08', 'art-15'],
    keyTakeaways: [
      'Formatos Cloud-Native (COG, Zarr, GeoParquet) dispensam downloads completos de imagens de satélite.',
      'STAC consolidado como índice de descoberta padrão entre agências governamentais e setor privado.',
      'Economia de até 90% em largura de banda para projetos analíticos com Big Data geoespacial.',
      'Integração transparente com ecossistema Python (Xarray, Rasterio, Dask) e softwares desktop.'
    ],
    viewsCount: 3740
  },
  {
    id: 'art-11',
    slug: 'mercado-newspace-investimentos-fusões-startups-geoespaciais-2026',
    title: 'Panorama do Mercado NewSpace: Startups de inteligência geoespacial atraem US$ 3.2 bilhões no primeiro semestre',
    subtitle: 'Foco de investidores de venture capital migra da construção de foguetes para o processamento de dados e geração de insights de negócio.',
    excerpt: 'Relatório global do setor espacial aponta desaceleração no número de novos veículos lançadores e forte alta na rodada de captações de empresas focadas em algoritmos de monitoramento preditivo para energia, seguros e commodities agrícolas.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">O ecossistema NewSpace global atingiu maturidade após uma década de forte expansão de frotas de nanosats. A tese predominante entre fundos de investimento especializado agora é a entrega de valor agregado em ponta: transformar terabytes de pixels em decisões financeiras e operacionais diretas.</p>

      <h2>A era da inteligência de negócios orientada por espaço</h2>
      <p>Em vez de vender imagens brutas ou ortomosaicos a metro quadrado, as empresas com maior tração no mercado cobram assinaturas de dados estruturados, como contagem automatizada de navios em portos estratégicos, estoques aparentes de tanques de combustível e detecção precoce de pragas em talhões agrícolas.</p>

      <h2>O Brasil no mapa do ecossistema espacial</h2>
      <p>Na América Latina, startups brasileiras de agritech e monitoramento florestal ganham destaque, desenvolvendo parcerias com cooperativas e tradings globais de grãos para auditoria de compliance da nova regulamentação de importação da União Europeia (EUDR).</p>
    `,
    category: 'mercado',
    categoryName: 'Mercado, Empresas & Startups',
    tags: ['Satélites', 'GeoAI', 'Mercado Geo', 'Agro & Infra'],
    sourceName: 'Relatório Geozine Intelligence / Fontes de Mercado',
    sourceSlug: 'planet-labs',
    sourceUrl: 'https://planet.com/news',
    sourceType: 'Empresa',
    originalPublishedAt: '2026-08-30T16:00:00Z',
    publishedAt: '2026-08-31T09:30:00Z',
    author: {
      name: 'Redação Geozine',
      slug: 'redacao-geozine',
      role: 'Equipe Editorial',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
      type: 'Redação Geozine'
    },
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Arranha-céus de centro financeiro refletindo luz solar com atmosfera moderna',
    imageCredit: 'Acervo corporativo Geozine',
    aiGeneratedImage: false,
    country: 'Global',
    region: 'América do Norte',
    latitude: 40.7128,
    longitude: -74.006,
    readingTime: 5,
    featured: false,
    breaking: false,
    reviewStatus: 'Verificado pela redação',
    relatedArticleIds: ['art-01', 'art-02', 'art-10'],
    keyTakeaways: [
      'US$ 3.2 bilhões captados por empresas de inteligência geoespacial nos primeiros seis meses do ano.',
      'Transição do modelo de venda de imagens brutas para insights prescritivos via API.',
      'Exigências regulatórias internacionais (como EUDR) aceleram adoção de rastreabilidade territorial.',
      'Consolidação de fusões entre operadoras de constelações e fornecedoras de software analítico.'
    ],
    viewsCount: 2980
  },
  {
    id: 'art-12',
    slug: 'agricultura-precisao-drones-pulverizacao-geolocalizacao-rtk-reduz-insumos',
    title: 'Agricultura de precisão: frotas de drones com GNSS RTK reduzem uso de defensivos em até 42% no Centro-Oeste',
    subtitle: 'Aplicação localizada baseada em mapas de infestação gerados por IA substitui pulverização indiscriminada por barra tratorizada.',
    excerpt: 'Estudo de campo conduzido por centros de pesquisa no Mato Grosso e Goiás documentou a eficácia do corte preciso de deriva em culturas de soja e algodão utilizando veículos aéreos não tripulados orientados por telemetria centimétrica.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">A combinação de sensoriamento multiespectral de ultra-alta resolução em drones de reconhecimento com frotas de drones de aplicação em taxa variável está revolucionando a economia de insumos nas lavouras do Cerrado.</p>

      <h2>O ciclo de resposta ultrarrápido</h2>
      <p>Em fazendas de grande porte, o drone de reconhecimento decola logo ao amanhecer, mapeando 400 hectares em menos de uma hora. Em seguida, um algoritmo de visão computacional em borda identifica reboleiras de plantas daninhas resistentes e gera instantaneamente o mapa de prescrição em formato aberto Shapefile ou GeoPackage.</p>

      <h2>Precisão de gota e mitigação de deriva</h2>
      <p>Guiados por correções RTK das bases locais e sensores de altitude por radar de micro-ondas que mantêm o drone a exatamente 2.5 metros da copa das plantas, os bicos eletrostáticos aplicam o defensivo cirurgicamente apenas onde a praga está presente, evitando desperdício de produto em solo desocupado.</p>
    `,
    category: 'agro-infra',
    categoryName: 'Agricultura, Mineração & Infraestrutura',
    tags: ['Drones & LiDAR', 'GNSS', 'Agro & Infra', 'Brasil'],
    sourceName: 'Portal Campo e Geotecnologias',
    sourceSlug: 'ibge',
    sourceUrl: 'https://campo-geo.example.com',
    sourceType: 'Portal especializado',
    originalPublishedAt: '2026-08-28T10:00:00Z',
    publishedAt: '2026-08-28T11:45:00Z',
    author: {
      name: 'Lucas Neves',
      slug: 'lucas-neves',
      role: 'Repórter de Drones',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
      type: 'Colaborador'
    },
    heroImage: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Drone agrícola de pulverização sobrevoando plantação verde em linha reta ao entardecer',
    imageCredit: 'Foto: Lucas Neves / Acervo Geozine em ensaio de campo',
    aiGeneratedImage: false,
    country: 'Brasil',
    region: 'Brasil',
    latitude: -12.5564,
    longitude: -55.7196,
    readingTime: 4,
    featured: false,
    breaking: false,
    reviewStatus: 'Verificado pela redação',
    relatedArticleIds: ['art-05', 'art-06', 'art-11'],
    keyTakeaways: [
      'Economia comprovada de até 42% em defensivos agrícolas com pulverização direcionada por drone.',
      'Controle de voo amarrado por GNSS RTK assegura precisão centimétrica e sobreposição rigorosa.',
      'Redução do impacto ambiental e contaminação de lençol freático em áreas produtoras do Cerrado.',
      'Retorno sobre o investimento dos equipamentos atingido em menos de duas safras comerciais.'
    ],
    viewsCount: 3120
  },
  {
    id: 'art-13',
    slug: 'galileo-has-servico-alta-precisao-gratuito-posicionamento-decimetrico',
    title: 'Galileo High Accuracy Service (HAS) atinge maturidade global com posicionamento submétrico gratuito via satélite',
    subtitle: 'Sinal transmitido na banda E6 dispensa conexão de internet móvel e viabiliza precisão de 20 cm em receptores compatíveis.',
    excerpt: 'A agência da União Europeia para o Programa Espacial (EUSPA) anunciou a expansão operacional do serviço HAS, que transmite correções orbitais e de relógio diretamente na portadora dos satélites Galileo sem custo de assinatura.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">O serviço Galileo High Accuracy Service (HAS) consolida uma das maiores vantagens estratégicas da constelação civil europeia em relação aos sistemas concorrentes: a entrega de correções de alta precisão em tempo real de forma totalmente gratuita e aberta a qualquer usuário mundial.</p>

      <h2>Sem dependência de cobertura de celular</h2>
      <p>Em áreas rurais isoladas, no mar aberto ou em expedições remotas no interior do continente sul-americano, o maior entrave para o uso de RTK convencional é a falta de sinal de telefonia 4G/5G para recepção do protocolo NTRIP. Com o Galileo HAS, as correções vêm direto do espaço na banda E6B, permitindo convergência decimétrica em menos de 15 minutos.</p>

      <h2>Aplicações em robótica autônoma e navegação marítima</h2>
      <p>O serviço já está sendo integrado por fabricantes globais de chips em tratores autônomos, embarcações hidrográficas e sistemas de transporte inteligente de cidades conectadas.</p>
    `,
    category: 'gnss-geodesia',
    categoryName: 'GNSS, Geodésia & Posicionamento',
    tags: ['GNSS', 'Geodésia', 'ESA', 'Topografia'],
    sourceName: 'ESA / Programa Copernicus',
    sourceSlug: 'esa-copernicus',
    sourceUrl: 'https://www.euspa.europa.eu',
    sourceType: 'Agência espacial',
    originalPublishedAt: '2026-08-25T14:30:00Z',
    publishedAt: '2026-08-25T15:40:00Z',
    author: {
      name: 'Dr. Marcelo Fontes',
      slug: 'marcelo-fontes',
      role: 'Editor Técnico',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
      type: 'Especialista'
    },
    heroImage: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Satélite de navegação orbitando acima do globo terrestre com reflexos solares',
    imageCredit: 'Conceito artístico da constelação Galileo / EUSPA / Divulgação',
    aiGeneratedImage: false,
    country: 'Europa',
    region: 'Europa',
    latitude: 50.0755,
    longitude: 14.4378,
    readingTime: 4,
    featured: false,
    breaking: false,
    reviewStatus: 'Revisão humana',
    relatedArticleIds: ['art-06', 'art-09', 'art-12'],
    keyTakeaways: [
      'Galileo HAS transmite correções diferenciais gratuitas diretamente pela banda E6 dos satélites.',
      'Independência total de internet móvel ou estações de rádio base proprietárias.',
      'Precisão horizontal atingida em torno de 20 centímetros após breve janela de convergência.',
      'Adoção crescente em agronegócio de precisão, agrimensura costeira e veículos não tripulados.'
    ],
    viewsCount: 2670
  },
  {
    id: 'art-14',
    slug: 'gdal-versao-4-arquitetura-modular-rust-suporte-geoespacial-futuro',
    title: 'Comunidade OSGeo inicia desenvolvimento do GDAL 4 com núcleos reescritos em Rust para maior segurança e concorrência',
    subtitle: 'A biblioteca base que alimenta o Google Earth, QGIS, ArcGIS e milhares de soluções GIS se prepara para a próxima década.',
    excerpt: 'A Fundação Geoespacial de Código Aberto (OSGeo) divulgou o plano diretor para a próxima grande versão da Geospatial Data Abstraction Library (GDAL), introduzindo módulos de decodificação raster com memória segura.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">Se você já abriu um arquivo de imagem de satélite, gerou um mapa digital ou consultou dados espaciais em qualquer aplicativo moderno, você já utilizou a biblioteca GDAL, mesmo sem saber.</p>

      <h2>O papel invisível da GDAL na infraestrutura mundial</h2>
      <p>Criada originalmente por Frank Warmerdam no final da década de 1990, a GDAL/OGR é o alicerce absoluto de interoperabilidade para centenas de formatos proprietários e abertos de vetores e matrizes raster em todo o planeta.</p>

      <h2>Por que a transição gradual para Rust?</h2>
      <p>Com pipelines processando petabytes de dados raster em servidores de nuvem altamente concorrentes, vulnerabilidades clássicas de estouro de buffer (buffer overflow) em drivers legados em C/C++ representavam um risco crescente de segurança da informação. A adoção de Rust em novos drivers de IO assegura integridade matemática e paralelismo sem travas.</p>
    `,
    category: 'dados-abertos',
    categoryName: 'Dados Abertos, OGC, APIs & Open Source',
    tags: ['OGC', 'Open Source', 'Dados Abertos', 'QGIS'],
    sourceName: 'QGIS Project Community',
    sourceSlug: 'qgis-project',
    sourceUrl: 'https://gdal.org',
    sourceType: 'Portal especializado',
    originalPublishedAt: '2026-08-20T11:00:00Z',
    publishedAt: '2026-08-20T12:30:00Z',
    author: {
      name: 'Redação Geozine',
      slug: 'redacao-geozine',
      role: 'Equipe Editorial',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
      type: 'Redação Geozine'
    },
    heroImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Código de programação em tela de computador com iluminação cibernética verde e ciano',
    imageCredit: 'Foto: Banco técnico Geozine',
    aiGeneratedImage: false,
    country: 'Global',
    region: 'Global',
    latitude: 45.4215,
    longitude: -75.6972,
    readingTime: 5,
    featured: false,
    breaking: false,
    reviewStatus: 'Verificado pela redação',
    relatedArticleIds: ['art-03', 'art-10', 'art-08'],
    keyTakeaways: [
      'GDAL 4 adota linguagem Rust para drivers de leitura concorrente de alto risco.',
      'Preservação total das interfaces de programação C/Python/C++ para retrocompatibilidade.',
      'Melhoria nas rotinas de projeção e transformações de datum com a biblioteca PROJ 10.',
      'Reforço da sustentabilidade financeira do projeto através de patrocínio corporativo formal.'
    ],
    viewsCount: 3890
  },
  {
    id: 'art-15',
    slug: 'nasa-nisar-revela-primeiros-dados-deformacao-tectonica-antartica',
    title: 'Missão conjunta NASA-ISRO (NISAR) divulga os primeiros mapas globais de tensão tectônica em banda dupla L e S',
    subtitle: 'Maior antena de radar desdobrável já enviada ao espaço permite mapear deslocamentos de falhas geológicas em milímetros.',
    excerpt: 'O satélite de radar científico NISAR enviou sua primeira remessa de produtos calibrados, confirmando a capacidade de enxergar deformações da crosta terrestre e fluxo de gelo com sensibilidade milimétrica sem precedentes.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">A aguardada missão NISAR, fruto da cooperação espacial entre a NASA americana e a ISRO indiana, deu início à sua fase de distribuição científica irrestrita após alcançar órbita síncrona com o Sol a 747 km de altitude.</p>

      <h2>O poder pioneiro das bandas L e S combinadas</h2>
      <p>O diferencial técnico do NISAR é a operação simultânea em banda L (comprimento de onda de 24 cm, sensível à biomassa e deformações estruturais de longo prazo) e banda S (comprimento de onda de 9 cm, ideal para umidade de solo e cobertura de gelo). Sua impressionante antena refletora desdobrável de 12 metros de diâmetro é a maior do gênero em voo civil.</p>

      <blockquote>
        "Com uma passagem a cada 12 dias cobrindo rigorosamente todas as massas de terra do planeta, temos um registro contínuo e público que transformará nossa capacidade de antecipar deslizamentos catastróficos e entender a recarga de aquíferos profundos."
        <footer>— Equipe de Ciências da Terra do Jet Propulsion Laboratory (JPL)</footer>
      </blockquote>
    `,
    category: 'sensoriamento-remoto',
    categoryName: 'Sensoriamento Remoto & Observação da Terra',
    tags: ['NASA', 'Sensoriamento Remoto', 'SAR', 'Satélites'],
    sourceName: 'NASA Earth Data & Science',
    sourceSlug: 'nasa-earthdata',
    sourceUrl: 'https://earthdata.nasa.gov',
    sourceType: 'Agência espacial',
    originalPublishedAt: '2026-08-15T18:00:00Z',
    publishedAt: '2026-08-16T08:00:00Z',
    author: {
      name: 'Dr. Marcelo Fontes',
      slug: 'marcelo-fontes',
      role: 'Editor Técnico',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
      type: 'Especialista'
    },
    heroImage: 'https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Satélite com grande refletor em forma de malha dourada sobre a curvatura da Terra',
    imageCredit: 'NASA/JPL-Caltech / Conceito oficial da missão NISAR',
    aiGeneratedImage: false,
    country: 'Estados Unidos',
    region: 'América do Norte',
    latitude: 34.2012,
    longitude: -118.1714,
    readingTime: 6,
    featured: false,
    breaking: false,
    reviewStatus: 'Revisão humana',
    relatedArticleIds: ['art-01', 'art-09', 'art-07'],
    keyTakeaways: [
      'NISAR inicia envio de dados combinados em banda L e banda S para comunidade científica mundial.',
      'Antena refletora de 12 metros garante sensibilidade milimétrica para subsidência e terremotos.',
      'Mapeamento completo da calota de gelo da Antártica e Groenlândia com ciclo contínuo de 12 dias.',
      'Acesso livre e sem custos para governos, pesquisadores e sistemas de defesa civil.'
    ],
    viewsCount: 4510
  },
  {
    id: 'art-16',
    slug: 'radar-sar-orbital-privado-monitoramento-barragens-mineracao-brasil',
    title: 'Monitoramento contínuo de barragens de mineração no Brasil passa a exigir dados interferométricos orbitais',
    subtitle: 'Nova portaria da Agência Nacional de Mineração estabelece o uso de radar por satélite como camada mandatória de segurança estrutural.',
    excerpt: 'Companhias mineradoras em Minas Gerais e no Pará finalizaram a implementação de sistemas de alerta precoce baseados em refletores de canto e satélites SAR para registrar qualquer milímetro de movimentação em taludes.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">A Agência Nacional de Mineração (ANM) consolidou a nova diretriz técnica que exige das operadoras de barragens de rejeitos de grande porte a integração de séries temporais de sensoriamento remoto por radar em seus planos de ação de emergência.</p>

      <h2>A precisão dos refletores de canto instalados em terra</h2>
      <p>Em conjunto com os radares espaciais, as barragens recebem refletores de canto triangulares de alumínio chumbados no maciço. Como o metal reflete intensamente as micro-ondas, ele serve como ponto de controle geodésico milimétrico em cada passagem do satélite, sem necessidade de enviar topógrafos para locais de risco iminente.</p>
    `,
    category: 'agro-infra',
    categoryName: 'Agricultura, Mineração & Infraestrutura',
    tags: ['SAR', 'Brasil', 'Agro & Infra', 'Sensoriamento Remoto'],
    sourceName: 'INPE — Instituto Nacional de Pesquisas Espaciais',
    sourceSlug: 'inpe',
    sourceUrl: 'http://www.inpe.br',
    sourceType: 'Instituição pública',
    originalPublishedAt: '2026-08-10T12:00:00Z',
    publishedAt: '2026-08-10T13:20:00Z',
    author: {
      name: 'Dr. Marcelo Fontes',
      slug: 'marcelo-fontes',
      role: 'Editor Técnico',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
      type: 'Especialista'
    },
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Vista aérea de grande estrutura de engenharia em terreno acidentado com taludes escavados',
    imageCredit: 'Foto: Acervo técnico Geozine / Mineração e Geotecnia',
    aiGeneratedImage: false,
    country: 'Brasil',
    region: 'Brasil',
    latitude: -20.0244,
    longitude: -44.0531,
    readingTime: 4,
    featured: false,
    breaking: false,
    reviewStatus: 'Revisão humana',
    relatedArticleIds: ['art-01', 'art-05', 'art-06'],
    keyTakeaways: [
      'Norma da ANM torna obrigatória a interferometria orbital periódica para barragens de alteamento a montante.',
      'Instalação de refletores de canto permite sensibilidade submétrica de deslocamentos estruturais.',
      'Alertas automatizados integrados com centros integrados de comando e Defesa Civil estadual.'
    ],
    viewsCount: 2890
  },
  {
    id: 'art-17',
    slug: 'inteligencia-artificial-deteccao-automática-placas-solares-telhados-sig',
    title: 'Algoritmo de visão computacional mapeia 2.4 milhões de instalações fotovoltaicas residenciais em imagens orbitais',
    subtitle: 'Distribuidoras de energia elétrica utilizam redes neurais convolucionais para auditar a microgeração distribuída e planejar a rede.',
    excerpt: 'Pesquisa desenvolvida com dados abertos demonstra como modelos de segmentação semântica identificam com 98% de exatidão arranjos solares em coberturas residenciais utilizando imagens aéreas e de satélites submétricos.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">O crescimento exponencial da energia solar distribuída no Brasil e no mundo criou um desafio de cadastro sem precedentes para as concessionárias de transmissão e distribuição elétrica: como manter atualizado o inventário de milhões de microgeradores instalados em telhados particulares?</p>

      <h2>Segmentação semântica em escala continental</h2>
      <p>O modelo utiliza arquiteturas U-Net adaptadas com mecanismos de atenção para reconhecer as texturas de silício policristalino e monocristalino mesmo sob ângulos de visada oblíquos e reflexos de sol poente, calculando automaticamente a área útil de captação e estimando a potência nominal em quilowatts-pico (kWp).</p>
    `,
    category: 'geoai',
    categoryName: 'GeoAI & Inteligência Artificial',
    tags: ['GeoAI', 'Digital Twins', 'GIS & Mapas'],
    sourceName: 'Universidade e Centros de Pesquisa',
    sourceSlug: 'ogc-consortium',
    sourceUrl: 'https://energy-geolab.example.org',
    sourceType: 'Universidade',
    originalPublishedAt: '2026-08-05T09:00:00Z',
    publishedAt: '2026-08-05T10:15:00Z',
    author: {
      name: 'Dra. Camila Arantes',
      slug: 'camila-arantes',
      role: 'Analista Sênior de GeoAI',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
      type: 'Especialista'
    },
    heroImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Vista aérea de telhados urbanos com painéis fotovoltaicos modernos instalados sob sol intenso',
    imageCredit: 'Foto: Banco de imagens técnicas de energia solar e SIG',
    aiGeneratedImage: false,
    country: 'Brasil',
    region: 'Brasil',
    latitude: -19.8157,
    longitude: -43.9542,
    readingTime: 4,
    featured: false,
    breaking: false,
    reviewStatus: 'Verificado pela redação',
    relatedArticleIds: ['art-01', 'art-08', 'art-12'],
    keyTakeaways: [
      'Rede neural identifica instalações solares com 98% de precisão em ortomosaicos aéreos.',
      'Cálculo automatizado de área de placas e estimativa de potência injetada na rede de distribuição.',
      'Subsídio direto ao planejamento de transformadores e mitigação de fluxo reverso de potência.',
      'Algoritmo compatível com dados de drones e satélites de alta resolução espacial.'
    ],
    viewsCount: 2650
  },
  {
    id: 'art-18',
    slug: 'planet-labs-constelacao-tanager-deteccao-emissoes-metano-hiperespectral',
    title: 'Constelação Tanager da Planet Labs inicia envio de mapas pontuais de plumas de emissão de metano e CO2',
    subtitle: 'Instrumento hiperespectral de 400 bandas mapeia vazamentos invisíveis em oleodutos, aterros e bacias de gás em escala de instalação individual.',
    excerpt: 'O primeiro satélite da constelação Tanager, desenvolvido em parceria com o consórcio Carbon Mapper e o JPL da NASA, enviou suas primeiras imagens operacionais identificando vazamentos de gases de efeito estufa com resolução pontual.',
    body: `
      <p class="lead text-lg text-slate-300 font-medium">O metano possui um potencial de aquecimento global mais de 80 vezes superior ao dióxido de carbono nos primeiros vinte anos na atmosfera. Até recentemente, localizar vazamentos pontuais em infraestruturas remotas dependia de inspeções manuais por terra ou voos esporádicos de aeronaves especializadas.</p>

      <h2>400 canais espectrais para identificar a química da atmosfera</h2>
      <p>O espectrômetro de imagem do Tanager divide o espectro óptico e infravermelho de ondas curtas em centenas de canais estreitos, detectando a assinatura exata de absorção molecular do metano (CH4) mesmo em plumas tênues sopradas pelo vento sobre complexos industriais.</p>
    `,
    category: 'sensoriamento-remoto',
    categoryName: 'Sensoriamento Remoto & Observação da Terra',
    tags: ['Sensoriamento Remoto', 'Satélites', 'Clima', 'NASA'],
    sourceName: 'Planet Labs Newsroom',
    sourceSlug: 'planet-labs',
    sourceUrl: 'https://www.planet.com',
    sourceType: 'Empresa',
    originalPublishedAt: '2026-08-01T14:00:00Z',
    publishedAt: '2026-08-01T15:30:00Z',
    author: {
      name: 'Redação Geozine',
      slug: 'redacao-geozine',
      role: 'Equipe Editorial',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
      type: 'Redação Geozine'
    },
    heroImage: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1600&auto=format&fit=crop&q=80',
    imageAlt: 'Satélite artificial em órbita com horizonte terrestre e sensores apontados para a atmosfera',
    imageCredit: 'Planet Labs / Carbon Mapper Consortium / Divulgação oficial',
    aiGeneratedImage: false,
    country: 'Estados Unidos',
    region: 'Global',
    latitude: 37.7749,
    longitude: -122.4194,
    readingTime: 5,
    featured: false,
    breaking: false,
    reviewStatus: 'Verificado pela redação',
    relatedArticleIds: ['art-09', 'art-15', 'art-04'],
    keyTakeaways: [
      'Tanager mapeia plumas de metano com resolução espacial suficiente para apontar a válvula exata em falha.',
      'Parceria público-privada entre Planet Labs, NASA JPL e consórcio Carbon Mapper.',
      'Dados de grandes emissões serão disponibilizados publicamente para transparência climática.',
      'Redução substancial de emissões fugitivas por meio de reparos rápidos e fiscalização internacional.'
    ],
    viewsCount: 3410
  }
];

export const RADAR_UPDATES = [
  { id: 'r1', time: '14:48 UTC', category: 'SATÉLITES', title: 'Sentinel-1C transmite os primeiros dados operacionais após calibração radiométrica', link: '/noticia/copernicus-sentinel-1c-conclui-calibracao-em-orbita-e-inicia-operacao' },
  { id: 'r2', time: '14:15 UTC', category: 'GEOAI', title: 'Novo modelo de fundação SAR atinge 94% de precisão para inundações', link: '/noticia/nova-geracao-modelos-fundacao-geoespaciais-segmentacao-sar' },
  { id: 'r3', time: '13:50 UTC', category: 'BRASIL', title: 'INPE conclui revisão do satélite Amazônia-1B e estuda LiDAR orbital', link: '/noticia/inpe-consolida-novo-satelite-amazonia-1b-e-anuncia-sensor-lidar' },
  { id: 'r4', time: '13:10 UTC', category: 'GIS', title: 'Comunidade lança QGIS 3.42 com renderização em GPU e GeoParquet', link: '/noticia/qgis-lanca-versao-3-42-suporte-nativo-cog-geoparquet-gpugis' },
  { id: 'r5', time: '12:35 UTC', category: 'GEODÉSIA', title: 'IBGE conclui modernização da RBMC com suporte aos 4 sistemas GNSS', link: '/noticia/ibge-conclui-modernizacao-rede-geodesica-sirgas2000-e-expande-rbmc' }
];

export const DOSSIERS: Dossier[] = [
  {
    id: 'dos-1',
    slug: 'amazonia-orbital-sistema-vigilancia-radar',
    title: 'O Escudo Invisível: Como constelações SAR desarticularam o crime ambiental',
    subtitle: 'Uma investigação técnica detalhada sobre a quebra do apagão de nuvens na floresta tropical.',
    excerpt: 'Reportagem multimídia com análise histórica de séries de sensores orbitais e depoimentos de auditores que utilizam inteligência de radar na linha de frente.',
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&auto=format&fit=crop&q=80',
    publishedAt: '03 de Setembro de 2026',
    author: 'Dr. Marcelo Fontes',
    readingTime: 12,
    articleSlug: 'dossie-geozine-amazonia-orbital-sistema-vigilancia-radar',
    chapters: [
      { title: '1. O Apagão Histórico das Nuvens Tropicais', summary: 'Como o desmatamento sazonal se escondia sob a convecção amazônica.' },
      { title: '2. A Física das Micro-ondas e o Retroespalhamento', summary: 'Por que a banda L e a banda C revolucionaram a detecção de biomassa.' },
      { title: '3. Redes Neurais e Redução de Falsos Positivos', summary: 'O salto de 38% para menos de 4% de erros com modelos de aprendizado profundo.' },
      { title: '4. Do Pixel ao Embargo Remoto Judicial', summary: 'A aceitação jurídica de evidências geoespaciais em tribunais superiores.' }
    ]
  },
  {
    id: 'dos-2',
    slug: 'geopolitica-constelacoes-gnss-soberania-espacial',
    title: 'A Batalha pelo Milímetro: A geopolítica silenciosa das constelações GNSS',
    subtitle: 'Por que o controle soberano do sinal de posicionamento orbital é o pilar mais crítico de qualquer economia conectada.',
    excerpt: 'Como Estados Unidos (GPS), União Europeia (Galileo), China (BeiDou) e Rússia (GLONASS) disputam a precisão orbital e a resiliência contra interferências eletrônicas.',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
    publishedAt: '24 de Agosto de 2026',
    author: 'Equipe Editorial Geozine',
    readingTime: 14,
    articleSlug: 'dossie-geozine-amazonia-orbital-sistema-vigilancia-radar',
    chapters: [
      { title: '1. A Dependência Invisível do Relógio Atômico', summary: 'Por que o sistema financeiro e a rede elétrica mundial caem sem o sinal GNSS.' },
      { title: '2. A Ascensão do Galileo e os Serviços Gratuitos de Alta Precisão', summary: 'Como a União Europeia democratizou o posicionamento decimétrico civil.' },
      { title: '3. Ameaças Híbridas: Spoofing e Jamming em Zonas de Conflito', summary: 'A vulnerabilidade de aeronaves civis e o desenvolvimento de receptores protegidos.' },
      { title: '4. O Posicionamento Autônomo Quântico no Horizonte', summary: 'Navegação inercial atômica sem dependência de satélites.' }
    ]
  }
];

export const REPORTS: Report[] = [
  {
    id: 'rep-01',
    slug: 'panorama-mercado-geoespacial-brasil-2026',
    title: 'Panorama do Mercado Geoespacial Brasileiro 2026',
    type: 'Panorama de mercado',
    date: 'Agosto 2026',
    pages: 68,
    fileSize: '14.2 MB',
    description: 'Estudo abrangente sobre o faturamento de empresas de geotecnologia, adoção de SIG no agronegócio, serviços de drones e investimentos em infraestrutura pública no Brasil.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    topics: ['Mercado Geo', 'Brasil', 'Agrimensura', 'Drones']
  },
  {
    id: 'rep-02',
    slug: 'relatorio-tecnico-modelos-fundacao-sensoriamento-remoto',
    title: 'Guia Técnico: Modelos de Fundação em Sensoriamento Remoto',
    type: 'Especial técnico',
    date: 'Julho 2026',
    pages: 44,
    fileSize: '8.7 MB',
    description: 'Análise detalhada de arquiteturas de redes neurais pré-treinadas para observação da Terra (Prithvi, Clay, SatMAE), benchmarks comparativos e orientações de fine-tuning.',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    topics: ['GeoAI', 'Visão Computacional', 'Deep Learning']
  },
  {
    id: 'rep-03',
    slug: 'boletim-mensal-constelacoes-radar-sar-q2',
    title: 'Boletim Trimestral: Constelações SAR em Órbita',
    type: 'Relatório mensal',
    date: 'Junho 2026',
    pages: 32,
    fileSize: '6.1 MB',
    description: 'Mapeamento de todos os satélites de radar operacionais civis e comerciais ativos, capacidades de resolução, frequências de revisita e custos de imagem por quilômetro quadrado.',
    coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop&q=80',
    topics: ['SAR', 'Satélites', 'Copernicus']
  },
  {
    id: 'rep-04',
    slug: 'diretrizes-municipais-gemeos-digitais-ogc-3d',
    title: 'Manual de Boas Práticas: Gêmeos Digitais e Padrões OGC',
    type: 'Dossiê temático',
    date: 'Maio 2026',
    pages: 56,
    fileSize: '11.5 MB',
    description: 'Orientações práticas para secretarias de desenvolvimento urbano estruturarem suas bases de dados territoriais 3D conforme especificações 3D Tiles e CityGML.',
    coverImage: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&auto=format&fit=crop&q=80',
    topics: ['Digital Twins', 'OGC', 'Cidades Inteligentes']
  }
];

export const INGESTION_ITEMS: IngestionItem[] = [
  {
    id: 'ing-1',
    title: 'ESA formaliza comissionamento do satélite Sentinel-1C após conclusão de testes operacionais',
    source: 'ESA / Programa Copernicus',
    url: 'https://copernicus.eu/press/sentinel-1c-operational-announcement',
    discoveredAt: 'Hoje, às 14:12 UTC',
    stage: 'Publicada',
    confidence: 0.98,
    category: 'Satélites & NewSpace'
  },
  {
    id: 'ing-2',
    title: 'Novo modelo de fundação para radar SAR atinge precisão recorde em mapeamento de cheias',
    source: 'arXiv Earth and Planetary Astrophysics',
    url: 'https://arxiv.org/abs/2609.04123',
    discoveredAt: 'Hoje, às 13:40 UTC',
    stage: 'Publicada',
    confidence: 0.95,
    category: 'GeoAI'
  },
  {
    id: 'ing-3',
    title: 'INPE publica ata de homologação de subsistemas da missão Amazônia-1B',
    source: 'Diário Oficial da União / INPE',
    url: 'https://inpe.br/dou/amazonia1b-homologacao',
    discoveredAt: 'Hoje, às 12:15 UTC',
    stage: 'Aguardando publicação',
    confidence: 0.91,
    category: 'Satélites'
  },
  {
    id: 'ing-4',
    title: 'QGIS 3.42 release candidate disponível nos mirrors oficiais',
    source: 'QGIS GitHub Releases',
    url: 'https://github.com/qgis/QGIS/releases/tag/final-3_42_0',
    discoveredAt: 'Ontem, às 19:40 UTC',
    stage: 'Publicada',
    confidence: 0.99,
    category: 'GIS / SIG'
  },
  {
    id: 'ing-5',
    title: 'Artigo repetido: Lançamento do satélite Sentinel-1C em órbita polar',
    source: 'Portal Espacial Secundário',
    url: 'https://space-news-mirror.example/sentinel1c',
    discoveredAt: 'Hoje, às 11:05 UTC',
    stage: 'Duplicata',
    confidence: 0.94,
    category: 'Satélites'
  },
  {
    id: 'ing-6',
    title: 'Proposta preliminar de alteração de padrões OGC API - Tiles 2.0',
    source: 'Open Geospatial Consortium RFC',
    url: 'https://ogc.org/rfcs/tiles-2',
    discoveredAt: 'Hoje, às 08:30 UTC',
    stage: 'Selecionada',
    confidence: 0.88,
    category: 'Dados Abertos'
  },
  {
    id: 'ing-7',
    title: 'Falha de conexão durante raspagem de endpoint XML de agência meteorológica',
    source: 'Serviço Meteorológico Regional',
    url: 'https://meteo-broken-feed.example/xml',
    discoveredAt: 'Hoje, às 06:10 UTC',
    stage: 'Erro',
    confidence: 0.12,
    category: 'Clima'
  }
];

export const TELEMETRY_LOGS: TelemetryLog[] = [
  { id: 'log-1', timestamp: '14:48:12 UTC', channel: 'RSS_FETCH', level: 'SUCCESS', message: 'Feed monitorado: ESA Copernicus Newsroom — 4 novos itens recuperados em 240ms.' },
  { id: 'log-2', timestamp: '14:48:15 UTC', channel: 'DEDUPLICATION', level: 'INFO', message: 'Filtro de similaridade semântica: 3 itens identificados como duplicatas de coberturas existentes e descartados.' },
  { id: 'log-3', timestamp: '14:48:21 UTC', channel: 'SOURCE_VERIFY', level: 'SUCCESS', message: 'Assinatura digital e confiabilidade da fonte ESA confirmadas (Score: 0.98).' },
  { id: 'log-4', timestamp: '14:48:35 UTC', channel: 'ARTICLE_PIPELINE', level: 'SUCCESS', message: 'Minuta editorial estruturada com citação explícita de fontes e metadados georreferenciados.' },
  { id: 'log-5', timestamp: '14:42:01 UTC', channel: 'GEO_LOCATOR', level: 'INFO', message: 'Coordenadas espaciais extraídas: Darmstadt (49.8728, 8.6512) indexadas para visualização no mapa.' },
  { id: 'log-6', timestamp: '14:30:19 UTC', channel: 'SYSTEM', level: 'INFO', message: 'Ciclo de monitoramento de fontes ativas concluído: 8 fontes verificadas, 0 exceções críticas.' },
  { id: 'log-7', timestamp: '14:15:44 UTC', channel: 'RSS_FETCH', level: 'WARNING', message: 'Tempo de resposta elevado no endpoint INPE Notícias (1.820ms), retentativa agendada para T+15min.' }
];

export const AUTOMATION_SETTINGS: AutomationConfig = {
  schedule: 'A cada 30 minutos (00, 30)',
  sourceGroups: ['Agências Espaciais (INPE, ESA, NASA)', 'Institutos Cartográficos (IBGE, OGC)', 'Projetos Open Source (QGIS, OSGeo)', 'Monitoramento Ambiental (MapBiomas)'],
  categoriesEnabled: ['GeoAI', 'Satélites', 'GIS & Cartografia', 'Drones & LiDAR', 'GNSS & Geodésia', 'Clima'],
  minConfidence: 0.85,
  autoPublish: false,
  aiImageGen: false,
  requireAdditionalSource: true,
  maxDailyPublish: 12
};
