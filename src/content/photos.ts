/**
 * Fotografias oficiais. Salve os arquivos em `src/assets/fotos/` com o nome
 * indicado — o build gera versões AVIF/WebP otimizadas. Enquanto um arquivo
 * não existir, o site mostra uma ilustração no lugar.
 *
 * Use SOMENTE fotos reais do Restaurante Montanhas de Minas. Nunca use
 * imagens de bancos de imagem como se fossem do restaurante.
 */
import type { ArtName } from '../components/art';

export interface PhotoRef {
  file: string;
  alt: string;
  /** Legenda curta, exibida na galeria e no visualizador. */
  label: string;
  /** Ilustração exibida enquanto a foto não existe. */
  art: ArtName;
  /** Só entra na galeria quando confirmado (ex.: área infantil). */
  confirmed?: boolean;
}

export const featuredPhotos = {
  hero: { file: 'hero.jpg', alt: 'Restaurante Montanhas de Minas, na zona rural de Itaúna', label: 'Montanhas de Minas', art: 'house' },
  essence: { file: 'essencia-01.jpg', alt: 'Ambiente do Restaurante Montanhas de Minas', label: 'Nosso espaço', art: 'table' },
  essenceDetail: { file: 'essencia-02.jpg', alt: 'Detalhe de um prato servido no restaurante', label: 'À mesa', art: 'plate' },
} satisfies Record<string, PhotoRef>;

/** Ordem da galeria: a primeira foto ocupa o destaque do mosaico. */
export const galleryPhotos: PhotoRef[] = [
  { file: 'ambiente-fachada.jpg', alt: 'Fachada e área externa do restaurante', label: 'Fachada e área externa', art: 'house' },
  { file: 'ambiente-interno.jpg', alt: 'Ambiente interno do restaurante', label: 'Ambiente interno', art: 'lamp' },
  { file: 'ambiente-mesas.jpg', alt: 'Mesas e espaços de convivência', label: 'Mesas e convivência', art: 'table' },
  { file: 'ambiente-pratos.jpg', alt: 'Pratos e detalhes gastronômicos', label: 'Pratos e detalhes', art: 'plate' },
  { file: 'ambiente-natureza.jpg', alt: 'Natureza ao redor do restaurante', label: 'Natureza ao redor', art: 'trees' },
  { file: 'ambiente-area-externa.jpg', alt: 'Área externa e espaço ao ar livre', label: 'Espaço ao ar livre', art: 'mountains' },
  { file: 'ambiente-infantil.jpg', alt: 'Área infantil do restaurante', label: 'Área infantil', art: 'swing', confirmed: false },
  { file: 'ambiente-musica.jpg', alt: 'Apresentação musical no restaurante', label: 'Música ao vivo', art: 'guitar', confirmed: false },
];

export const visibleGallery = galleryPhotos.filter((p) => p.confirmed !== false);
