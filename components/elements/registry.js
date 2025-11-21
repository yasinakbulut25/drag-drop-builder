export const ELEMENT_DEFAULTS = {
  header: {
    width: "100%",
    height: 80,
    positionBehavior: "sticky-top",
    content: {
      text: "Site Başlığı",
      style: "default",
    },
    responsive: {
      mobile: { width: "100%", height: 60 },
      tablet: { width: "100%", height: 70 },
    },
  },

  footer: {
    width: "100%",
    height: 60,
    positionBehavior: "bottom",
    content: {
      copyright: "© 2024 Test Builder",
      links: [],
    },
    fixed: true,
    responsive: {},
  },

  card: {
    width: 300,
    height: 200,
    positionBehavior: "relative",
    content: {
      title: "Card Başlığı",
      description: "İçerik açıklaması",
      image: "/image.png",
    },
    responsive: {
      mobile: { x: 10, width: "calc(100% - 20px)" },
      tablet: { x: 30, width: 350 },
    },
  },

  "text-content": {
    width: "auto",
    height: "auto",
    positionBehavior: "relative",
    content: {
      html: "",
      plainText: "Metin içeriği buraya gelecek",
    },
    responsive: {},
  },

  slider: {
    width: 800,
    height: 400,
    positionBehavior: "relative",
    content: {
      images: [],
    },
    responsive: {},
  },
};
