import { registerUniformComponent } from "@uniformdev/canvas-react";
import HeroSection from "@/components/HeroSection";
import ContentBlock from "@/components/ContentBlock";
import LatestArticles from "@/components/LatestArticles";
import BlogArticleIntro from "@/components/BlogArticleIntro";
import BlogArticleDetail from "@/components/BlogArticleDetail";
import ImageWithText from "@/components/ImageWithText";
import TopicCards from "@/components/TopicCards";
import TopicCard from "@/components/TopicCard";
import Page from "@/components/Page";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductCard from "@/components/ProductCard";

registerUniformComponent({
  type: "page",
  component: Page,
});

registerUniformComponent({
  type: "herosection",
  component: HeroSection,
});

registerUniformComponent({
  type: "contentBlock",
  component: ContentBlock,
});

registerUniformComponent({
  type: "latestArticles",
  component: LatestArticles,
});

registerUniformComponent({
  type: "blogarticleintro",
  component: BlogArticleIntro,
});

registerUniformComponent({
  type: "blogarticledetail",
  component: BlogArticleDetail,
});

registerUniformComponent({
  type: "imageWithText",
  component: ImageWithText,
});

registerUniformComponent({
  type: "topicCards",
  component: TopicCards,
});

registerUniformComponent({
  type: "topicCard",
  component: TopicCard,
});

registerUniformComponent({
  type: "featuredProducts",
  component: FeaturedProducts,
});

registerUniformComponent({
  type: "productCard",
  component: ProductCard,
});
