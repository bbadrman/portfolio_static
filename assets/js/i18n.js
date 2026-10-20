/**
 * Language switcher (EN / FR / AR).
 * English is the markup itself: it is read from the page on load, so only
 * French and Arabic live here. Elements opt in with data-i18n (innerHTML)
 * or data-i18n-ph (placeholder).
 */
(function() {
  "use strict";

  const STORAGE_KEY = 'bb-lang';

  const TITLES = {
    en: document.title,
    fr: 'Badr BECHTIOUI – Développeur Full Stack PHP / Symfony à Rabat',
    ar: 'بدر بشتيوي – مطوّر Full Stack PHP / Symfony في الرباط'
  };

  const DICT = {
    fr: {
      'hero.title': 'Ingénieur logiciel &amp; <span>Développeur Full Stack PHP / Symfony</span> basé à Rabat, Maroc',
      'hero.pitch': 'Vous avez un besoin métier.<br>J\'écris le code qui le tient.',
      'hero.cta1': 'Voir les projets',
      'hero.cta2': 'Parlons de votre projet',
      'hero.available': 'Disponible en freelance · Rabat, Maroc · missions à distance',

      'nav.home': 'Accueil',
      'nav.about': 'À propos',
      'nav.resume': 'Parcours',
      'nav.services': 'Services',
      'nav.portfolio': 'Projets',
      'nav.contact': 'Contact',

      'about.kicker': 'À propos',
      'about.title': 'En savoir plus',
      'about.role': 'Développeur Back-End &amp; Full Stack – PHP / Symfony',
      'about.tagline': 'Autonome, curieux, attentif à ce que je livre et aux besoins du client.',
      'about.birthday': 'Naissance :',
      'about.birthdayVal': '1er octobre 1983',
      'about.website': 'Site web :',
      'about.phone': 'Téléphone :',
      'about.city': 'Ville :',
      'about.cityVal': 'Rabat, MAROC',
      'about.age': 'Âge :',
      'about.degree': 'Diplôme :',
      'about.degreeVal': 'Ingénieur d\'État',
      'about.email': 'E-mail :',
      'about.freelance': 'Freelance :',
      'about.freelanceVal': 'Disponible',
      'about.p1': '<strong>Badr BECHTIOUI est ingénieur logiciel et développeur Full Stack PHP / Symfony basé à Rabat, Maroc, avec plus de 4 ans d\'expérience</strong> dans la conception et le développement d\'applications web : CRM, sites e-commerce, plateformes de réservation et outils métier sur mesure avec Symfony 5–7, Laravel, MySQL et Docker.',
      'about.p2': '🎯 J\'aime les projets qui me sortent de ma zone de confort et m\'obligent à apprendre. Mon terrain, c\'est le back-end – PHP et Symfony, Laravel aussi – avec le front-end quand le projet le demande. Je travaille au plus près du besoin métier : comprendre comment le client travaille avant d\'écrire une ligne de code.',
      'about.p3': '📈 Je maîtrise plusieurs langages de programmation, en particulier PHP, Java &amp; JavaScript.',
      'about.p4': '📄 Je m\'intéresse aussi aux nouvelles technologies web, au mobile et au traitement du langage naturel, et je continue de me former sur Docker, Kubernetes et les environnements cloud.',
      'about.p5': '🌌 Dès que possible, je mets ma passion au service de produits construits avec différents frameworks et technologies : Symfony, Laravel, Spring Boot, React et JavaScript.',

      'counts.clients': 'Clients accompagnés',
      'counts.projects': 'Sites et applis en production',
      'counts.years': 'Années d\'expérience',
      'counts.symfony': 'Versions de Symfony livrées (5 → 7)',

      'skills.kicker': 'Compétences',
      'skills.lead': 'Ce avec quoi je travaille tous les jours.',

      'interests.kicker': 'Centres d\'intérêt',
      'interests.lead': 'En dehors du code.',
      'interests.programming': 'Programmation',
      'interests.ml': 'Machine learning',
      'interests.technology': 'Technologie',
      'interests.networking': 'Réseaux',
      'interests.games': 'Jeux vidéo',
      'interests.music': 'Musique',
      'interests.travel': 'Voyages',
      'interests.nature': 'Nature',
      'interests.photo': 'Photographie',
      'interests.horse': 'Équitation',
      'interests.exploration': 'Exploration',
      'interests.cosmology': 'Cosmologie',

      'testimonials.kicker': 'Recommandations',
      'testimonials.lead': 'Ce que disent celles et ceux qui ont travaillé avec moi.',

      'resume.kicker': 'Parcours',
      'resume.title': 'Mon CV',
      'resume.lead': 'Expérience et formation.',
      'resume.summary': 'Résumé',
      'resume.summaryText': '<em>Ingénieur développeur innovant et attaché aux délais, avec plus de 5 ans d\'expérience dans la conception et le développement de sites, de l\'idée de départ jusqu\'à un livrable final soigné.</em>',
      'resume.address': 'N°27 KOM, Rabat, Maroc, 11040',
      'resume.education': 'Formation',
      'resume.edu1Title': 'Ingénierie des systèmes d\'information &amp; ingénieur concepteur développeur',
      'resume.edu1School': '<em>École supérieure de management, informatique et télécommunications</em>',
      'resume.edu1Degree': 'Ingénieur en ingénierie des systèmes d\'information',
      'resume.edu2Title': 'Faculté des lettres et sciences humaines – Mohammedia',
      'resume.edu2Degree': '<em>DEUG économie et gestion</em>',
      'resume.edu3Degree': '<em>Technicien spécialisé en gros œuvres</em>',
      'resume.experience': 'Expérience professionnelle',
      'resume.exp1Title': 'Ingénieur concepteur développeur',
      'resume.exp1Dates': '2022 - Aujourd\'hui',
      'resume.exp1Place': '<em>Experion, Rabat, Maroc</em>',
      'resume.exp1List': '<li>Développement d\'applications natives en PHP / MySQL.</li>' +
        '<li>Développement de sites web avec Symfony 5, 6 et 7.</li>' +
        '<li>Conception et développement d\'applications en Laravel et Symfony. Intégration web en CSS3 et Bootstrap.</li>' +
        '<li>Applications Symfony sur mesure adaptées aux spécificités et attentes métier des clients. Sites multilingues. Création et évolution de modules spécifiques. Sites vitrines pour partenaires et clients export en Symfony / Laravel. Maintenance et amélioration continue des sites.</li>',
      'resume.exp2Title': 'Ingénieur développement web',
      'resume.exp2Place': '<em>Freelance, Rabat, Maroc</em>',
      'resume.exp2List': '<li>Application web B2C avec Symfony 5 : analyse et conception UML, découpage en user stories, intégration responsive. Environnement de développement iso-prod avec Docker. Interface d\'administration avec EasyAdmin. Envois d\'e-mails transactionnels via Mailjet. Tunnel d\'achat en plusieurs étapes avec paiement Stripe. Intégration continue avec Jenkins et Docker.</li>',
      'resume.cvTitle': 'CV complet, sur demande',
      'resume.cvText': 'Parcours détaillé, missions et références – envoyé le jour même.',
      'resume.cvButton': 'Demander le CV',

      'services.kicker': 'Services',
      'services.title': 'Mes services',
      'services.lead': 'Comment je peux vous aider.',
      'services.s1Title': 'Développement Symfony &amp; PHP',
      'services.s1Text': 'Applications web sur mesure avec Symfony 5, 6 et 7 et PHP 8 : back-offices métier, CRM, plateformes de réservation et API REST, avec Doctrine, Twig, EasyAdmin et Webpack Encore.',
      'services.s2Title': 'Sites e-commerce &amp; vitrines',
      'services.s2Text': 'Boutiques en ligne et sites vitrines multilingues en Symfony ou Laravel, avec tunnel d\'achat complet, paiement Stripe et e-mails transactionnels via Mailjet.',
      'services.s3Title': 'Bases de données',
      'services.s3Text': 'Modélisation des données (UML) et développement avec MySQL, MariaDB et PostgreSQL via Doctrine ORM, SQLite pour les projets légers, ainsi que reprise et nettoyage de données existantes.',
      'services.s4Title': 'Intégration front-end',
      'services.s4Text': 'Interfaces responsives en HTML5, CSS3, Bootstrap 4/5 et Tailwind, fonctionnalités dynamiques en JavaScript, jQuery/Ajax et React.',
      'services.s5Title': 'DevOps &amp; mise en production',
      'services.s5Text': 'Workflows Git sur GitHub, Bitbucket et Azure, environnements iso-prod avec Docker, intégration continue avec Jenkins, hébergement sur serveurs Nginx, Contabo et Google Cloud.',
      'services.s6Title': 'Reprise de projet &amp; maintenance',
      'services.s6Text': 'Audit d\'un code existant, correction de bugs, montée de version Symfony et maintenance dans la durée d\'applications PHP / Symfony : nouveaux modules et optimisation des performances.',

      'portfolio.kicker': 'Projets',
      'portfolio.title': 'Mes réalisations',
      'portfolio.lead': 'Des projets en ligne, pas des maquettes. Une sélection parmi plus de vingt sites livrés.',
      'portfolio.all': 'Tous',
      'portfolio.web': 'Sites web',
      'portfolio.app': 'Applications métier',
      'portfolio.p1': 'Site e-commerce',
      'portfolio.p2': 'Plateforme de réservation hôtelière',
      'portfolio.p3': 'Gestion de restaurant',
      'portfolio.p4': 'CRM assurance',
      'portfolio.p4Meta': 'Application web',
      'portfolio.p5Meta': 'Gestion de stock',

      'contact.kicker': 'Contact',
      'contact.title': 'Me contacter',
      'contact.lead': 'Un projet, une question ? Écrivez-moi en deux lignes ce que vous voulez construire – je réponds sous 24 heures.',
      'contact.address': 'Mon adresse',
      'contact.addressVal': 'N°27 KOM, Rabat, Maroc 11040',
      'contact.social': 'Réseaux',
      'contact.email': 'Écrivez-moi',
      'contact.call': 'Appelez-moi',
      'contact.name': 'Votre nom',
      'contact.yourEmail': 'Votre e-mail',
      'contact.subject': 'Sujet',
      'contact.message': 'Message',
      'contact.loading': 'Chargement',
      'contact.sent': 'Redirection vers WhatsApp...',
      'contact.send': 'Envoyer le message',

      'footer.designed': 'Conçu par'
    },

    ar: {
      'hero.title': 'مهندس برمجيات و<span>مطوّر Full Stack PHP / Symfony</span> مقيم في الرباط، المغرب',
      'hero.pitch': 'لديك حاجة في عملك.<br>أكتب الكود الذي يحقّقها.',
      'hero.cta1': 'شاهد المشاريع',
      'hero.cta2': 'لنتحدث عن مشروعك',
      'hero.available': 'متاح للعمل الحر · الرباط، المغرب · مهام عن بُعد',

      'nav.home': 'الرئيسية',
      'nav.about': 'نبذة عني',
      'nav.resume': 'المسار',
      'nav.services': 'الخدمات',
      'nav.portfolio': 'المشاريع',
      'nav.contact': 'تواصل',

      'about.kicker': 'نبذة عني',
      'about.title': 'تعرّف عليّ أكثر',
      'about.role': 'مطوّر Back-End و Full Stack – PHP / Symfony',
      'about.tagline': 'مستقل، فضولي، وحريص على جودة ما أسلّمه وعلى احتياجات العميل.',
      'about.birthday': 'تاريخ الميلاد:',
      'about.birthdayVal': '1 أكتوبر 1983',
      'about.website': 'الموقع:',
      'about.phone': 'الهاتف:',
      'about.city': 'المدينة:',
      'about.cityVal': 'الرباط، المغرب',
      'about.age': 'العمر:',
      'about.degree': 'الشهادة:',
      'about.degreeVal': 'مهندس دولة',
      'about.email': 'البريد الإلكتروني:',
      'about.freelance': 'العمل الحر:',
      'about.freelanceVal': 'متاح',
      'about.p1': '<strong>بدر بشتيوي مهندس برمجيات ومطوّر Full Stack PHP / Symfony مقيم في الرباط، المغرب، بخبرة تزيد عن 4 سنوات</strong> في تصميم وتطوير تطبيقات الويب: أنظمة CRM، متاجر إلكترونية، منصات حجز وأدوات أعمال مخصّصة باستخدام Symfony 5–7 و Laravel و MySQL و Docker.',
      'about.p2': '🎯 أحب المشاريع التي تُخرجني من منطقة الراحة وتدفعني للتعلّم. مجالي الأساسي هو الـ Back-End – PHP و Symfony، و Laravel أيضاً – مع الواجهة الأمامية عندما يتطلّب المشروع ذلك. أعمل بقرب من حاجة العميل: أفهم طريقة عمله قبل كتابة أي سطر من الكود.',
      'about.p3': '📈 أتقن عدّة لغات برمجة، خاصة PHP و Java و JavaScript.',
      'about.p4': '📄 أهتم أيضاً بتقنيات الويب الحديثة وتطبيقات الهاتف ومعالجة اللغة الطبيعية، وأواصل التكوين في Docker و Kubernetes وبيئات الحوسبة السحابية.',
      'about.p5': '🌌 كلما سنحت الفرصة، أوظّف شغفي في تطوير منتجات بأطر وتقنيات مختلفة مثل Symfony و Laravel و Spring Boot و React و JavaScript.',

      'counts.clients': 'عميل رافقته',
      'counts.projects': 'موقع وتطبيق قيد التشغيل',
      'counts.years': 'سنوات من الخبرة',
      'counts.symfony': 'إصدارات Symfony المُنجزة (5 ← 7)',

      'skills.kicker': 'المهارات',
      'skills.lead': 'الأدوات التي أعمل بها كل يوم.',

      'interests.kicker': 'الاهتمامات',
      'interests.lead': 'خارج عالم البرمجة.',
      'interests.programming': 'البرمجة',
      'interests.ml': 'تعلّم الآلة',
      'interests.technology': 'التكنولوجيا',
      'interests.networking': 'الشبكات',
      'interests.games': 'ألعاب الفيديو',
      'interests.music': 'الموسيقى',
      'interests.travel': 'السفر',
      'interests.nature': 'الطبيعة',
      'interests.photo': 'التصوير',
      'interests.horse': 'ركوب الخيل',
      'interests.exploration': 'الاستكشاف',
      'interests.cosmology': 'علم الكون',

      'testimonials.kicker': 'التوصيات',
      'testimonials.lead': 'ما يقوله من عملوا معي.',

      'resume.kicker': 'المسار',
      'resume.title': 'سيرتي الذاتية',
      'resume.lead': 'الخبرة والتكوين.',
      'resume.summary': 'ملخّص',
      'resume.summaryText': '<em>مهندس تطوير مبدع وملتزم بالمواعيد، بخبرة تزيد عن 5 سنوات في تصميم وتطوير المواقع، من الفكرة الأولى إلى التسليم النهائي المتقن.</em>',
      'resume.address': 'رقم 27 KOM، الرباط، المغرب، 11040',
      'resume.education': 'التكوين',
      'resume.edu1Title': 'هندسة نظم المعلومات ومهندس مصمّم مطوّر',
      'resume.edu1School': '<em>المدرسة العليا للتسيير والمعلوميات والاتصالات</em>',
      'resume.edu1Degree': 'مهندس في هندسة نظم المعلومات',
      'resume.edu2Title': 'كلية الآداب والعلوم الإنسانية – المحمدية',
      'resume.edu2Degree': '<em>دبلوم الدراسات الجامعية العامة في الاقتصاد والتسيير</em>',
      'resume.edu3Degree': '<em>تقني متخصص في الأشغال الكبرى</em>',
      'resume.experience': 'الخبرة المهنية',
      'resume.exp1Title': 'مهندس مصمّم مطوّر',
      'resume.exp1Dates': '2022 - حتى الآن',
      'resume.exp1Place': '<em>Experion، الرباط، المغرب</em>',
      'resume.exp1List': '<li>تطوير تطبيقات أصلية بـ PHP / MySQL.</li>' +
        '<li>تطوير مواقع ويب بـ Symfony 5 و 6 و 7.</li>' +
        '<li>تصميم وتطوير تطبيقات بـ Laravel و Symfony، ودمج الواجهات بـ CSS3 و Bootstrap.</li>' +
        '<li>تطبيقات Symfony مخصّصة تلبّي خصوصيات وتوقّعات العملاء. مواقع متعددة اللغات. إنشاء وتطوير وحدات خاصة. مواقع تعريفية للشركاء وعملاء التصدير بـ Symfony / Laravel. صيانة المواقع وتحسينها المستمر.</li>',
      'resume.exp2Title': 'مهندس تطوير ويب',
      'resume.exp2Place': '<em>عمل حر، الرباط، المغرب</em>',
      'resume.exp2List': '<li>تطبيق ويب B2C بـ Symfony 5: تحليل وتصميم بلغة UML، تقسيم المهام إلى User Stories، دمج واجهة متجاوبة. بيئة تطوير مطابقة للإنتاج بـ Docker. واجهة إدارة بـ EasyAdmin. إرسال رسائل البريد عبر Mailjet. مسار شراء متعدد المراحل مع الدفع عبر Stripe. تكامل مستمر بـ Jenkins و Docker.</li>',
      'resume.cvTitle': 'السيرة الذاتية الكاملة عند الطلب',
      'resume.cvText': 'المسار المفصّل والمهام والمراجع – تُرسل في نفس اليوم.',
      'resume.cvButton': 'اطلب السيرة الذاتية',

      'services.kicker': 'الخدمات',
      'services.title': 'خدماتي',
      'services.lead': 'كيف يمكنني مساعدتك.',
      'services.s1Title': 'تطوير Symfony و PHP',
      'services.s1Text': 'تطبيقات ويب مخصّصة بـ Symfony 5 و 6 و 7 و PHP 8: لوحات إدارة، أنظمة CRM، منصات حجز وواجهات REST API، باستخدام Doctrine و Twig و EasyAdmin و Webpack Encore.',
      'services.s2Title': 'متاجر إلكترونية ومواقع تعريفية',
      'services.s2Text': 'متاجر إلكترونية ومواقع تعريفية متعددة اللغات بـ Symfony أو Laravel، مع مسار شراء كامل، دفع عبر Stripe ورسائل بريد آلية عبر Mailjet.',
      'services.s3Title': 'قواعد البيانات',
      'services.s3Text': 'نمذجة البيانات (UML) والتطوير بـ MySQL و MariaDB و PostgreSQL عبر Doctrine ORM، و SQLite للمشاريع الخفيفة، إضافة إلى استرجاع البيانات القائمة وتنظيفها.',
      'services.s4Title': 'دمج الواجهات الأمامية',
      'services.s4Text': 'واجهات متجاوبة بـ HTML5 و CSS3 و Bootstrap 4/5 و Tailwind، ووظائف تفاعلية بـ JavaScript و jQuery/Ajax و React.',
      'services.s5Title': 'DevOps والنشر',
      'services.s5Text': 'إدارة Git على GitHub و Bitbucket و Azure، بيئات مطابقة للإنتاج بـ Docker، تكامل مستمر بـ Jenkins، واستضافة على خوادم Nginx و Contabo و Google Cloud.',
      'services.s6Title': 'استلام المشاريع والصيانة',
      'services.s6Text': 'تدقيق الكود القائم، إصلاح الأخطاء، ترقية إصدارات Symfony والصيانة طويلة الأمد لتطبيقات PHP / Symfony: وحدات جديدة وتحسين الأداء.',

      'portfolio.kicker': 'المشاريع',
      'portfolio.title': 'أعمالي',
      'portfolio.lead': 'مشاريع حقيقية على الإنترنت، لا مجرد نماذج. مختارات من أكثر من عشرين موقعاً مُسلَّماً.',
      'portfolio.all': 'الكل',
      'portfolio.web': 'مواقع ويب',
      'portfolio.app': 'تطبيقات أعمال',
      'portfolio.p1': 'متجر إلكتروني',
      'portfolio.p2': 'منصة حجز فندقي',
      'portfolio.p3': 'تطبيق تسيير مطعم',
      'portfolio.p4': 'نظام CRM للتأمين',
      'portfolio.p4Meta': 'تطبيق ويب',
      'portfolio.p5Meta': 'تسيير المخزون',

      'contact.kicker': 'تواصل',
      'contact.title': 'تواصل معي',
      'contact.lead': 'مشروع أو سؤال؟ اكتب لي في سطرين ما تريد بناءه – أردّ خلال 24 ساعة.',
      'contact.address': 'عنواني',
      'contact.addressVal': 'رقم 27 KOM، الرباط، المغرب 11040',
      'contact.social': 'الشبكات الاجتماعية',
      'contact.email': 'راسلني',
      'contact.call': 'اتصل بي',
      'contact.name': 'اسمك',
      'contact.yourEmail': 'بريدك الإلكتروني',
      'contact.subject': 'الموضوع',
      'contact.message': 'الرسالة',
      'contact.loading': 'جارٍ التحميل',
      'contact.sent': 'جارٍ التحويل إلى واتساب...',
      'contact.send': 'إرسال الرسالة',

      'footer.designed': 'تصميم'
    }
  };

  const nodes = document.querySelectorAll('[data-i18n]');
  const placeholders = document.querySelectorAll('[data-i18n-ph]');
  const buttons = document.querySelectorAll('.lang-switch [data-lang]');

  // Snapshot the English markup so switching back needs no reload.
  const en = {};
  nodes.forEach((el) => en[el.dataset.i18n] = el.innerHTML);
  placeholders.forEach((el) => en[el.dataset.i18nPh] = el.placeholder);

  const text = (lang, key) => (DICT[lang] && DICT[lang][key]) || en[key];

  const apply = (lang) => {
    if (lang !== 'en' && !DICT[lang]) lang = 'en';

    nodes.forEach((el) => el.innerHTML = text(lang, el.dataset.i18n));
    placeholders.forEach((el) => el.placeholder = text(lang, el.dataset.i18nPh));

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = TITLES[lang];

    buttons.forEach((b) => b.setAttribute('aria-pressed', b.dataset.lang === lang));

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  };

  const initial = () => {
    const param = new URLSearchParams(window.location.search).get('lang');
    if (param) return param;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved;
    } catch (e) {}
    const nav = (navigator.language || 'en').slice(0, 2);
    return DICT[nav] ? nav : 'en';
  };

  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.lang)));

  apply(initial());
})();
