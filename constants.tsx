
import React from 'react';
import { type Product, type PreOrderCategory, type BlogPost, type DesignService, type Category, type HomeBanner, type User, type Review, type PortfolioItem, type Order, type CartItem } from './types';

export const USERS: User[] = [
    { phone: '+254723119356', name: 'Super Admin', email: 'admin@roberts.com', address: '1 Admin Way, Westlands, Nairobi', role: 'super-admin', bio: 'Overseeing operations at Roberts Indoor Solutions in Kenya.', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop' },
    { phone: '+15551234567', name: 'Asha Njeri', email: 'asha.njeri@example.com', address: '123 Lavington Green, Nairobi', role: 'customer', bio: 'Lover of all things minimalist and sustainable.', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop' },
    { phone: '+15557654321', name: 'David Mwangi', email: 'david.mwangi@example.com', address: '456 Kilimani Rd, Nairobi', role: 'staff', bio: 'Curator of modern and mid-century furniture. Believes good design should be accessible to everyone in Kenya.', avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop' },
    { phone: '+15551112222', name: 'Fatima Yusuf', email: 'fatima.yuf@example.com', address: '789 Karen Connection, Nairobi', role: 'staff', bio: 'Specializing in bohemian and natural-textured decor. Bringing warmth and personality to every space.', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' },
];

export const PRE_ORDER_BANNER = {
    title: "The Future of Comfort is Here",
    subtitle: "Pre-order our exclusive Smart Furniture collection and save 35%.",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1770&auto=format&fit=crop",
    link: "smart-home"
};

const REVIEWS: Review[] = [
    {id: 1, author: 'Asha N.', avatarUrl: USERS[1].avatarUrl, rating: 5, comment: "Absolutely stunning piece, looks even better in person! Delivery in Nairobi was quick and professional.", date: 'Nov 05, 2023'},
    {id: 2, author: 'Kamau O.', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop', rating: 4, comment: "Great quality for the price. It's the perfect centerpiece for my living room.", date: 'Oct 21, 2023'},
    {id: 3, author: 'Wanjiku M.', avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1886&auto=format&fit=crop', rating: 5, comment: "I'm in love with the texture and color. Highly recommend Roberts for anyone decorating in Kenya.", date: 'Sep 15, 2023'},
];

export const PRODUCTS: Product[] = [
    // Living Room
    { id: 1, name: 'Plush Velvet Modular Sofa', categoryId: 'living-room-furniture-seating-sofas', price: 149900, rating: 4.8, reviewCount: 280, reviews: REVIEWS, description: 'A luxurious and versatile modular sofa, perfect for any modern Nairobi home. Upholstered in rich velvet for ultimate comfort.', status: 'published', creatorId: '+15557654321', creatorName: 'David Mwangi', dateAdded: '2023-08-10T10:00:00Z', salesCount: 50, variants: [{ color: '#000080', colorName: 'Navy Blue', images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1770&auto=format&fit=crop', 'https://images.unsplash.com/photo-1540574163024-5884424b74c3?q=80&w=1770&auto=format&fit=crop'], stock: 8 }] },
    { id: 2, name: 'Marble & Brass Coffee Table', categoryId: 'living-room-furniture-tables-coffee', price: 45000, rating: 4.9, reviewCount: 155, reviews: REVIEWS.slice(0,2), description: 'A stunning nesting table set with genuine Carrara marble tops. A centerpiece for your Kenyan living room.', status: 'published', creatorId: '+15557654321', creatorName: 'David Mwangi', dateAdded: '2023-01-15T10:00:00Z', salesCount: 120, variants: [{ color: '#FFFFFF', colorName: 'White Marble', images: ['https://images.unsplash.com/photo-1611110399433-282c3c0800c7?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1594026112272-cb7bf152c1a8?q=80&w=1887&auto=format&fit=crop'], stock: 15 }] },
    { id: 3, name: 'Hand-Tufted Geometric Rug', categoryId: 'living-room-soft-furnishing-rugs-area', price: 29999, rating: 4.7, reviewCount: 98, reviews: [], description: 'A modern, hand-tufted wool rug with a bold geometric pattern. Adds warmth to any floor in Nairobi.', status: 'published', creatorId: '+15551112222', creatorName: 'Fatima Yusuf', dateAdded: '2023-10-20T10:00:00Z', salesCount: 30, variants: [{ color: '#808080', colorName: 'Grey & Cream', images: ['https://images.unsplash.com/photo-1590819448393-014c24595a89?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1560752564-32f81a8b5e67?q=80&w=1887&auto=format&fit=crop'], stock: 20 }] },
    { id: 4, name: 'Mid-Century Arc Floor Lamp', categoryId: 'living-room-lighting-lamps-floor', price: 17950, rating: 4.8, reviewCount: 130, reviews: REVIEWS, description: 'Iconic design with an adjustable arm for warm, diffused light over your reading nook.', status: 'published', creatorId: '+15557654321', creatorName: 'David Mwangi', dateAdded: '2023-05-05T10:00:00Z', salesCount: 80, variants: [{ color: '#B8860B', colorName: 'Antique Brass', images: ['https://images.unsplash.com/photo-1594026112272-cb7bf152c1a8?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1611110399433-282c3c0800c7?q=80&w=1887&auto=format&fit=crop'], stock: 2 }], sale: { discount: 0.10 } },
    { id: 5, name: 'Handwoven Textured Pillow', categoryId: 'living-room-soft-furnishing-cushions-throw', price: 3999, rating: 4.5, reviewCount: 150, reviews: [], description: 'Adds warmth and texture, crafted from organic cotton by Kenyan artisans.', status: 'published', creatorId: '+15551112222', creatorName: 'Fatima Yusuf', dateAdded: '2023-03-12T10:00:00Z', salesCount: 200, variants: [{ color: '#D2B48C', colorName: 'Tan', images: ['https://images.unsplash.com/photo-1616627780414-b654a8677c03?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1617323821612-4a0f1b7b0f1e?q=80&w=870&auto=format&fit=crop'], stock: 50 }] },
    { id: 6, name: 'Floating Oak Media Console', categoryId: 'living-room-furniture-storage-media', price: 42000, rating: 4.8, reviewCount: 112, reviews: REVIEWS, description: 'A minimalist media console made from solid Mvuli wood, sourced locally in Kenya.', status: 'published', creatorId: '+15557654321', creatorName: 'David Mwangi', dateAdded: '2024-01-02T10:00:00Z', salesCount: 2, variants: [{ color: '#C2B280', colorName: 'Natural Oak', images: ['https://images.unsplash.com/photo-1599408169543-a51a1a733554?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1593349429498-5a3637d15438?q=80&w=1887&auto=format&fit=crop'], stock: 0 }] },
    { id: 7, name: 'Luxe Velvet Throw Blanket', categoryId: 'living-room-soft-furnishing-cushions-blankets', price: 5999, rating: 4.9, reviewCount: 210, reviews: [], description: 'Incredibly soft and plush, perfect for cozy Nairobi evenings.', status: 'published', creatorId: '+15551112222', creatorName: 'Fatima Yusuf', dateAdded: '2023-11-01T10:00:00Z', salesCount: 85, variants: [{ color: '#355E3B', colorName: 'Emerald Green', images: ['https://images.unsplash.com/photo-1577968512351-f483a9a7a9c8?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1588676231268-9a7c3a078e85?q=80&w=1887&auto=format&fit=crop'], stock: 30 }], sale: { discount: 0.25 } },
    { id: 8, name: 'Abstract Wall Art Print', categoryId: 'living-room-decor-wall-art', price: 8500, rating: 4.7, reviewCount: 88, reviews: [], description: 'A framed giclée print to add a sophisticated touch to your walls. A great find for art lovers in Kenya.', status: 'published', creatorId: '+15557654321', creatorName: 'David Mwangi', dateAdded: '2023-09-18T10:00:00Z', salesCount: 40, variants: [{ color: '#F0EAD6', colorName: 'Neutral Tones', images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1945&auto=format&fit=crop', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1945&auto=format&fit=crop'], stock: 25 }] },
    { id: 9, name: 'Bohemian Rattan Armchair', categoryId: 'living-room-furniture-seating-armchairs', price: 32000, rating: 4.8, reviewCount: 124, reviews: REVIEWS, description: 'A beautifully crafted rattan armchair with comfy cushions. Perfect for a coastal feel in your Nairobi apartment.', status: 'published', creatorId: '+15551112222', creatorName: 'Fatima Yusuf', preOrder: { discount: 0.25, arrivalDays: 75 }, dateAdded: '2023-11-10T10:00:00Z', salesCount: 60, variants: [{ color: '#E1C699', colorName: 'Natural Rattan', images: ['https://images.unsplash.com/photo-1634495586144-8e8a2d759a2f?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1567016432822-232125515ef2?q=80&w=1887&auto=format&fit=crop'], stock: 100 }] },
    { id: 10, name: 'Smart WiFi Aroma Diffuser', categoryId: 'living-room-decor-objects-vases', price: 5999, rating: 4.8, reviewCount: 450, reviews: [], description: 'Control your home\'s ambiance from anywhere with this smart diffuser. A must-have for tech-savvy Nairobians.', status: 'published', creatorId: '+15557654321', creatorName: 'David Mwangi', dateAdded: '2023-07-22T10:00:00Z', salesCount: 150, variants: [{ color: '#BDB7AB', colorName: 'Light Wood', images: ['https://images.unsplash.com/photo-1591022834423-24c890412699?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1616474673981-2b63528b9355?q=80&w=1887&auto=format&fit=crop'], stock: 40 }] },

    // Bedroom
    { id: 11, name: 'Linen Duvet Cover Set', categoryId: 'bedroom-bedding-linen-duvet', price: 25000, rating: 4.9, reviewCount: 310, reviews: REVIEWS, description: 'Breathable comfort of 100% pure European flax linen.', status: 'published', creatorId: '+15551112222', creatorName: 'Fatima Yusuf', dateAdded: '2023-06-14T10:00:00Z', salesCount: 130, variants: [{ color: '#D3D3D3', colorName: 'Light Grey', images: ['https://images.unsplash.com/photo-1606893994341-79573867f13c?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1588676231268-9a7c3a078e85?q=80&w=1887&auto=format&fit=crop'], stock: 18 }] },
    { id: 12, name: 'Solid Oak Nightstand', categoryId: 'bedroom-furniture-storage-nightstands', price: 22000, rating: 4.8, reviewCount: 180, reviews: [], description: 'A minimalist nightstand with a single drawer and solid oak construction.', status: 'published', creatorId: '+15557654321', creatorName: 'David Mwangi', dateAdded: '2023-08-01T10:00:00Z', salesCount: 90, variants: [{ color: '#C2B280', colorName: 'Natural Oak', images: ['https://images.unsplash.com/photo-1594224996495-2a6c1a8a3d53?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1594224996495-2a6c1a8a3d53?q=80&w=1887&auto=format&fit=crop'], stock: 22 }] },
    
    // Dining Room
    { id: 21, name: 'Acacia Wood Dining Table', categoryId: 'dining-room-furniture-sets-tables', price: 89999, rating: 4.9, reviewCount: 95, reviews: REVIEWS.slice(1,2), description: 'A beautiful and durable dining table made from solid acacia wood, perfect for family dinners in your Nairobi home.', status: 'published', creatorId: '+15557654321', creatorName: 'David Mwangi', dateAdded: '2024-02-01T10:00:00Z', salesCount: 15, variants: [{ color: '#8B4513', colorName: 'Saddle Brown', images: ['https://images.unsplash.com/photo-1554104707-a76b270e4bbb?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=1887&auto=format&fit=crop'], stock: 10 }] },
    { id: 22, name: 'Velvet Upholstered Dining Chair', categoryId: 'dining-room-furniture-sets-chairs', price: 12500, rating: 4.7, reviewCount: 120, reviews: [], description: 'Elegant dining chairs with plush velvet upholstery and sturdy metal legs for a touch of luxury.', status: 'published', creatorId: '+15551112222', creatorName: 'Fatima Yusuf', dateAdded: '2024-02-05T10:00:00Z', salesCount: 40, variants: [{ color: '#006400', colorName: 'Forest Green', images: ['https://images.unsplash.com/photo-1596163361491-1defa75e2f5f?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1596163361491-1defa75e2f5f?q=80&w=1887&auto=format&fit=crop'], stock: 30 }] },
    { id: 23, name: 'Industrial Kitchen Island', categoryId: 'kitchen-storage-organization-racks', price: 65000, rating: 4.8, reviewCount: 70, reviews: [], description: 'A functional kitchen island with a butcher block top, open shelving, and a wine rack. A centerpiece for any modern Kenyan kitchen.', status: 'published', creatorId: '+15557654321', creatorName: 'David Mwangi', dateAdded: '2024-01-20T10:00:00Z', salesCount: 8, variants: [{ color: '#4A4A4A', colorName: 'Graphite', images: ['https://images.unsplash.com/photo-1600574937227-75368145897c?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1600574937227-75368145897c?q=80&w=1887&auto=format&fit=crop'], stock: 5 }] },
    
    // Outdoor
    { id: 31, name: 'All-Weather Wicker Patio Set', categoryId: 'outdoor-furniture-seating-sets', price: 129000, rating: 4.8, reviewCount: 88, reviews: REVIEWS.slice(0,1), description: 'A complete 4-piece patio set with comfortable cushions, perfect for enjoying the beautiful Nairobi weather.', status: 'published', creatorId: '+15551112222', creatorName: 'Fatima Yusuf', dateAdded: '2024-02-10T10:00:00Z', salesCount: 12, variants: [{ color: '#A0522D', colorName: 'Sienna', images: ['https://images.unsplash.com/photo-1613516530434-2e2b3e8a3b3b?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1613516530434-2e2b3e8a3b3b?q=80&w=1887&auto=format&fit=crop'], stock: 7 }] },
    { id: 32, name: 'Ceramic Glazed Planter Pot', categoryId: 'outdoor-plants-planters-flowerpots', price: 4500, rating: 4.9, reviewCount: 250, reviews: [], description: 'A beautiful, large ceramic planter with a drainage hole, ideal for your patio or balcony garden.', status: 'published', creatorId: '+15551112222', creatorName: 'Fatima Yusuf', dateAdded: '2023-12-15T10:00:00Z', salesCount: 90, variants: [{ color: '#4682B4', colorName: 'Steel Blue', images: ['https://images.unsplash.com/photo-1591113632281-22fe64169933?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1591113632281-22fe64169933?q=80&w=1887&auto=format&fit=crop'], stock: 45 }] },
];

export const HOME_BANNERS: HomeBanner[] = [
    { id: 1, title: 'Expert After-Sale Services in Nairobi', subtitle: 'From measurements to fitting, our Kenyan team is here to help complete your home.', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1770&auto=format&fit=crop', buttonText: 'Explore Services', link: { view: 'services' }, layout: 'split' },
    { id: 2, title: 'Our Completed Projects', subtitle: 'See how we have transformed homes across Nairobi and get inspired for your own space.', imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1770&auto=format&fit=crop', buttonText: 'View Our Work', link: { view: 'portfolio' }, layout: 'full' },
];

export const BLACK_FRIDAY_DEALS = PRODUCTS.filter(p => p.sale && p.status === 'published');
const PRE_ORDER_PRODUCTS = PRODUCTS.filter(p => p.preOrder && p.status === 'published');

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
    { id: 1, title: 'Lavington Living Room Refresh', category: 'Living Rooms', description: "A complete transformation of a family living space into a bright, modern, and functional area.", imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1770&auto=format&fit=crop' },
    { id: 2, title: 'Karen Kitchen Remodel', category: 'Kitchens', description: "An outdated kitchen was updated with custom cabinetry, smart appliances, and a marble island.", imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1770&auto=format&fit=crop' },
    { id: 3, title: 'Westlands Bedroom Sanctuary', category: 'Bedrooms', description: "We created a peaceful retreat with a neutral color palette, layered textiles, and custom blackout curtains.", imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1770&auto=format&fit=crop' },
    { id: 4, title: 'Muthaiga Outdoor Oasis', category: 'Outdoor', description: "A new patio set and smart lighting transformed this backyard into the perfect space for entertaining.", imageUrl: 'https://images.unsplash.com/photo-1574112521191-383457c74a2b?q=80&w=1887&auto=format&fit=crop' },
];

export const ORDERS: Order[] = [
    {
        id: '#ROB1024',
        date: 'Nov 10, 2023',
        status: 'Delivered',
        total: 153899,
        shippingAddress: '123 Lavington Green, Nairobi',
        items: [
            {...PRODUCTS.find(p => p.id === 1) as Product, quantity: 1, selectedVariant: PRODUCTS.find(p => p.id === 1)!.variants[0] },
            {...PRODUCTS.find(p => p.id === 5) as Product, quantity: 2, selectedVariant: PRODUCTS.find(p => p.id === 5)!.variants[0] },
        ]
    },
    {
        id: '#ROB1021',
        date: 'Oct 25, 2023',
        status: 'Shipped',
        total: 45000,
        shippingAddress: '123 Lavington Green, Nairobi',
        items: [
            {...PRODUCTS.find(p => p.id === 2) as Product, quantity: 1, selectedVariant: PRODUCTS.find(p => p.id === 2)!.variants[0] },
        ]
    }
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "5 Ways to Bring Natural Light into Your Nairobi Home",
        excerpt: "Brighten up your space with these simple tips.",
        content: "Natural light can transform a room, making it feel larger, more inviting, and boosting your mood. Here in Nairobi, where the sun graces us most of the year, maximizing daylight is a design essential.\n\n1. Use Light Colors: Painting your walls in light, neutral tones like white, beige, or soft grey reflects light beautifully.\n\n2. Strategic Mirrors: A large mirror placed opposite a window can double the amount of light in a room.\n\n3. Sheer Curtains: Ditch heavy drapes for lightweight, sheer curtains that provide privacy without blocking the sun.\n\n4. Clean Your Windows: It sounds simple, but you'd be surprised how much grime can accumulate and dim the light.\n\n5. Declutter: A minimalist approach allows light to move freely through a space. Keep window sills clear and choose furniture with a lighter visual weight.",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1769&auto=format&fit=crop",
        author: "Fatima Yusuf",
        date: "Oct 15, 2023",
        status: "published",
        bgColor: "yellow",
        relatedProductIds: [8, 2],
    },
    {
        id: 2,
        title: "The Rise of Smart Furniture in Kenya",
        excerpt: "How technology is shaping our living rooms.",
        content: "Smart furniture is no longer a futuristic concept; it's here, and it's making life more convenient. From sofas with built-in chargers to coffee tables with integrated speakers, Kenyan homes are getting a tech upgrade.\n\nOur latest collection features smart diffusers you can control from your phone, media consoles designed for modern entertainment systems, and lighting solutions that adapt to your mood. Embrace the future of comfort with Roberts.",
        imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1770&auto=format&fit=crop",
        author: "David Mwangi",
        date: "Nov 02, 2023",
        status: "published",
        bgColor: "black",
        relatedProductIds: [10],
    },
    {
        id: 3,
        title: "Choosing the Perfect Rug for Your Space",
        excerpt: "A guide to sizes, materials, and styles.",
        content: "A rug can anchor a room, define a space, and add warmth and texture. But choosing the right one can be daunting. Consider the size: in a living room, at least the front legs of your sofa and chairs should be on the rug. Think about material: wool is durable and soft, while natural fibers like jute add a rustic touch. Finally, style: a bold geometric pattern can be a statement piece, while a neutral rug provides a calming foundation. Visit us to see our hand-tufted collection.",
        imageUrl: "https://images.unsplash.com/photo-1590819448393-014c24595a89?q=80&w=1887&auto=format&fit=crop",
        author: "Fatima Yusuf",
        date: "Sep 28, 2023",
        status: "pending",
        bgColor: "yellow",
        relatedProductIds: [3],
    }
];

export const PRE_ORDER_CATEGORIES: PreOrderCategory[] = [
    {
        id: 'smart-home',
        name: 'Smart Home Collection',
        blog: {
            title: 'Welcome to the Future of Living',
            content: "Our new Smart Home Collection is designed to seamlessly integrate technology into your daily life. From app-controlled diffusers to furniture with built-in charging, these pieces combine cutting-edge functionality with the timeless style you expect from Roberts. Pre-order now to be the first to experience this innovative collection and enjoy an exclusive discount.",
            imageUrl: 'https://images.unsplash.com/photo-1591022834423-24c890412699?q=80&w=1887&auto=format&fit=crop'
        },
        products: PRE_ORDER_PRODUCTS
    }
];

export const CATEGORIES: Category[] = [
    { 
        id: 'living-room', 
        name: 'Living Room', 
        description: 'Comfortable, stylish, and built for life.', 
        imageUrl: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1932&auto=format&fit=crop', 
        hero: { title: 'The Heart of Your Home', subtitle: 'Discover sofas, tables, and decor that bring everyone together.', imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1770&auto=format&fit=crop' },
        theme: { bgClass: 'bg-stone-50', primaryText: 'text-stone-900', buttonBg: 'bg-stone-800' },
        children: [
            { id: 'living-room-furniture', name: 'Furniture', children: [
                { id: 'living-room-furniture-seating', name: 'Seating', children: [
                    { id: 'living-room-furniture-seating-sofas', name: '# Sofas'},
                    { id: 'living-room-furniture-seating-armchairs', name: '# Armchairs'},
                    { id: 'living-room-furniture-seating-ottomans', name: '# Ottomans'},
                ]},
                { id: 'living-room-furniture-tables', name: 'Tables', children: [
                    { id: 'living-room-furniture-tables-coffee', name: '# Coffee Tables'},
                    { id: 'living-room-furniture-tables-side', name: '# Side Tables'},
                ] },
                { id: 'living-room-furniture-storage', name: 'Storage and Media', children: [
                    { id: 'living-room-furniture-storage-media', name: '# TV Consoles'},
                    { id: 'living-room-furniture-storage-bookcases', name: '# Bookcases'},
                ] },
            ]},
            { id: 'living-room-soft-furnishing', name: 'Soft Furnishing', children: [
                { id: 'living-room-soft-furnishing-cushions', name: 'Cushions & Throws', children: [
                     { id: 'living-room-soft-furnishing-cushions-throw', name: '# Throw Pillows'},
                     { id: 'living-room-soft-furnishing-cushions-blankets', name: '# Blankets'},
                ]},
                { id: 'living-room-soft-furnishing-rugs', name: 'Rugs & Carpets', children: [
                    { id: 'living-room-soft-furnishing-rugs-area', name: '# Area Rugs'},
                ] },
            ]},
            { id: 'living-room-lighting', name: 'Lighting', children: [
                { id: 'living-room-lighting-lamps', name: 'Lamps', children: [
                    { id: 'living-room-lighting-lamps-table', name: '# Table Lamps'},
                    { id: 'living-room-lighting-lamps-floor', name: '# Floor Lamps'},
                ] },
            ]},
            { id: 'living-room-decor', name: 'Decor', children: [
                { id: 'living-room-decor-wall', name: 'Wall Decor', children: [
                    { id: 'living-room-decor-wall-art', name: '# Wall Art'},
                    { id: 'living-room-decor-wall-mirrors', name: '# Mirrors'},
                ] },
                { id: 'living-room-decor-objects', name: 'Decorative Objects', children: [
                    { id: 'living-room-decor-objects-vases', name: '# Vases'},
                ] },
            ]},
        ]
    },
    { 
        id: 'bedroom', 
        name: 'Bedroom', 
        description: 'Create your personal sanctuary for rest and relaxation.', 
        imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16433d?q=80&w=1924&auto=format&fit=crop',
        hero: { title: 'Your Personal Sanctuary', subtitle: 'Find beds, bedding, and storage that create a peaceful retreat.', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1770&auto=format&fit=crop' },
        theme: { bgClass: 'bg-slate-50', primaryText: 'text-slate-900', buttonBg: 'bg-slate-800' },
        children: [
            { id: 'bedroom-furniture', name: 'Furniture', children: [
                 { id: 'bedroom-furniture-beds', name: 'Beds', children: [
                    { id: 'bedroom-furniture-beds-frames', name: '# Bed Frames'},
                 ] },
                 { id: 'bedroom-furniture-storage', name: 'Storage', children: [
                    { id: 'bedroom-furniture-storage-wardrobes', name: '# Wardrobes'},
                    { id: 'bedroom-furniture-storage-nightstands', name: '# Nightstands'},
                 ] },
            ]},
            { id: 'bedroom-bedding', name: 'Bedding', children: [
                { id: 'bedroom-bedding-linen', name: 'Linen', children: [
                    { id: 'bedroom-bedding-linen-duvet', name: '# Duvet Covers'},
                    { id: 'bedroom-bedding-linen-sheets', name: '# Bed Sheets'},
                ] },
            ]},
        ]
    },
     { 
        id: 'dining-room', 
        name: 'Dining Room', 
        description: 'Gather around for meals and memories.', 
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a67769e03?q=80&w=1887&auto=format&fit=crop',
        hero: { title: 'Gather & Feast', subtitle: 'Dine in style with our collection of tables, chairs, and kitchen essentials.', imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1770&auto=format&fit=crop' },
        theme: { bgClass: 'bg-orange-50', primaryText: 'text-orange-900', buttonBg: 'bg-orange-800' },
        children: [
            { id: 'dining-room-furniture', name: 'Furniture', children: [
                { id: 'dining-room-furniture-sets', name: 'Dining Sets', children: [
                    { id: 'dining-room-furniture-sets-tables', name: '# Dining Tables'},
                    { id: 'dining-room-furniture-sets-chairs', name: '# Dining Chairs'},
                ] },
            ]},
        ]
    },
    {
        id: 'kitchen',
        name: 'Kitchen',
        children: [
            { id: 'kitchen-storage', name: 'Storage', children: [
                { id: 'kitchen-storage-organization', name: 'Organization', children: [
                     { id: 'kitchen-storage-organization-racks', name: '# Storage Racks'},
                ]}
            ]}
        ]
    },
    { id: 'home-office', name: 'Home Office' },
    { 
        id: 'outdoor', 
        name: 'Outdoor', 
        description: 'Extend your living space to the outdoors.', 
        imageUrl: 'https://images.unsplash.com/photo-1613516530434-2e2b3e8a3b3b?q=80&w=1887&auto=format&fit=crop',
        hero: { title: 'Your Outdoor Oasis', subtitle: 'Create a stylish and comfortable outdoor retreat for relaxing and entertaining.', imageUrl: 'https://images.unsplash.com/photo-1574112521191-383457c74a2b?q=80&w=1887&auto=format&fit=crop' },
        theme: { bgClass: 'bg-green-50', primaryText: 'text-green-900', buttonBg: 'bg-green-800' },
        children: [
            { id: 'outdoor-furniture', name: 'Furniture', children: [
                { id: 'outdoor-furniture-seating', name: 'Seating', children: [
                    { id: 'outdoor-furniture-seating-sets', name: '# Bistro Sets'},
                ]},
            ]},
            { id: 'outdoor-plants', name: 'Plants & Planters', children: [
                 { id: 'outdoor-plants-planters', name: 'Planters', children: [
                    { id: 'outdoor-plants-planters-flowerpots', name: '# Flower Pots'},
                 ]},
            ]},
        ]
    },
    { id: 'bathroom', name: 'Bathroom' },
    { id: 'kids-room', name: "Kids' Room" },
];

export const FILTER_CATEGORIES = ['All', ...CATEGORIES.map(c => c.name)];

export const DESIGN_SERVICES: DesignService[] = [
    {
        id: 'consultation',
        name: 'In-Home Design Consultation',
        price: 'KES 10,000',
        description: 'A 2-hour consultation with one of our expert designers in your home. We\'ll help you define your style, plan your space, and choose the perfect color palette.',
        features: ['Personalized style assessment', 'Space planning and layout advice', 'Color palette recommendations', 'Actionable shopping list'],
        imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop'
    },
    {
        id: 'full-service',
        name: 'Full-Service Interior Design',
        price: 'Starts at KES 50,000 / room',
        description: 'From concept to completion, we handle every detail of your design project. This package is perfect for new homes or full-scale renovations.',
        features: ['Complete room design concepts', 'Furniture & material sourcing', 'Project management & installation', 'The final, beautiful reveal'],
        imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1858&auto=format&fit=crop'
    }
];

// --- Start of Helper Functions ---
export const findCategoryById = (categories: Category[], id: string): Category | null => {
  for (const category of categories) {
    if (category.id === id) return category;
    if (category.children) {
      const found = findCategoryById(category.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const getCategoryAndDescendantsIds = (category: Category): string[] => {
  let ids = [category.id];
  if (category.children) {
    for (const child of category.children) {
      ids = [...ids, ...getCategoryAndDescendantsIds(child)];
    }
  }
  return ids;
};

export const getCategoryPath = (categories: Category[], id: string, path: Category[] = []): Category[] => {
  for (const category of categories) {
    const newPath = [...path, category];
    if (category.id === id) return newPath;
    if (category.children) {
      const foundPath = getCategoryPath(category.children, id, newPath);
      if (foundPath.length > newPath.length) return foundPath;
    }
  }
  return [];
};
// --- End of Helper Functions ---


// HELPER FUNCTIONS & CONSTANTS
export const BUSINESS_PHONE_NUMBER = '254723119356';

export const formatPrice = (price: number) => {
    return `KES ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export const generateWhatsAppMessage = (cart: CartItem[], user: User | null): string => {
    const subtotal = cart.reduce((acc, item) => {
        let price = item.price;
        if (item.sale) price *= (1 - item.sale.discount);
        if (item.preOrder) price *= (1 - item.preOrder.discount);
        return acc + price * item.quantity;
    }, 0);
    const shipping = subtotal > 0 ? 500 : 0;
    const total = subtotal + shipping;

    const itemsList = cart.map((item, index) => 
        `${index + 1}. ${item.name} (${item.selectedVariant.colorName}) x ${item.quantity} - ${formatPrice((item.price * (1-(item.sale?.discount || 0)) * (1-(item.preOrder?.discount || 0))) * item.quantity)}`
    ).join('\n');

    let message = `Hello Roberts Indoor Solutions,\nI would like to place an order for the following items:\n\n${itemsList}\n\n`;
    message += `Subtotal: ${formatPrice(subtotal)}\n`;
    message += `Shipping: ${formatPrice(shipping)}\n`;
    message += `*Total: ${formatPrice(total)}*\n\n`;

    if (user) {
        message += `My delivery details are:\nName: ${user.name}\nAddress: ${user.address}\nPhone: ${user.phone}`;
    } else {
        message += `Please confirm my order and I will provide my delivery details.`;
    }
    
    return message;
};

// ICONS
export const MenuIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
  </svg>
);

export const SearchIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
  </svg>
);

export const CartIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
  </svg>
);

export const HeartIcon = ({ className = "w-6 h-6", isFilled = false }: { className?: string; isFilled?: boolean }) => (
    <svg className={className} fill={isFilled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"></path>
    </svg>
);

export const ChevronLeftIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
    </svg>
);

export const ChevronRightIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
    </svg>
);

export const ChevronDownIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
);

export const CloseIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
);

export const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.75 13.96c.25.13.42.2.55.32.13.13.19.29.19.52s-.06.46-.19.58c-.13.13-.29.19-.52.19h-.1a10.43 10.43 0 01-1.6-.19c-.52-.19-1.01-.45-1.47-.78a6.39 6.39 0 01-1.34-1.34c-.32-.46-.58-.95-.78-1.47a10.43 10.43 0 01-.19-1.6V10c0-.23.06-.39.19-.52s.29-.19.52-.19h.1c.23 0 .39.06.52.19.13.13.2.29.32.55s.19.52.26.78c.06.26.13.52.19.72s.13.39.19.52zM12 2a10 10 0 00-10 10c0 1.75.46 3.5 1.34 5.03L2 22l5.25-1.34A9.95 9.95 0 0012 22a10 10 0 0010-10A10 10 0 0012 2z"></path>
    </svg>
);

export const AccountIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
    </svg>
);

export const BookmarkIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
    </svg>
);

export const DashboardIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
    </svg>
);

export const BlogIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 18h5"></path>
    </svg>
);

export const ServicesIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
);
