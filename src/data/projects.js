/**
 * Projects — built only from the CV, the supplied FrootDash project report,
 * and work that genuinely exists inside this portfolio.
 * Only links that actually exist are stored here; the UI simply omits the rest.
 */
export const projects = [
  {
    slug: 'frootdash',
    number: '01',
    title: 'FrootDash',
    subtitle: 'Online fruit delivery system',
    categories: ['Web'],
    year: '2026',
    role: 'Design & development — academic project',
    status: 'Academic project',
    summary:
      'A fruit delivery website for Rajshahi — customer accounts, a browsable catalogue, cart and checkout, plus an admin dashboard for products and orders.',
    intro:
      'FrootDash takes the familiar food-delivery pattern and applies it to fresh fruit. The project pairs a customer-facing storefront with the less visible half of an online shop: an administrator who can add products, upload images and follow orders.',
    problem:
      'The brief was to build a web-based delivery system where customers can register, log in, browse fruit, place an order and check out — while an administrator can manage products and monitor incoming orders. Two audiences, one database, very different tasks.',
    contribution: [
      'Built the storefront flow: registration, login and logout, product listing, shopping cart and checkout with an express-delivery option.',
      'Built the admin side: product management with image upload, and a dashboard for viewing and filtering orders.',
      'Wrote the database schema for users, products and orders, and connected the pages through a shared PHP configuration.',
    ],
    stack: ['PHP', 'MySQL', 'HTML', 'CSS', 'XAMPP'],
    features: [
      'User registration',
      'Login & logout',
      'Fruit catalogue',
      'Shopping cart',
      'Express checkout',
      'Admin authentication',
      'Product management',
      'Image upload',
      'Order dashboard',
    ],
    schema: [
      {
        table: 'users',
        fields: 'id · name · email · password · role · created_at',
        purpose: 'Customer and administrator accounts.',
      },
      {
        table: 'products',
        fields: 'id · name · description · price · stock · image_path · created_at',
        purpose: 'The fruit catalogue and its stock levels.',
      },
      {
        table: 'orders',
        fields: 'id · user_id · total_amount · express_delivery · status',
        purpose: 'Placed orders, delivery choice and fulfilment state.',
      },
    ],
    screenshots: [
      { src: '/projects/frootdash-home.webp', alt: 'FrootDash storefront home page with a green hero and fruit listing.', caption: 'Figure 01 — Storefront', width: 1280, height: 646 },
      { src: '/projects/frootdash-products.webp', alt: 'FrootDash product listing showing bananas, dragon fruit, guava and other fruit.', caption: 'Figure 02 — Product listing', width: 1246, height: 605 },
      { src: '/projects/frootdash-cart.webp', alt: 'FrootDash shopping cart page.', caption: 'Figure 03 — Cart', width: 1177, height: 589 },
      { src: '/projects/frootdash-checkout.webp', alt: 'FrootDash checkout page with delivery details.', caption: 'Figure 04 — Checkout', width: 1191, height: 598 },
      { src: '/projects/frootdash-login.webp', alt: 'FrootDash login screen.', caption: 'Figure 05 — Login', width: 1236, height: 619 },
      { src: '/projects/frootdash-admin.webp', alt: 'FrootDash admin dashboard with order statistics and an orders table.', caption: 'Figure 06 — Admin dashboard', width: 1209, height: 604 },
      { src: '/projects/frootdash-admin-products.webp', alt: 'FrootDash product management screen.', caption: 'Figure 07 — Product management', width: 1198, height: 599 },
      { src: '/projects/frootdash-register.webp', alt: 'FrootDash account registration form.', caption: 'Figure 08 — Registration', width: 1287, height: 644 },
    ],
    sourceNote:
      'Screenshots reproduced from the FrootDash project report supplied with this portfolio.',
    reflection:
      'The useful lesson was everything around the happy path: sessions, stock, order states and an admin view that makes raw data legible. A storefront is easy to sketch; making the other side of it usable is the actual work.',
    links: {
      github: '',
      live: '',
    },
    cover: '/projects/frootdash-home.webp',
    secondary: '/projects/frootdash-admin.webp',
  },
  {
    slug: 'games',
    number: '02',
    title: 'Playground Games',
    subtitle: 'Tic-Tac-Toe & Snake, in the browser',
    categories: ['Games'],
    year: '2026',
    role: 'Design & development — this portfolio',
    status: 'Playable on this site',
    summary:
      'Two fully playable browser games used to practise state, collision logic and input handling — built into the arcade section below.',
    intro:
      'Small games are a good pressure test for the fundamentals: explicit state, clear rules, input from a keyboard, a touchscreen or a mouse, and an interface that explains itself. These two live inside this portfolio rather than on a separate server.',
    problem:
      'Build games that work without a framework-specific game engine, stay legible in the same editorial visual language as the rest of the site, and remain playable with a keyboard, touch or mouse.',
    contribution: [
      'Designed and implemented Tic-Tac-Toe with a minimax computer opponent, a two-player mode, win and draw detection, a persistent score line and a restart flow.',
      'Implemented Snake on a canvas with keyboard and swipe input, on-screen touch controls, pause, score, persistent best score and game-over handling.',
      'Styled both games to sit inside the portfolio’s grid instead of importing a generic game UI.',
    ],
    stack: ['React', 'JavaScript', 'Canvas 2D', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'Tic-Tac-Toe vs. minimax AI',
      'Two-player pass & play',
      'Win & draw detection',
      'Match score tracking',
      'Keyboard & touch Snake',
      'Pause / resume',
      'Persistent best score',
      'Restart without reloading',
    ],
    screenshots: [],
    sourceNote: 'Both games are playable in the Arcade section of this site.',
    reflection:
      'Snake is a lesson in edge cases: input queues, reversal bugs and the collision check that runs one frame too late. Tic-Tac-Toe is a lesson in restraint — the rules are trivial, so the interface has to carry the experience.',
    links: {
      github: '',
      live: '/#arcade',
    },
    cover: null,
    secondary: null,
  },
  {
    slug: 'graphics-coursework',
    number: '03',
    title: 'Graphics Coursework',
    subtitle: 'Drawing algorithms & graphical programming',
    categories: ['Graphics'],
    year: 'Ongoing',
    role: 'Coursework — Computer Graphics',
    status: 'Course project',
    summary:
      'A set of Computer Graphics course projects covering drawing algorithms, rendering techniques and basic graphical programming.',
    intro:
      'Coursework in Computer Graphics: implementing and exploring the algorithms underneath the drawing primitives most developers take for granted — lines, shapes, transformations and the logic that puts pixels on a screen.',
    problem:
      'Move past calling a drawing API and understand what happens underneath it. The coursework asked for practical implementations of graphics algorithms and drawing techniques.',
    contribution: [
      'Completed multiple Computer Graphics course projects.',
      'Practised drawing algorithms, drawing techniques and basic graphical programming.',
    ],
    stack: ['Computer graphics', 'Drawing algorithms', 'Graphical programming'],
    features: [
      'Drawing algorithms',
      'Line & shape rasterisation',
      'Graphical programming exercises',
      'Course practicals',
    ],
    screenshots: [],
    sourceNote:
      'The cover artwork on this page is an original generative composition made for this portfolio — it is not a screenshot of coursework.',
    reflection:
      'Graphics work makes abstraction visible. A line is easy until you have to decide which pixels belong to it, and that mindset — checking the primitive, not just the output — carries into interface work.',
    links: {
      github: '',
      live: '',
    },
    cover: null,
    secondary: null,
  },
  {
    slug: 'hardware',
    number: '04',
    title: 'Hardware Lab',
    subtitle: 'Arduino & ESP32 experiments',
    categories: ['Embedded'],
    year: 'Ongoing',
    role: 'Personal builds — hardware & embedded systems',
    status: 'Personal build',
    summary:
      'A growing set of Arduino and ESP32 builds — breadboard circuits, displays and small devices — made to learn how code behaves once it leaves the screen.',
    intro:
      'These builds are a deliberate change of medium: a microcontroller, a breadboard, a display and a handful of jumper wires, where the failure mode is a loose connection rather than a stack trace. The photograph is one of them — an ESP32 driving a small OLED clock module.',
    problem:
      'Get comfortable below the browser: wiring, power and timing, and the patience to trace a fault through a circuit instead of a console.',
    contribution: [
      'Built Arduino and ESP32 circuits on a breadboard, wiring the microcontroller, a display and the power rails.',
      'Programmed an ESP32 to drive a small OLED clock.',
      'Debugged the physical side — wiring and display behaviour — by testing one connection at a time.',
    ],
    stack: ['Arduino', 'ESP32', 'Embedded C/C++', 'I²C OLED', 'Breadboard'],
    features: [
      'ESP32 + OLED clock',
      'Breadboard wiring',
      'Microcontroller basics',
      'Hardware debugging',
      'Arduino experiments',
    ],
    screenshots: [
      {
        src: '/projects/hardware-clock.webp',
        alt: 'An ESP32 on a breadboard wired to a small OLED display showing a clock face.',
        caption: 'Photo 01 — ESP32 clock',
        width: 1200,
        height: 1600,
      },
    ],
    sourceNote:
      'Photograph supplied by the author. This is a personal build, not coursework.',
    reflection:
      'Hardware removes the safety net. There is no undo, the feedback is physical, and a five-minute fix can hide behind a wire that looks connected. That is exactly why it is worth doing.',
    links: {
      github: '',
      live: '',
    },
    cover: '/projects/hardware-clock-cover.webp',
    secondary: null,
  },
]

export const projectCategories = ['All', 'Web', 'Games', 'Graphics', 'Embedded']

export function getProject(slug) {
  return projects.find((project) => project.slug === slug)
}
