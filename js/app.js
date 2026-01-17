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
      usp_shipping: 'توصيل مجاني',
      usp_shipping_sub: 'على جميع الطلبات داخل المغرب',
      usp_cod: 'الدفع عند الاستلام',
      usp_cod_sub: 'ادفعي عند وصول طلبك',
      usp_local: 'صُنع في المغرب',
      usp_local_sub: 'جودة مضمونة ومكونات طبيعية',
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
      bndl1_desc: 'للشعر • كفاية شهر',
      bndl2: 'سكراب البرتقال',
      bndl2_desc: 'للجسم • تقشير طبيعي',
      bndl3: 'كريم القدمين',
      bndl3_desc: 'للعناية بالقدمين • نعومة فائقة',
      bndl4: 'الباك الكامل',
      bndl4_desc: 'زيت + سكراب + كريم القدمين + ماسك',
      bndl5: 'ماسك البرتقال',
      bndl5_desc: 'للوجه • تنظيف عميق',
      bndl6: 'كريم التبييض',
      bndl6_desc: 'للبشرة • نضارة وتوحيد اللون',
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
      usp_shipping: 'Livraison gratuite',
      usp_shipping_sub: 'Sur toutes les commandes au Maroc',
      usp_cod: 'Paiement à la livraison',
      usp_cod_sub: 'Payez à réception',
      usp_local: 'Made in Morocco',
      usp_local_sub: 'Qualité garantie et ingrédients naturels',
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
      bndl1_desc: 'Pour cheveux • 1 mois',
      bndl2: 'Gommage Orange',
      bndl2_desc: 'Pour corps • Exfoliation naturelle',
      bndl3: 'Crème Pieds',
      bndl3_desc: 'Soin des pieds • Douceur extrême',
      bndl4: 'Pack Complet',
      bndl4_desc: 'Huile + Gommage + Crème pieds + Masque',
      bndl5: 'Masque Orange',
      bndl5_desc: 'Pour visage • Nettoyage profond',
      bndl6: 'Crème Éclaircissante',
      bndl6_desc: 'Pour peau • Éclat et uniformité',
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
    b1: { id: 'b1', name_ar: 'زيت الباروكة', name_fr: 'Huile Barouka', price: 199 },
    b2: { id: 'b2', name_ar: 'سكراب البرتقال', name_fr: 'Gommage Orange', price: 149 },
    b3: { id: 'b3', name_ar: 'كريم القدمين', name_fr: 'Crème Pieds', price: 99 },
    b4: { id: 'b4', name_ar: 'الباك الكامل', name_fr: 'Pack Complet', price: 399 },
    b5: { id: 'b5', name_ar: 'ماسك البرتقال', name_fr: 'Masque Orange', price: 129 },
    b6: { id: 'b6', name_ar: 'كريم التبييض', name_fr: 'Crème Éclaircissante', price: 149 }
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
  }

  function buildCartMessage() {
    const items = currentItems();
    if (!items.length) {
      return currentLang === 'ar'
        ? 'السلام عليكم، بغيت نسول على زيت الشعر من خلطات لولو.'
        : 'Bonjour, je voudrais me renseigner sur l\'huile Lolo Blends.';
    }

    const lines = items.map(it => {
      const t = (currentLang === 'ar' ? it.name_ar : it.name_fr);
      return `- ${t} ×${it.qty} = ${formatMAD(it.qty * it.price)}`;
    }).join('\n');

    const total = items.reduce((a, b) => a + b.qty * b.price, 0);
    const header = currentLang === 'ar' ? 'طلب عبر واتساب:\n' : 'Commande WhatsApp:\n';
    const totalH = currentLang === 'ar' ? 'الإجمالي' : 'Total';

    return `${header}${lines}\n\n${totalH}: ${formatMAD(total)}`;
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
        `📱 واتساب: +${CONFIG.whatsappNumber}`,
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
    // Send to admin
    const adminFD = new FormData();
    adminFD.append('access_key', CONFIG.web3formsKey);
    adminFD.append('subject', payload.subject);
    adminFD.append('from_name', 'Lolo Blends - خلطات لولو');
    adminFD.append('email', CONFIG.businessEmail);
    adminFD.append('reply_to', payload.customer.email || '');
    adminFD.append('message', formatAdminEmailPlain(payload));

    const adminResp = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: adminFD
    });

    if (!adminResp.ok) throw new Error('Admin email failed');

    // Send confirmation to customer (if email provided)
    if (payload.customer.email) {
      const custFD = new FormData();
      custFD.append('access_key', CONFIG.web3formsKey);
      custFD.append('subject', payload.language === 'ar'
        ? 'تأكيد طلبك من خلطات لولو'
        : 'Confirmation de commande Lolo Blends');
      custFD.append('from_name', 'خلطات لولو - Lolo Blends');
      custFD.append('email', payload.customer.email);
      custFD.append('reply_to', CONFIG.businessEmail);
      custFD.append('message', formatCustomerEmailPlain(payload));

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: custFD
      });
    }

    return true;
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
        : (currentLang === 'ar'
          ? 'السلام عليكم، بغيت نسول على زيت الباروكة من خلطات لولو.'
          : 'Bonjour, je voudrais me renseigner sur l\'huile Barouka Lolo Blends.');
      openWhatsApp(msg);
    });

    // Bundle WhatsApp buttons
    $$('[data-wa]')?.forEach(btn => {
      btn.addEventListener('click', () => {
        const pack = btn.getAttribute('data-wa');
        const msg = currentLang === 'ar'
          ? `السلام عليكم، بغيت نطلب الباك رقم ${pack} من خلطات لولو.`
          : `Bonjour, je voudrais commander le pack ${pack} de Lolo Blends.`;
        openWhatsApp(msg);
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
