/**
 * Categorias do cardápio. Representam o tipo de cozinha associado ao
 * restaurante — NÃO são o cardápio vigente.
 *
 * Não acrescente nomes de pratos, ingredientes, preços, tamanhos ou
 * promoções sem o cardápio oficial. Quando ele chegar, preencha `items`
 * (aparecem como lista no card) e, se quiser, a foto oficial em `photo`.
 * Itens com `confirmed: false` só aparecem depois de confirmados.
 */
import type { ArtName } from '../components/art';

export interface MenuItem {
  name: string;
  /** Descrição curta opcional. */
  description?: string;
  /** Preço exatamente como no cardápio oficial (ex.: 'R$ 00,00'). */
  price?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  description: string;
  /** Destaques genéricos da categoria (sem nomes de pratos). */
  highlights: { label: string; confirmed?: boolean }[];
  /** Itens do cardápio oficial — vazio até o restaurante enviar. */
  items: MenuItem[];
  /** Foto oficial em src/assets/fotos; sem o arquivo, mostra a ilustração. */
  photo: { file: string; alt: string };
  art: ArtName;
  tone: 'green' | 'terracotta' | 'wood' | 'gold' | 'cream';
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'mineira',
    title: 'Comida mineira e brasileira',
    description: 'O tempero de Minas e os sabores da cozinha brasileira, do jeito que a gente reconhece de longe.',
    highlights: [
      { label: 'Pratos tradicionais' },
      { label: 'Preparações caseiras' },
      { label: 'Self-service', confirmed: false },
    ],
    items: [],
    photo: { file: 'cardapio-mineira.jpg', alt: 'Prato da culinária mineira servido no Montanhas de Minas' },
    art: 'pot',
    tone: 'terracotta',
  },
  {
    id: 'carnes',
    title: 'Carnes e churrasco',
    description: 'Preparações com carnes para reunir a família e os amigos em volta da mesa.',
    highlights: [{ label: 'Preparações com carnes' }, { label: 'Para famílias e grupos' }],
    items: [],
    photo: { file: 'cardapio-carnes.jpg', alt: 'Carnes e churrasco servidos no Montanhas de Minas' },
    art: 'grill',
    tone: 'wood',
  },
  {
    id: 'pizzas',
    title: 'Pizzas',
    description: 'Uma das opções lembradas por quem já visitou o restaurante — perfeita para dividir.',
    highlights: [{ label: 'Para compartilhar' }],
    items: [],
    photo: { file: 'cardapio-pizzas.jpg', alt: 'Pizza servida no Montanhas de Minas' },
    art: 'pizza',
    tone: 'green',
  },
  {
    id: 'porcoes',
    title: 'Peixes e porções',
    description: 'Opções para beliscar e compartilhar enquanto a conversa rende.',
    highlights: [{ label: 'Peixes' }, { label: 'Porções para a mesa' }],
    items: [],
    photo: { file: 'cardapio-porcoes.jpg', alt: 'Peixes e porções servidos no Montanhas de Minas' },
    art: 'fish',
    tone: 'gold',
  },
  {
    id: 'bebidas',
    title: 'Bebidas',
    description: 'Drinks, cervejas, vinhos e outras bebidas, conforme o cardápio vigente.',
    highlights: [{ label: 'Drinks' }, { label: 'Cervejas' }, { label: 'Vinhos' }],
    items: [],
    photo: { file: 'cardapio-bebidas.jpg', alt: 'Bebidas servidas no Montanhas de Minas' },
    art: 'drinks',
    tone: 'cream',
  },
];
