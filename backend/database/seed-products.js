"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient({
    datasourceUrl: 'postgresql://postgres:postgres@localhost:5432/veyra?schema=public'
});
var demoProducts = [
    // Veyra Brand (Demo)
    {
        name: 'Gentle Foaming Cleanser',
        brand: 'Veyra Basics',
        category: 'CLEANSER',
        description: 'A mild foaming cleanser that removes dirt and oil without stripping the skin.',
        skinTypes: ['COMBINATION', 'OILY'],
        concerns: ['ACNE', 'LARGE_PORES'],
        suitableFor: ['All skin types', 'Sensitive skin'],
        price: 18.00,
        currency: 'USD',
        imageUrl: '/products/cleanser.jpg',
        ingredients: ['Ceramides', 'Niacinamide', 'Hyaluronic Acid']
    },
    {
        name: 'Water Gel Hydrator',
        brand: 'Veyra Hydro',
        category: 'MOISTURIZER',
        description: 'An oil-free gel moisturizer that locks in intense hydration.',
        skinTypes: ['COMBINATION', 'OILY', 'NORMAL'],
        concerns: ['UNEVEN_TONE', 'LARGE_PORES'],
        suitableFor: ['Combination skin', 'Oily skin'],
        price: 25.00,
        currency: 'USD',
        imageUrl: '/products/moisturizer.jpg',
        ingredients: ['Hyaluronic Acid', 'Glycerin', 'Dimethicone']
    },
    {
        name: 'Broad Spectrum SPF 50',
        brand: 'Veyra Sun',
        category: 'SUNSCREEN',
        description: 'Daily lightweight protection from UVA and UVB rays.',
        skinTypes: ['COMBINATION', 'DRY', 'OILY', 'NORMAL'],
        concerns: ['UNEVEN_TONE', 'DARK_CIRCLES'],
        suitableFor: ['All skin types'],
        price: 22.00,
        currency: 'USD',
        imageUrl: '/products/sunscreen.jpg',
        ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Vitamin E']
    },
    // Real Indian Brands
    {
        name: '10% Niacinamide Serum',
        brand: 'Minimalist',
        category: 'SERUM',
        description: 'Nourishing serum that promotes protein synthesis, reduces melanin concentration & improves skin complexion.',
        skinTypes: ['ALL', 'COMBINATION', 'OILY'],
        concerns: ['UNEVEN_TONE', 'ACNE', 'LARGE_PORES'],
        suitableFor: ['All skin types'],
        price: 599.00,
        currency: 'INR',
        imageUrl: '/products/serum.jpg',
        ingredients: ['Niacinamide', 'Zinc PCA']
    },
    {
        name: '72 Hr Hydrating Probiotics Gel Moisturizer',
        brand: 'Dot & Key',
        category: 'MOISTURIZER',
        description: 'Oil-free gel moisturizer that locks in hydration without feeling sticky.',
        skinTypes: ['OILY', 'COMBINATION'],
        concerns: ['DRYNESS'],
        suitableFor: ['Oily skin', 'Acne-prone skin'],
        price: 595.00,
        currency: 'INR',
        imageUrl: '/products/moisturizer.jpg',
        ingredients: ['Probiotics', 'Hyaluronic Acid', 'Kombucha']
    },
    {
        name: 'Vitamin C Serum',
        brand: 'Foxtale',
        category: 'SERUM',
        description: 'Brightening serum that gives a radiant glow and tackles hyperpigmentation.',
        skinTypes: ['ALL', 'COMBINATION', 'DRY'],
        concerns: ['UNEVEN_TONE', 'DARK_CIRCLES', 'DULLNESS'],
        suitableFor: ['All skin types'],
        price: 595.00,
        currency: 'INR',
        imageUrl: '/products/serum.jpg',
        ingredients: ['L-Ascorbic Acid', 'Vitamin E']
    },
    {
        name: '0.15% Retinol Night Serum',
        brand: 'Foxtale',
        category: 'TREATMENT',
        description: 'Gentle retinol serum to reduce fine lines, texture, and promote collagen.',
        skinTypes: ['ALL', 'COMBINATION', 'OILY', 'DRY'],
        concerns: ['AGING', 'UNEVEN_TONE'],
        suitableFor: ['All skin types', 'Beginners'],
        price: 699.00,
        currency: 'INR',
        imageUrl: '/products/treatment.jpg',
        ingredients: ['Retinol', 'Peptides']
    },
    {
        name: 'Cica & Ceramide Night Rescue',
        brand: 'Dot & Key',
        category: 'TREATMENT',
        description: 'Calming repair cream that heals the skin barrier overnight.',
        skinTypes: ['DRY', 'SENSITIVE', 'COMBINATION'],
        concerns: ['REDNESS', 'DRYNESS'],
        suitableFor: ['Sensitive skin'],
        price: 945.00,
        currency: 'INR',
        imageUrl: '/products/treatment.jpg',
        ingredients: ['Cica', 'Ceramides']
    },
    {
        name: 'Green Tea Pore Cleansing Wash',
        brand: 'Plum',
        category: 'CLEANSER',
        description: 'Gentle, non-drying face wash that combats acne and removes excess oil.',
        skinTypes: ['OILY', 'COMBINATION'],
        concerns: ['ACNE', 'LARGE_PORES'],
        suitableFor: ['Acne-prone skin'],
        price: 345.00,
        currency: 'INR',
        imageUrl: '/products/cleanser.jpg',
        ingredients: ['Green Tea Extracts', 'Glycolic Acid']
    },
    {
        name: 'PHA Alcohol-Free Toner',
        brand: 'Minimalist',
        category: 'TONER',
        description: 'Mild exfoliating toner that tightens pores and balances skin pH.',
        skinTypes: ['OILY', 'COMBINATION', 'SENSITIVE'],
        concerns: ['LARGE_PORES', 'ACNE'],
        suitableFor: ['All skin types'],
        price: 399.00,
        currency: 'INR',
        imageUrl: '/products/toner.jpg',
        ingredients: ['PHA', 'Niacinamide', 'Aloe Vera']
    },
    {
        name: 'Under Eye Cream with Coffee',
        brand: 'MCaffeine',
        category: 'EYE CREAM',
        description: 'Coffee-infused eye cream to reduce puffiness and dark circles.',
        skinTypes: ['ALL'],
        concerns: ['DARK_CIRCLES'],
        suitableFor: ['All skin types'],
        price: 349.00,
        currency: 'INR',
        imageUrl: '/products/eye_cream.jpg',
        ingredients: ['Coffee', 'Vitamin E']
    }
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, demoProducts_1, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Seeding demo products...');
                    // Clear existing products to prevent duplicates on rerun
                    return [4 /*yield*/, prisma.product.deleteMany()];
                case 1:
                    // Clear existing products to prevent duplicates on rerun
                    _a.sent();
                    _i = 0, demoProducts_1 = demoProducts;
                    _a.label = 2;
                case 2:
                    if (!(_i < demoProducts_1.length)) return [3 /*break*/, 5];
                    product = demoProducts_1[_i];
                    return [4 /*yield*/, prisma.product.create({ data: product })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log('Seeding complete.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
