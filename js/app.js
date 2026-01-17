/**
 * Lolo Blends - Main Application Script
 * E-commerce landing page for Moroccan hair care products
 */

(function () {
  'use strict';

  // ============================================
  // UTILITIES
  // ============================================

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ============================================
  // CONFIGURATION
  // ============================================

  const CONFIG = {
    whatsappNumber: '212660928077',
    businessEmail: 'intissarbani8@gmail.com',
    web3formsKey: 'd2d6a608-1dfc-4e9b-8852-962cb1dc8a20',
    // EmailJS config for customer confirmation emails (free: 200 emails/month)
    // Sign up at https://www.emailjs.com/ and create a service + template
    emailjsServiceId: 'service_1uroc3y',
    emailjsTemplateId: 'template_xcatgtn',
    emailjsPublicKey: '9naipsLKZSGRq91PY',
    dailyStockB3: 7,
    stockKeyB3: 'lolo_stock_b3',
    stockDateKeyB3: 'lolo_stock_b3_date',
    slideInterval: 5000
  };

  // ============================================
  // TRANSLATIONS (i18n)
  // ============================================

  const i18n = {
    ar: {
      brand: 'خلطات لولو',
      menu: 'القائمة',
      nav_products: '🎁 العروض',
      nav_benefits: '✨ الفوائد',
      nav_how: '📖 الطريقة',
      nav_faq: '❓ الأسئلة',
      nav_contact: '📞 تواصل',
      hero_badge: 'صُنع في المغرب بمكونات طبيعية 100%',
      hero_title: 'زيت الباروكة — وقفي التساقط وملي الفراغات في 3 أسابيع 🌿',
      hero_sub: 'تركيبة مغربية 100% طبيعية • نتائج من 3 أسابيع • دفع عند الاستلام',
      whatsapp: '📲 اطلبي عبر واتساب (مجاناً)',
      form_cta: 'أو املئي النموذج السريع ↓',
      social_proof_micro: '⭐ 4.8/5 من +1,200 زبونة راضية في المغرب',
      usp_worldwide: 'شحن عالمي',
      usp_worldwide_sub: 'نوصل لجميع دول العالم',
      usp_cod: 'الدفع عند الاستلام',
      usp_cod_sub: 'للمغرب + دفع آمن للعالم',
      usp_local: 'صُنع في المغرب',
      usp_local_sub: 'جودة مضمونة ومكونات طبيعية',
      usp_guarantee: 'ضمان 14 يوم',
      usp_guarantee_sub: 'استرجاع المال بدون أسئلة',
      currency: 'د.م',
      benefits_title: 'علاش تختاري خلطات لولو؟',
      b1_title: 'زيت الباروكة',
      b1_desc: 'يقوي البصيلات ويوقف التساقط ويحفز نمو الخُلفة من الجذور',
      b2_title: 'خلاصة 7 أعشاب',
      b2_desc: 'ترطيب عميق ولمعان طبيعي وحماية من التقصف بدون إثقال',
      b3_title: 'كثافة وطول',
      b3_desc: 'ملء الفراغات وطول ملحوظ مع الاستعمال المنتظم جوج مرات فالأسبوع',
      results_title: 'نتائج مجرّبة من زبوناتنا',
      results_intro: 'بفضل تركيبة زيت الباروكة وخلاصة الأعشاب، عدد كبير من الزبونات لاحظو فرق واضح في التساقط والفراغات واللمعان من الأسابيع الأولى',
      results_p1: 'انخفاض ملحوظ في التساقط بنسبة 40% وتقوية الجذور*',
      results_p2: 'تحفيز نمو الخُلفة وملء الفراغات بشكل طبيعي',
      results_p3: 'ترطيب عميق ولمعان طبيعي بدون إثقال الشعر',
      results_p4: 'تحسن الكثافة والطول مع الاستعمال جوج مرات فالأسبوع',
      results_note: '*حسب تجارب 200+ زبونة. النتائج قد تختلف حسب طبيعة الشعر وروتين العناية',
      stat1: 'انخفاض التساقط',
      stat2: 'أسابيع للنتائج',
      stat3: 'زبونة راضية',
      stat4: 'زيادة اللمعان',
      ingredients_title: 'مكونات طبيعية 100%',
      ingredients_sub: 'تركيبة مغربية أصيلة بخلاصة أعشاب وزيوت طبيعية مستخلصة بعناية',
      ing1_title: 'زيت الأرغان',
      ing1_desc: 'غني بفيتامين E وأوميغا 6 و 9',
      ing2_title: 'زيت الباروكة',
      ing2_desc: 'يحفز نمو الشعر ويقوي الجذور',
      ing3_title: 'خلاصة البرتقال',
      ing3_desc: 'فيتامين C للنضارة والإشراق',
      ing4_title: 'زبدة الشيا',
      ing4_desc: 'ترطيب عميق وحماية طبيعية',
      cert_natural: 'طبيعي 100%',
      cert_cruelty: 'بدون تجارب على الحيوانات',
      cert_moroccan: 'صنع مغربي',
      cert_tested: 'مختبر ومعتمد',
      faq_title: 'الأسئلة الشائعة',
      faq_sub: 'كل ما تحتاجين معرفته عن منتجاتنا',
      bundles_title: 'العروض',
      bndl1: 'زيت الباروكة',
      bndl1_desc: 'للشعر • تقوية وتكثيف',
      bndl2: 'سكراب',
      bndl2_desc: 'للجسم • تقشير طبيعي',
      bndl3: 'كريم القدمين توريد',
      bndl3_desc: 'للقدمين • نعومة وتوريد',
      bndl4: 'مسك للجسم',
      bndl4_desc: 'للجسم • عطر فاخر يدوم',
      bndl5: 'كريم للجسم',
      bndl5_desc: 'للجسم • ترطيب عميق',
      bndl6: 'صابونة البرتقال',
      bndl6_desc: 'للبشرة • تنظيف وتفتيح',
      bndl7: 'صابونة البرتقال (صغيرة)',
      bndl7_desc: 'للبشرة • حجم السفر',
      badge_popular: '🔥 الأكثر مبيعاً',
      badge_best_value: '💎 أفضل قيمة',
      save_text: 'وفري 97 د.م!',
      add_to_cart: '🛒 أضف للسلة',
      normal_order: 'طلب عادي',
      order_whatsapp: 'واتساب',
      flash_title: 'عرض اليوم: تخفيض محدود على باكات زيت الباروكة',
      flash_label: 'العرض كيسالي فـ',
      seasonal_title: '🎁 عرض رمضان: هدية مجانية مع أي طلب فوق 299 د.م',
      seasonal_sub: 'مثالي لتحضير شعرك لرمضان، الأعياد و العودة للمدارس.',
      guarantee_title: '✅ ضمان استرجاع المال 14 يوم',
      guarantee_desc: 'إذا ما عجبكش المنتج لأي سبب، نرجعو ليك فلوسك كاملة بدون أسئلة',
      how_title: 'طريقة الاستعمال',
      how_step1_title: '1. التطبيق',
      how_1: 'ديري الزيت من الجذور للأطراف مع مساج دائري خفيف لمدة 2-3 دقائق',
      how_step2_title: '2. الانتظار',
      how_2: 'خليه ساعتين على الأقل أو طول الليل للنتائج الأفضل',
      how_step3_title: '3. التكرار',
      how_3: 'استعمليه جوج مرات فالأسبوع وشاهدي الفرق خلال 3 أسابيع',
      social_proof: 'زبائننا الراضون',
      testimonial_sub: 'آراء حقيقية من زبونات جربو منتجاتنا وشافو الفرق',
      testimonial1_body: '"حيت جربتو، لاحظت الفرق في التساقط من أول أسبوعين. شعري ولا كثيف وفيه لمعة طبيعية. شكراً خلطات لولو!"',
      testimonial1_author: 'سارة م.',
      testimonial2_body: '"السكراب ديال البرتقال خلا بشرتي ناعمة بزاف! الريحة زوينة والنتيجة من أول استعمال. غادي نعاود نشري بالتأكيد."',
      testimonial2_author: 'فاطمة ز.',
      testimonial3_body: '"كريم القدمين حل ليا مشكل كنت كنعاني منها بزاف. رجليا ولاو ناعمين وبلا تشققات. منتج رائع!"',
      testimonial3_author: 'نادية ب.',
      insta_follow: 'تابعينا على انستغرام',
      insta_btn: 'متابعة',
      testimonial_body: '"حيت جربتو، لاحظت الفرق في التساقط من أول أسبوعين. شعري ولا كثيف وفيه لمعة طبيعية. شكراً خلطات لولو!"',
      testimonial_author: '— س.م، مراكش',
      cta_title: 'اطلبي الآن',
      cta_sub: 'املئي النموذج وسنتصل بك خلال ساعة للتأكيد',
      review_title: '📦 مراجعة الطلب',
      total: 'الإجمالي',
      cart_title: 'سلة المشتريات',
      confirm_order: '✅ تأكيد الطلب (COD)',
      footer_about: 'زيت طبيعي لتكثيف وإطالة الشعر بخلاصة زيت الباروكة والأعشاب',
      shipping: 'سياسة الشحن',
      privacy: 'سياسة الخصوصية',
      rights: 'جميع الحقوق محفوظة',
      required_error: '❌ يرجى ملء جميع الحقول المطلوبة',
      phone_error: '❌ رقم الهاتف غير صحيح — مثال: 0612345678',
      sending: '⏳ جاري التأكيد...',
      order_received: '✅ شكراً! تم استلام طلبك. سنتصل بك خلال ساعة للتأكيد 📞',
    },
    fr: {
      brand: 'Lolo Blends',
      menu: 'Menu',
      nav_products: '🎁 Offres',
      nav_benefits: '✨ Avantages',
      nav_how: '📖 Utilisation',
      nav_faq: '❓ FAQ',
      nav_contact: '📞 Contact',
      hero_badge: 'Fabriqué au Maroc avec 100% ingrédients naturels',
      hero_title: 'Huile Barouka — Stoppez la Chute et Densifiez en 3 Semaines 🌿',
      hero_sub: 'Formule 100% naturelle marocaine • Résultats dès 3 semaines • Paiement à la livraison',
      whatsapp: '📲 Commander sur WhatsApp (gratuit)',
      form_cta: 'Ou remplir le formulaire rapide ↓',
      social_proof_micro: '⭐ 4.8/5 de +1,200 clientes satisfaites au Maroc',
      usp_worldwide: 'Livraison mondiale',
      usp_worldwide_sub: 'Nous livrons partout dans le monde',
      usp_cod: 'Paiement à la livraison',
      usp_cod_sub: 'Maroc + paiement sécurisé mondial',
      usp_local: 'Made in Morocco',
      usp_local_sub: 'Qualité garantie et ingrédients naturels',
      usp_guarantee: 'Garantie 14 jours',
      usp_guarantee_sub: 'Remboursement sans questions',
      currency: 'MAD',
      benefits_title: 'Pourquoi Lolo Blends?',
      b1_title: 'Huile Barouka',
      b1_desc: 'Fortifie les racines, stoppe la chute et stimule la repousse',
      b2_title: 'Extrait de 7 plantes',
      b2_desc: 'Hydratation profonde et brillance naturelle sans alourdir',
      b3_title: 'Densité et longueur',
      b3_desc: 'Comble les zones clairsemées avec usage régulier 2x/semaine',
      results_title: 'Résultats prouvés',
      results_intro: 'Grâce à l\'huile Barouka et aux extraits de plantes, nos clientes constatent moins de chute et plus d\'éclat dès les premières semaines',
      results_p1: 'Chute réduite de 40% et racines fortifiées*',
      results_p2: 'Stimule la repousse et comble les zones clairsemées',
      results_p3: 'Hydratation profonde sans alourdir',
      results_p4: 'Amélioration de la densité avec usage 2x/semaine',
      results_note: '*Selon 200+ avis clientes. Résultats variables selon le type de cheveux',
      stat1: 'Réduction de chute',
      stat2: 'Semaines pour résultats',
      stat3: 'Clientes satisfaites',
      stat4: 'Augmentation de brillance',
      ingredients_title: 'Ingrédients 100% naturels',
      ingredients_sub: 'Formule marocaine authentique à base d\'huiles et extraits naturels',
      ing1_title: 'Huile d\'Argan',
      ing1_desc: 'Riche en vitamine E et oméga 6 & 9',
      ing2_title: 'Huile Barouka',
      ing2_desc: 'Stimule la croissance et fortifie les racines',
      ing3_title: 'Extrait d\'Orange',
      ing3_desc: 'Vitamine C pour éclat et fraîcheur',
      ing4_title: 'Beurre de Karité',
      ing4_desc: 'Hydratation intense et protection naturelle',
      cert_natural: '100% Naturel',
      cert_cruelty: 'Non testé sur animaux',
      cert_moroccan: 'Fabriqué au Maroc',
      cert_tested: 'Testé et approuvé',
      faq_title: 'Questions fréquentes',
      faq_sub: 'Tout ce que vous devez savoir sur nos produits',
      bundles_title: 'Offres',
      bndl1: 'Huile Barouka',
      bndl1_desc: 'Pour cheveux • Fortifiant',
      bndl2: 'Gommage Corps',
      bndl2_desc: 'Pour corps • Exfoliation naturelle',
      bndl3: 'Crème Pieds Rosée',
      bndl3_desc: 'Pour pieds • Douceur et éclat',
      bndl4: 'Musc Corps',
      bndl4_desc: 'Pour corps • Parfum luxueux',
      bndl5: 'Crème Corps',
      bndl5_desc: 'Pour corps • Hydratation intense',
      bndl6: 'Savon Orange',
      bndl6_desc: 'Pour peau • Nettoyage et éclat',
      bndl7: 'Savon Orange (Mini)',
      bndl7_desc: 'Pour peau • Format voyage',
      badge_popular: '🔥 Best-seller',
      badge_best_value: '💎 Meilleur rapport',
      save_text: 'Économisez 97 MAD!',
      add_to_cart: '🛒 Ajouter',
      normal_order: 'Commander',
      order_whatsapp: 'WhatsApp',
      flash_title: 'Offre du jour: réduction limitée sur les packs Barouka',
      flash_label: 'Se termine dans',
      seasonal_title: '🎁 Offre Ramadan: cadeau offert dès 299 MAD d\'achat',
      seasonal_sub: 'Parfait pour préparer vos cheveux pour le Ramadan, les fêtes et la rentrée.',
      guarantee_title: '✅ Garantie satisfait ou remboursé 14 jours',
      guarantee_desc: 'Si vous n\'êtes pas satisfaite, nous vous remboursons sans questions',
      how_title: 'Mode d\'emploi',
      how_step1_title: '1. Application',
      how_1: 'Appliquer des racines aux pointes avec massage léger (2-3 min)',
      how_step2_title: '2. Pause',
      how_2: 'Laisser agir au moins 2h ou toute la nuit pour plus d\'effet',
      how_step3_title: '3. Répétition',
      how_3: 'Utiliser 2x/semaine et voir la différence sous 3 semaines',
      social_proof: 'Clientes satisfaites',
      testimonial_sub: 'Avis réels de clientes qui ont testé nos produits',
      testimonial1_body: '"Dès les 2 premières semaines, j\'ai remarqué moins de chute. Mes cheveux sont plus denses et brillants naturellement. Merci Lolo Blends!"',
      testimonial1_author: 'Sarah M.',
      testimonial2_body: '"Le gommage à l\'orange a rendu ma peau si douce! L\'odeur est divine et les résultats dès la première utilisation. Je vais certainement racheter."',
      testimonial2_author: 'Fatima Z.',
      testimonial3_body: '"La crème pour pieds a résolu un problème que j\'avais depuis longtemps. Mes pieds sont maintenant doux et sans fissures. Produit excellent!"',
      testimonial3_author: 'Nadia B.',
      insta_follow: 'Suivez-nous sur Instagram',
      insta_btn: 'Suivre',
      testimonial_body: '"Dès les 2 premières semaines, j\'ai remarqué moins de chute. Mes cheveux sont plus denses et brillants naturellement. Merci Lolo Blends!"',
      testimonial_author: '— S.M., Marrakech',
      cta_title: 'Commander maintenant',
      cta_sub: 'Remplissez le formulaire et nous vous contactons sous 1h',
      review_title: '📦 Récapitulatif',
      total: 'Total',
      cart_title: 'Panier',
      confirm_order: '✅ Confirmer (COD)',
      footer_about: 'Huile naturelle pour densité et longueur avec huile Barouka et plantes',
      shipping: 'Livraison',
      privacy: 'Confidentialité',
      rights: 'Tous droits réservés',
      required_error: '❌ Veuillez remplir tous les champs requis',
      phone_error: '❌ Numéro invalide — ex: 0612345678',
      sending: '⏳ Envoi en cours...',
      order_received: '✅ Merci! Commande reçue. Nous vous contacterons sous 1h 📞',
    }
  };

  // ============================================
  // STATE
  // ============================================

  let currentLang = localStorage.getItem('lang') || 'ar';
  let pendingBundle = null;
  let stockB3 = initStockB3();

  // Bundle data
  const bundles = {
    b1: { id: 'b1', name_ar: 'زيت الباروكة', name_fr: 'Huile Barouka', price: 190 },
    b2: { id: 'b2', name_ar: 'سكراب', name_fr: 'Gommage Corps', price: 99 },
    b3: { id: 'b3', name_ar: 'كريم القدمين توريد', name_fr: 'Crème Pieds Rosée', price: 80 },
    b4: { id: 'b4', name_ar: 'مسك للجسم', name_fr: 'Musc Corps', price: 150 },
    b5: { id: 'b5', name_ar: 'كريم للجسم', name_fr: 'Crème Corps', price: 150 },
    b6: { id: 'b6', name_ar: 'صابونة البرتقال', name_fr: 'Savon Orange', price: 200 },
    b7: { id: 'b7', name_ar: 'صابونة البرتقال (صغيرة)', name_fr: 'Savon Orange (Mini)', price: 100 }
  };

  // Cart state
  const cart = {
    items: {},
    add(id) {
      const b = bundles[id];
      if (!b) return;
      this.items[id] = this.items[id] || { ...b, qty: 0 };
      this.items[id].qty++;
      if (id === 'b3' && stockB3 > 0) {
        stockB3 = Math.max(0, stockB3 - 1);
        saveStockB3();
        renderStockB3();
      }
      renderCart();
      announce(`تمت إضافة ${b.name_ar} للسلة`);
    },
    remove(id) {
      delete this.items[id];
      renderCart();
      announce('تم حذف المنتج من السلة');
    },
    count() {
      return Object.values(this.items).reduce((a, b) => a + b.qty, 0);
    },
    total() {
      return Object.values(this.items).reduce((a, b) => a + b.qty * b.price, 0);
    }
  };

  // ============================================
  // STOCK MANAGEMENT
  // ============================================

  function initStockB3() {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const savedDate = localStorage.getItem(CONFIG.stockDateKeyB3);
      if (savedDate !== today) {
        localStorage.setItem(CONFIG.stockDateKeyB3, today);
        localStorage.setItem(CONFIG.stockKeyB3, String(CONFIG.dailyStockB3));
        return CONFIG.dailyStockB3;
      }
      const raw = localStorage.getItem(CONFIG.stockKeyB3);
      const parsed = raw != null ? parseInt(raw, 10) : NaN;
      if (Number.isFinite(parsed) && parsed >= 0) return parsed;
      return CONFIG.dailyStockB3;
    } catch {
      return CONFIG.dailyStockB3;
    }
  }

  function saveStockB3() {
    try {
      localStorage.setItem(CONFIG.stockKeyB3, String(stockB3));
    } catch {
      // ignore
    }
  }

  function renderStockB3() {
    const el = $('#stockB3');
    if (!el) return;

    if (stockB3 <= 0) {
      el.textContent = currentLang === 'ar'
        ? 'قرب يسلّا الباك ديال 3 قنينات اليوم، تواصلي معنا للتأكيد.'
        : 'Le pack 3 flacons est presque épuisé pour aujourd\'hui.';
      return;
    }

    if (currentLang === 'ar') {
      el.textContent = `غير ${stockB3} باك باقيين بهذا الثمن اليوم!`;
    } else {
      el.textContent = `Il ne reste plus que ${stockB3} packs à ce prix aujourd'hui !`;
    }
  }

  // ============================================
  // FORMATTING HELPERS
  // ============================================

  function formatMAD(value) {
    try {
      return new Intl.NumberFormat(currentLang === 'ar' ? 'ar-MA' : 'fr-MA', {
        style: 'currency',
        currency: 'MAD'
      }).format(value);
    } catch (e) {
      return (currentLang === 'ar' ? `${value} د.م` : `${value} MAD`);
    }
  }

  function currentItems() {
    const items = Object.values(cart.items);
    if (items.length === 0 && pendingBundle) {
      const b = bundles[pendingBundle];
      if (b) return [{ ...b, qty: 1 }];
    }
    return items;
  }

  // ============================================
  // UI HELPERS
  // ============================================

  function updateOverlayVisibility(sidebar, miniCart, overlay) {
    if (!overlay) return;
    const navOpen = sidebar && !sidebar.classList.contains('translate-x-full');
    const cartOpen = miniCart && !miniCart.classList.contains('-translate-x-full');

    if (navOpen || cartOpen) {
      overlay.classList.remove('opacity-0', 'pointer-events-none');
      overlay.classList.add('opacity-100');
      document.body.style.overflow = 'hidden';
    } else {
      overlay.classList.add('opacity-0', 'pointer-events-none');
      overlay.classList.remove('opacity-100');
      document.body.style.overflow = '';
    }
  }

  function announce(message) {
    const liveRegion = $('#liveRegion');
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 3000);
    }
  }

  // ============================================
  // i18n
  // ============================================

  function applyI18n(lang) {
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key]) {
        el.textContent = i18n[lang][key];
      }
    });

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $('#langToggle').textContent = lang === 'ar' ? 'AR' : 'FR';
    $('#langToggle').setAttribute('aria-label', lang === 'ar' ? 'تبديل اللغة إلى الفرنسية' : 'Switch to Arabic');
    localStorage.setItem('lang', lang);
    renderStockB3();
  }

  // ============================================
  // CART RENDERING
  // ============================================

  function renderCart() {
    const wrap = $('#cartItems');
    if (!wrap) return;

    wrap.innerHTML = '';
    const items = Object.values(cart.items);

    if (items.length === 0) {
      wrap.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 py-8">${currentLang === 'ar' ? 'السلة فارغة 🛍️' : 'Panier vide 🛍️'}</p>`;
    } else {
      items.forEach(it => {
        const row = document.createElement('div');
        row.className = 'flex items-center justify-between gap-3 border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800';
        const title = (currentLang === 'ar' ? it.name_ar : it.name_fr);
        row.innerHTML = `
          <div class="flex-1">
            <div class="font-semibold text-sm">${title}</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">×${it.qty}</div>
          </div>
          <div class="font-bold text-primary-600 dark:text-primary-400">${formatMAD(it.qty * it.price)}</div>
          <button class="h-9 w-9 grid place-items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500" aria-label="حذف ${title}">
            <span class="material-symbols-outlined text-[20px]">delete</span>
          </button>
        `;
        row.querySelector('button').addEventListener('click', () => cart.remove(it.id));
        wrap.appendChild(row);
      });
    }

    // Update cart count badge
    const count = cart.count();
    const badge = $('#cartCount');
    if (badge) {
      if (count > 0) {
        badge.textContent = count;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }

    // Update cart total
    const totalEl = $('#cartTotal');
    if (totalEl) totalEl.textContent = formatMAD(cart.total());

    // Update order summary
    renderOrderSummary();
  }

  function renderOrderSummary() {
    const box = $('#orderSummary');
    const list = $('#orderSummaryList');
    const totalEl = $('#orderSummaryTotal');

    if (!box || !list || !totalEl) return;

    const items = currentItems();

    if (items.length === 0) {
      box.classList.add('hidden');
      return;
    }

    box.classList.remove('hidden');
    let total = 0;

    list.innerHTML = items.map(it => {
      total += it.qty * it.price;
      const title = (currentLang === 'ar' ? it.name_ar : it.name_fr);
      return `<li class="flex items-center justify-between"><span>${title} ×${it.qty}</span><span class="font-semibold">${formatMAD(it.qty * it.price)}</span></li>`;
    }).join('');

    totalEl.textContent = formatMAD(total);
  }

  // ============================================
  // WHATSAPP
  // ============================================

  function openWhatsApp(message) {
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    // Mark that user has contacted via WhatsApp
    localStorage.setItem('lolo_wa_contacted', 'true');
  }

  // WhatsApp message templates
  const waTemplates = {
    ar: {
      greeting: `السلام عليكم 👋
أنا مهتمة بمنتجات خلطات لولو 🌿
بغيت نعرف أكثر على المنتجات والأسعار.`,

      orderHeader: `🛒 *طلب جديد من الموقع*
━━━━━━━━━━━━━━━━`,

      orderFooter: `━━━━━━━━━━━━━━━━
📍 *معلومات التوصيل:*
الاسم:
المدينة:
العنوان:
📱 الهاتف:

💳 الدفع عند الاستلام ✅
🚚 التوصيل: 2-4 أيام`,

      productInquiry: (productName) => `السلام عليكم 👋
بغيت نسول على *${productName}* 🌿
شنو الثمن ومدة التوصيل؟`
    },
    fr: {
      greeting: `Bonjour 👋
Je suis intéressée par les produits Lolo Blends 🌿
Je voudrais en savoir plus sur les produits et les prix.`,

      orderHeader: `🛒 *Nouvelle commande du site*
━━━━━━━━━━━━━━━━`,

      orderFooter: `━━━━━━━━━━━━━━━━
📍 *Informations de livraison:*
Nom:
Ville:
Adresse:
📱 Téléphone:

💳 Paiement à la livraison ✅
🚚 Livraison: 2-4 jours`,

      productInquiry: (productName) => `Bonjour 👋
Je voudrais me renseigner sur *${productName}* 🌿
Quel est le prix et le délai de livraison?`
    }
  };

  function buildCartMessage() {
    const items = currentItems();
    const tpl = waTemplates[currentLang];

    // If no items, send greeting message
    if (!items.length) {
      return tpl.greeting;
    }

    // Build order message with template
    const lines = items.map(it => {
      const t = (currentLang === 'ar' ? it.name_ar : it.name_fr);
      return `▪️ ${t} ×${it.qty} = ${formatMAD(it.qty * it.price)}`;
    }).join('\n');

    const total = items.reduce((a, b) => a + b.qty * b.price, 0);
    const totalLabel = currentLang === 'ar' ? '💰 *المجموع*' : '💰 *Total*';

    return `${tpl.orderHeader}

${lines}

${totalLabel}: ${formatMAD(total)}

${tpl.orderFooter}`;
  }

  // ============================================
  // EMAIL FORMATTING
  // ============================================

  function buildOrderPayload(name, phone, city, addr) {
    const items = currentItems();
    const total = items.reduce((a, b) => a + b.qty * b.price, 0);
    const lang = currentLang;
    const subject = lang === 'ar' ? `طلب جديد - ${name}` : `Nouvelle commande - ${name}`;

    const lines = items.map(it => {
      const t = (lang === 'ar' ? it.name_ar : it.name_fr);
      return `${t} ×${it.qty} = ${formatMAD(it.qty * it.price)}`;
    });

    const itemsDetailed = items.map(it => ({
      id: it.id,
      name: (lang === 'ar' ? it.name_ar : it.name_fr),
      qty: it.qty,
      price: it.price
    }));

    return {
      subject,
      language: lang,
      customer: {
        name,
        phone,
        email: ($('#email')?.value || '').trim(),
        city: city || '',
        address: addr || ''
      },
      items: lines.length ? lines : ['Aucun article'],
      itemsDetailed: itemsDetailed,
      total: formatMAD(total),
      totalRaw: total
    };
  }

  function formatAdminEmailPlain(payload) {
    const isAr = payload.language === 'ar';
    const lines = payload.items.map((l, i) => `${i + 1}. ${l}`).join('\n');
    const date = new Date().toLocaleString(isAr ? 'ar-MA' : 'fr-MA');

    if (isAr) {
      return [
        '🔔 طلب جديد - خلطات لولو',
        '',
        '👤 معلومات الزبون:',
        `الاسم: ${payload.customer.name}`,
        `📱 الهاتف: ${payload.customer.phone}`,
        `📧 البريد: ${payload.customer.email || '-'}`,
        `📍 المدينة: ${payload.customer.city || '-'}`,
        `🏠 العنوان: ${payload.customer.address || '-'}`,
        '',
        '🛍️ تفاصيل الطلب:',
        lines,
        '',
        `💰 المجموع الكلي: ${payload.total}`,
        '',
        `📅 التاريخ: ${date}`,
        '',
        '⚠️ إجراء مطلوب: يرجى الاتصال بالزبون لتأكيد الطلب والعنوان في أقرب وقت ممكن.',
      ].join('\n');
    } else {
      return [
        '🔔 Nouvelle commande - Lolo Blends',
        '',
        '👤 Informations client:',
        `Nom: ${payload.customer.name}`,
        `📱 Téléphone: ${payload.customer.phone}`,
        `📧 Email: ${payload.customer.email || '-'}`,
        `📍 Ville: ${payload.customer.city || '-'}`,
        `🏠 Adresse: ${payload.customer.address || '-'}`,
        '',
        '🛍️ Détails de la commande:',
        lines,
        '',
        `💰 Total: ${payload.total}`,
        '',
        `📅 Date: ${date}`,
        '',
        '⚠️ Action requise: Veuillez contacter le client pour confirmer la commande et l\'adresse dès que possible.',
      ].join('\n');
    }
  }

  function formatCustomerEmailPlain(payload) {
    const isAr = payload.language === 'ar';
    const c = payload.customer;
    const lines = payload.items.map((l, i) => `${i + 1}. ${l}`).join('\n');
    const date = new Date().toLocaleString(isAr ? 'ar-MA' : 'fr-MA');

    if (isAr) {
      return [
        `السلام عليكم ${c.name}`,
        '',
        'شكراً على طلبك من خلطات لولو 💚',
        '',
        '📦 ملخص الطلب:',
        lines,
        '',
        `💰 المجموع: ${payload.total}`,
        '',
        '📍 عنوان التوصيل:',
        `المدينة: ${c.city || '-'}`,
        `العنوان: ${c.address || '-'}`,
        '',
        '📋 الخطوات التالية:',
        '✅ سنتصل بك خلال 24 ساعة لتأكيد الطلب',
        '💳 الدفع عند الاستلام (COD)',
        '🚚 التوصيل خلال 2-4 أيام عمل',
        '',
        `📅 تاريخ الطلب: ${date}`,
        '',
        'لأي استفسار، تواصل معنا:',
        `📱 واتساب: \u200E+212 660 928 077`,
        `📧 البريد: ${CONFIG.businessEmail}`,
        '',
        'شكراً لثقتك في خلطات لولو! 🌿',
      ].join('\n');
    } else {
      return [
        `Bonjour ${c.name}`,
        '',
        'Merci pour votre commande Lolo Blends 💚',
        '',
        '📦 Résumé de la commande:',
        lines,
        '',
        `💰 Total: ${payload.total}`,
        '',
        '📍 Adresse de livraison:',
        `Ville: ${c.city || '-'}`,
        `Adresse: ${c.address || '-'}`,
        '',
        '📋 Prochaines étapes:',
        '✅ Nous vous contacterons sous 24h pour confirmer',
        '💳 Paiement à la livraison (COD)',
        '🚚 Livraison sous 2-4 jours ouvrés',
        '',
        `📅 Date: ${date}`,
        '',
        'Pour toute question, contactez-nous:',
        `📱 WhatsApp: +${CONFIG.whatsappNumber}`,
        `📧 Email: ${CONFIG.businessEmail}`,
        '',
        'Merci de votre confiance! 🌿',
      ].join('\n');
    }
  }

  // ============================================
  // EMAIL SENDING
  // ============================================

  async function sendOrderEmails(payload) {
    // 1. Send order notification to admin via Web3Forms
    const adminFD = new FormData();
    adminFD.append('access_key', CONFIG.web3formsKey);
    adminFD.append('subject', payload.subject);
    adminFD.append('from_name', payload.customer.name || 'Lolo Blends Customer');
    adminFD.append('email', payload.customer.email || 'no-reply@loloblends.com');
    adminFD.append('message', formatAdminEmailPlain(payload));

    // Additional fields for admin reference
    adminFD.append('Customer Name', payload.customer.name);
    adminFD.append('Customer Phone', payload.customer.phone);
    adminFD.append('Customer City', payload.customer.city || '-');
    adminFD.append('Order Total', payload.total);

    const adminResp = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: adminFD
    });

    if (!adminResp.ok) throw new Error('Admin email failed');

    // 2. Send confirmation email to customer via EmailJS (if configured and email provided)
    if (payload.customer.email && CONFIG.emailjsServiceId && CONFIG.emailjsTemplateId && CONFIG.emailjsPublicKey) {
      try {
        // Load EmailJS SDK if not already loaded
        if (typeof emailjs === 'undefined') {
          await loadEmailJS();
        }

        // Send customer confirmation email
        await emailjs.send(
          CONFIG.emailjsServiceId,
          CONFIG.emailjsTemplateId,
          {
            to_email: payload.customer.email,
            to_name: payload.customer.name,
            subject: payload.language === 'ar'
              ? 'تأكيد طلبك من خلطات لولو 💚'
              : 'Confirmation de commande Lolo Blends 💚',
            message: formatCustomerEmailPlain(payload),
            order_total: payload.total,
            order_items: payload.items.join('\n'),
            customer_city: payload.customer.city || '-',
            customer_address: payload.customer.address || '-',
            reply_to: CONFIG.businessEmail
          },
          CONFIG.emailjsPublicKey
        );
        console.log('Customer confirmation email sent successfully');
      } catch (e) {
        console.warn('Customer confirmation email failed:', e);
        // Don't throw - admin notification is the critical path
      }
    }

    return true;
  }

  // Helper to load EmailJS SDK dynamically
  function loadEmailJS() {
    return new Promise((resolve, reject) => {
      if (typeof emailjs !== 'undefined') {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.onload = () => {
        emailjs.init(CONFIG.emailjsPublicKey);
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // ============================================
  // FORM VALIDATION
  // ============================================

  function markInvalid(el, message) {
    el.classList.add('border-red-500');
    el.setAttribute('aria-invalid', 'true');
    const errorEl = $(`#${el.id}-error`);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('is-visible');
    }
  }

  function clearInvalid(el) {
    el.classList.remove('border-red-500');
    el.setAttribute('aria-invalid', 'false');
    const errorEl = $(`#${el.id}-error`);
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('is-visible');
    }
  }

  function validPhone(v) {
    return /^(?:\+?212|0)(?:6|7)\d{8}$/.test(v.trim());
  }

  // ============================================
  // ANALYTICS
  // ============================================

  function trackEvent(eventName, properties = {}) {
    // Log to console in development
    if (window.location.hostname === 'localhost') {
      console.log('📊 Event:', eventName, properties);
    }

    // Send to GA4 if available
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, properties);
    }

    // Send to Segment if available
    if (typeof analytics !== 'undefined') {
      analytics.track(eventName, properties);
    }
  }

  // ============================================
  // WHATSAPP AUTO-POPUP FOR FIRST-TIME VISITORS
  // ============================================

  function initWhatsAppPopup() {
    // Check if user has already interacted with WhatsApp or dismissed popup
    const hasContacted = localStorage.getItem('lolo_wa_contacted');
    const hasDismissed = localStorage.getItem('lolo_wa_popup_dismissed');

    if (hasContacted || hasDismissed) return;

    // Show popup after 15 seconds for first-time visitors
    setTimeout(() => {
      showWhatsAppPopup();
    }, 15000);
  }

  function showWhatsAppPopup() {
    // Don't show if already dismissed or contacted
    if (localStorage.getItem('lolo_wa_contacted') || localStorage.getItem('lolo_wa_popup_dismissed')) {
      return;
    }

    // Create popup element
    const popup = document.createElement('div');
    popup.id = 'waPopup';
    popup.className = 'fixed bottom-24 z-50 animate-slide-up';
    popup.style.cssText = currentLang === 'ar'
      ? 'left: 1rem; right: auto;'
      : 'right: 1rem; left: auto;';

    const isAr = currentLang === 'ar';

    popup.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-[320px] overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div class="flex-1">
            <div class="text-white font-semibold text-sm">${isAr ? 'خلطات لولو' : 'Lolo Blends'}</div>
            <div class="text-green-100 text-xs">${isAr ? 'متاحين للرد الآن' : 'En ligne maintenant'}</div>
          </div>
          <button id="waPopupClose" class="text-white/80 hover:text-white p-1" aria-label="${isAr ? 'إغلاق' : 'Fermer'}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Message -->
        <div class="p-4">
          <div class="bg-gray-100 dark:bg-gray-700 rounded-lg rounded-tl-none p-3 mb-3">
            <p class="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
              ${isAr
                ? 'مرحبا! 👋 كيفاش نقدر نعاونك اليوم؟ عندنا عروض خاصة على زيت الباروكة 🌿'
                : 'Bonjour! 👋 Comment puis-je vous aider? Nous avons des offres spéciales sur l\'huile Barouka 🌿'}
            </p>
          </div>

          <!-- Quick replies -->
          <div class="space-y-2 mb-3">
            <button class="wa-quick-reply w-full text-start px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-900/30 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors text-gray-700 dark:text-gray-300" data-msg="products">
              ${isAr ? '🛍️ بغيت نشوف المنتجات' : '🛍️ Voir les produits'}
            </button>
            <button class="wa-quick-reply w-full text-start px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-900/30 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors text-gray-700 dark:text-gray-300" data-msg="prices">
              ${isAr ? '💰 شنو الأثمنة؟' : '💰 Quels sont les prix?'}
            </button>
            <button class="wa-quick-reply w-full text-start px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-900/30 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors text-gray-700 dark:text-gray-300" data-msg="delivery">
              ${isAr ? '🚚 كيفاش التوصيل؟' : '🚚 Comment se fait la livraison?'}
            </button>
          </div>

          <!-- CTA Button -->
          <button id="waPopupChat" class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            ${isAr ? 'تواصلي معنا' : 'Discuter maintenant'}
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(popup);

    // Add animation styles if not already present
    if (!document.getElementById('waPopupStyles')) {
      const style = document.createElement('style');
      style.id = 'waPopupStyles';
      style.textContent = `
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }
        @keyframes slideDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(20px);
          }
        }
        .animate-slide-down {
          animation: slideDown 0.2s ease-in forwards;
        }
      `;
      document.head.appendChild(style);
    }

    // Close button handler
    popup.querySelector('#waPopupClose').addEventListener('click', () => {
      closeWhatsAppPopup(popup, true);
    });

    // Chat button handler
    popup.querySelector('#waPopupChat').addEventListener('click', () => {
      openWhatsApp(waTemplates[currentLang].greeting);
      closeWhatsAppPopup(popup, false);
    });

    // Quick reply handlers
    popup.querySelectorAll('.wa-quick-reply').forEach(btn => {
      btn.addEventListener('click', () => {
        const msgType = btn.getAttribute('data-msg');
        let message = '';

        if (currentLang === 'ar') {
          switch(msgType) {
            case 'products':
              message = 'السلام عليكم 👋\nبغيت نشوف المنتجات ديالكم 🛍️';
              break;
            case 'prices':
              message = 'السلام عليكم 👋\nبغيت نعرف الأثمنة ديال المنتجات 💰';
              break;
            case 'delivery':
              message = 'السلام عليكم 👋\nكيفاش كيوصل التوصيل؟ وشحال كياخذ من الوقت؟ 🚚';
              break;
          }
        } else {
          switch(msgType) {
            case 'products':
              message = 'Bonjour 👋\nJe voudrais voir vos produits 🛍️';
              break;
            case 'prices':
              message = 'Bonjour 👋\nJe voudrais connaître les prix des produits 💰';
              break;
            case 'delivery':
              message = 'Bonjour 👋\nComment se fait la livraison et combien de temps? 🚚';
              break;
          }
        }

        openWhatsApp(message);
        closeWhatsAppPopup(popup, false);
      });
    });

    // Auto-hide after 30 seconds if not interacted
    setTimeout(() => {
      if (document.getElementById('waPopup')) {
        closeWhatsAppPopup(popup, true);
      }
    }, 30000);
  }

  function closeWhatsAppPopup(popup, wasDismissed) {
    if (!popup) return;

    popup.classList.remove('animate-slide-up');
    popup.classList.add('animate-slide-down');

    setTimeout(() => {
      popup.remove();
    }, 200);

    if (wasDismissed) {
      localStorage.setItem('lolo_wa_popup_dismissed', 'true');
    }
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  function init() {
    const sidebar = $('#sidebar');
    const menuButton = $('#menuButton');
    const closeSidebar = $('#closeSidebar');
    const overlay = $('#overlay');
    const miniCart = $('#miniCart');

    // Language toggle
    $('#langToggle')?.addEventListener('click', () => {
      currentLang = currentLang === 'ar' ? 'fr' : 'ar';
      applyI18n(currentLang);
    });

    // Sidebar
    menuButton?.addEventListener('click', () => {
      if (miniCart && !miniCart.classList.contains('-translate-x-full')) {
        miniCart.classList.add('-translate-x-full');
      }
      sidebar?.classList.remove('translate-x-full');
      menuButton.setAttribute('aria-expanded', 'true');
      sidebar?.querySelector('a')?.focus();
      updateOverlayVisibility(sidebar, miniCart, overlay);
    });

    closeSidebar?.addEventListener('click', () => {
      sidebar?.classList.add('translate-x-full');
      menuButton?.setAttribute('aria-expanded', 'false');
      menuButton?.focus();
      updateOverlayVisibility(sidebar, miniCart, overlay);
    });

    $$('#sidebar a')?.forEach(a => {
      a.addEventListener('click', () => {
        sidebar?.classList.add('translate-x-full');
        menuButton?.setAttribute('aria-expanded', 'false');
        updateOverlayVisibility(sidebar, miniCart, overlay);
      });
    });

    // Escape key handler
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (sidebar && !sidebar.classList.contains('translate-x-full')) {
          sidebar.classList.add('translate-x-full');
          menuButton?.setAttribute('aria-expanded', 'false');
        }
        if (miniCart && !miniCart.classList.contains('-translate-x-full')) {
          miniCart.classList.add('-translate-x-full');
        }
        updateOverlayVisibility(sidebar, miniCart, overlay);
      }
    });

    // Mini-cart
    $('#cartButton')?.addEventListener('click', () => {
      miniCart?.classList.remove('-translate-x-full');
      if (sidebar && !sidebar.classList.contains('translate-x-full')) {
        sidebar.classList.add('translate-x-full');
        menuButton?.setAttribute('aria-expanded', 'false');
      }
      updateOverlayVisibility(sidebar, miniCart, overlay);
    });

    $('#closeCart')?.addEventListener('click', () => {
      miniCart?.classList.add('-translate-x-full');
      updateOverlayVisibility(sidebar, miniCart, overlay);
    });

    // Overlay click
    overlay?.addEventListener('click', () => {
      if (sidebar && !sidebar.classList.contains('translate-x-full')) {
        sidebar.classList.add('translate-x-full');
        menuButton?.setAttribute('aria-expanded', 'false');
      }
      if (miniCart && !miniCart.classList.contains('-translate-x-full')) {
        miniCart.classList.add('-translate-x-full');
      }
      updateOverlayVisibility(sidebar, miniCart, overlay);
    });

    // Hash change handler
    window.addEventListener('hashchange', () => {
      if (window.location.hash === '#contact') {
        if (sidebar && !sidebar.classList.contains('translate-x-full')) {
          sidebar.classList.add('translate-x-full');
          menuButton?.setAttribute('aria-expanded', 'false');
        }
        if (miniCart && !miniCart.classList.contains('-translate-x-full')) {
          miniCart.classList.add('-translate-x-full');
        }
        updateOverlayVisibility(sidebar, miniCart, overlay);
      }
    });

    // Flash sale countdown timer
    const flashTimerEl = $('#flashTimer');
    if (flashTimerEl) {
      function updateFlashTimer() {
        const now = new Date();
        const end = new Date();
        end.setHours(24, 0, 0, 0);
        const diff = end - now;
        if (diff <= 0) {
          flashTimerEl.textContent = '00:00:00';
          return;
        }
        const totalSeconds = Math.floor(diff / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        flashTimerEl.textContent = `${hours}:${minutes}:${seconds}`;
      }
      updateFlashTimer();
      setInterval(updateFlashTimer, 1000);
    }

    // Theme toggle
    function applyTheme(theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
      const icon = $('#themeToggle .material-symbols-outlined');
      if (icon) icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    }

    applyTheme(localStorage.getItem('theme') || 'light');

    $('#themeToggle')?.addEventListener('click', () => {
      const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(next);
    });

    // WhatsApp CTAs
    $('#whatsappCTA')?.addEventListener('click', () => {
      const msg = cart.count() > 0
        ? buildCartMessage()
        : waTemplates[currentLang].greeting;
      openWhatsApp(msg);
    });

    // Bundle WhatsApp buttons - use product-specific inquiry template
    $$('[data-wa]')?.forEach(btn => {
      btn.addEventListener('click', () => {
        const bundleId = 'b' + btn.getAttribute('data-wa');
        const bundle = bundles[bundleId];
        if (bundle) {
          const productName = currentLang === 'ar' ? bundle.name_ar : bundle.name_fr;
          const msg = waTemplates[currentLang].productInquiry(productName);
          openWhatsApp(msg);
        }
      });
    });

    // Normal order buttons
    $$('[data-normal]')?.forEach(btn => {
      btn.addEventListener('click', () => {
        const pack = btn.getAttribute('data-normal');
        pendingBundle = pack;
        renderOrderSummary();
        location.hash = '#contact';
        setTimeout(() => {
          $('#name')?.focus();
        }, 300);
      });
    });

    // Add to cart buttons
    $$('[data-add-bundle]')?.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-add-bundle');
        pendingBundle = null;
        cart.add(id);
        miniCart?.classList.remove('-translate-x-full');
        updateOverlayVisibility(sidebar, miniCart, overlay);
      });
    });

    // Cart WhatsApp order
    $('#waOrderBtnCart')?.addEventListener('click', () => {
      openWhatsApp(buildCartMessage());
      miniCart?.classList.add('-translate-x-full');
      updateOverlayVisibility(sidebar, miniCart, overlay);
    });

    // Close mini-cart when clicking "normal order" inside it
    $('#miniCart a[href="#contact"]')?.addEventListener('click', () => {
      miniCart?.classList.add('-translate-x-full');
      updateOverlayVisibility(sidebar, miniCart, overlay);
    });

    // Real-time phone validation
    const phoneInput = $('#phone');
    const phoneValidIcon = $('#phone-valid');

    phoneInput?.addEventListener('input', debounce(() => {
      const value = phoneInput.value.trim();
      if (value.length >= 10) {
        if (validPhone(value)) {
          phoneInput.classList.add('is-valid');
          phoneInput.classList.remove('border-red-500');
          phoneValidIcon?.classList.remove('hidden');
          clearInvalid(phoneInput);
        } else {
          phoneInput.classList.remove('is-valid');
          phoneValidIcon?.classList.add('hidden');
          markInvalid(phoneInput, i18n[currentLang].phone_error);
        }
      } else {
        phoneInput.classList.remove('is-valid');
        phoneValidIcon?.classList.add('hidden');
        clearInvalid(phoneInput);
      }
    }, 500));

    // Form submission
    const contactForm = $('#contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = $('#name');
        const phone = $('#phone');
        const city = $('#city');
        const addr = $('#address');

        // Clear previous errors
        [name, phone, city, addr].forEach(clearInvalid);

        // Validate required fields
        let hasError = false;

        if (!name.value.trim()) {
          markInvalid(name, currentLang === 'ar' ? '❌ الاسم مطلوب' : '❌ Nom requis');
          hasError = true;
        }

        if (!phone.value.trim()) {
          markInvalid(phone, currentLang === 'ar' ? '❌ رقم الهاتف مطلوب' : '❌ Téléphone requis');
          hasError = true;
        } else if (!validPhone(phone.value)) {
          markInvalid(phone, i18n[currentLang].phone_error);
          hasError = true;
        }

        if (!city.value.trim()) {
          markInvalid(city, currentLang === 'ar' ? '❌ المدينة مطلوبة' : '❌ Ville requise');
          hasError = true;
        }

        if (!addr.value.trim()) {
          markInvalid(addr, currentLang === 'ar' ? '❌ العنوان مطلوب' : '❌ Adresse requise');
          hasError = true;
        }

        if (hasError) {
          announce(i18n[currentLang].required_error);
          return;
        }

        // Build payload
        const payload = buildOrderPayload(
          name.value.trim(),
          phone.value.trim(),
          city.value.trim(),
          addr.value.trim()
        );

        const btn = $('#orderSubmitBtn');

        if (btn) {
          btn.disabled = true;
          btn.textContent = i18n[currentLang].sending;
        }

        try {
          await sendOrderEmails(payload);

          // Success
          announce(i18n[currentLang].order_received);
          alert(i18n[currentLang].order_received);

          // Reset form and cart
          contactForm.reset();
          pendingBundle = null;
          cart.items = {};
          renderCart();
          renderOrderSummary();

          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (err) {
          console.error('Order submission error:', err);
          const errorMsg = currentLang === 'ar'
            ? 'تعذر إرسال الطلب. جربي واتساب أو أعيدي المحاولة.'
            : 'Erreur d\'envoi. Essayez WhatsApp ou réessayez.';
          alert(errorMsg);
          announce(errorMsg);
        } finally {
          if (btn) {
            btn.disabled = false;
            btn.textContent = i18n[currentLang].confirm_order;
          }
        }
      });
    }

    // Hero Slider
    const slides = $$('.slide');
    let currentSlide = 0;

    function nextSlide() {
      if (slides.length === 0) return;
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
      setInterval(nextSlide, CONFIG.slideInterval);
    }

    // Navbar hide on scroll
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if (!navbar) return;

      const current = window.scrollY;

      if (current > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      if (current > lastScrollY) {
        navbar.classList.add('hide');
      } else if (current < lastScrollY) {
        navbar.classList.remove('hide');
      }

      lastScrollY = current;
    });

    // Intersection Observer for reveal animations
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    $$('.reveal').forEach(el => io.observe(el));

    // Initialize i18n and order summary
    applyI18n(currentLang);
    renderOrderSummary();

    // WhatsApp auto-greeting popup for first-time visitors
    initWhatsAppPopup();

    // Track page view
    trackEvent('page_view', {
      page_title: document.title,
      page_language: currentLang
    });

    // Track bundle views
    $$('[data-add-bundle]').forEach(btn => {
      const bundleId = btn.getAttribute('data-add-bundle');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            trackEvent('view_item', {
              item_id: bundleId,
              item_name: bundles[bundleId][`name_${currentLang}`],
              price: bundles[bundleId].price,
              currency: 'MAD'
            });
            observer.disconnect();
          }
        });
      }, { threshold: 0.5 });

      observer.observe(btn.closest('.card-hover') || btn);
    });

    // Track add to cart
    $$('[data-add-bundle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const bundleId = btn.getAttribute('data-add-bundle');
        const bundle = bundles[bundleId];
        trackEvent('add_to_cart', {
          item_id: bundleId,
          item_name: bundle[`name_${currentLang}`],
          price: bundle.price,
          currency: 'MAD',
          quantity: 1
        });
      });
    });

    // Track WhatsApp clicks
    $$('[data-wa], #whatsappCTA, #waOrderBtnCart').forEach(btn => {
      btn.addEventListener('click', () => {
        trackEvent('click_whatsapp', {
          button_location: btn.id || btn.getAttribute('data-wa'),
          items_count: cart.count(),
          cart_value: cart.total()
        });
      });
    });

    // Track form start
    let formStartTracked = false;
    $$('#contactForm input, #contactForm textarea').forEach(input => {
      input.addEventListener('focus', () => {
        if (!formStartTracked) {
          trackEvent('begin_checkout', {
            items_count: currentItems().length,
            cart_value: currentItems().reduce((a, b) => a + b.qty * b.price, 0)
          });
          formStartTracked = true;
        }
      }, { once: true });
    });

    // Service Worker registration
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Service worker registration failed, ignore
        });
      });
    }
  }

  // Run initialization
  init();

})();
